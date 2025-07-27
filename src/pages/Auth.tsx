
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from "lucide-react";
import Turnstile from "@/components/Turnstile";
import { verifyTurnstile } from "@/lib/verifyTurnstile";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signUp, signIn, resetPassword, isAuthenticated, isLoading } = useAuth();
  
  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userRoles, setUserRoles] = useState<string[]>(["student"]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [signinCaptchaToken, setSigninCaptchaToken] = useState<string | null>(null);

  const siteKey = import.meta.env.VITE_CF_TURNSTILE_SITE_KEY;

  // Redirect authenticated users
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const redirect = searchParams.get("redirect") || "/";
      navigate(redirect);
    }
  }, [isAuthenticated, isLoading, navigate, searchParams]);

  // Handle tab switching from URL params
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "signup" || tab === "reset") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleCaptchaError = () => {
    setError("Security verification failed. Please try again or refresh the page.");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (siteKey && !signinCaptchaToken) {
      setError("Please complete the security verification");
      setLoading(false);
      return;
    }

    try {
      if (siteKey && signinCaptchaToken) {
        const result = await verifyTurnstile(signinCaptchaToken);
        if (!result.success) {
          throw new Error('Security verification failed');
        }
      }

      const { error } = await signIn(
        email,
        password,
        undefined
      );
      
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions");
      setLoading(false);
      return;
    }

    if (siteKey && !captchaToken) {
      setError("Please complete the security verification");
      setLoading(false);
      return;
    }

    try {
      // Verify Turnstile token when enabled
      if (siteKey && captchaToken) {
        const result = await verifyTurnstile(captchaToken);
        if (!result.success) {
          throw new Error('Security verification failed');
        }
      }

      const { error } = await signUp(email, password, {
        full_name: fullName,
        user_roles: userRoles
      });
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Check your email for verification link!");
      }
    } catch (error) {
      setError("Security verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Password reset email sent!");
      }
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Zwanski Tech</CardTitle>
          <CardDescription>
            Join our community of developers and tech enthusiasts
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="reset">Reset</TabsTrigger>
            </TabsList>

            {error && (
              <Alert className="mt-4 border-destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mt-4 border-green-500">
                <AlertDescription className="text-green-600">{success}</AlertDescription>
              </Alert>
            )}

            <TabsContent value="signin" className="space-y-4 mt-6">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {siteKey ? (
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Security verification required
                    </div>
                    <Turnstile
                      siteKey={siteKey}
                      onVerify={(token) => setSigninCaptchaToken(token)}
                      onError={handleCaptchaError}
                      onExpire={() => setSigninCaptchaToken(null)}
                    />
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground text-center py-4">
                    Security verification optional (disabled)
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || (siteKey && !signinCaptchaToken)}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              {/* OAuth login methods removed */}
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-roles">I'm interested in</Label>
                  <Select onValueChange={(value) => setUserRoles([value])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Learning & Academy</SelectItem>
                      <SelectItem value="instructor">Teaching & Instruction</SelectItem>
                      <SelectItem value="job_seeker">Finding Jobs</SelectItem>
                      <SelectItem value="employer">Hiring Talent</SelectItem>
                      <SelectItem value="freelancer">Freelancing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <a href="/terms" className="text-primary underline-offset-4 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-primary underline-offset-4 hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>

                {siteKey ? (
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Security verification required
                    </div>
                    <Turnstile
                      siteKey={siteKey}
                      onVerify={(token) => setCaptchaToken(token)}
                      onError={handleCaptchaError}
                      onExpire={() => setCaptchaToken(null)}
                    />
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground text-center py-4">
                    Security verification optional (disabled)
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || (siteKey && !captchaToken)}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="reset" className="space-y-4 mt-6">
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Email"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="text-center text-sm text-muted-foreground">
          <p>
            {activeTab === "signin" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setActiveTab(activeTab === "signin" ? "signup" : "signin")}
              className="text-primary underline-offset-4 hover:underline"
              aria-label={activeTab === "signin" ? "Switch to sign up" : "Switch to sign in"}
            >
              {activeTab === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
