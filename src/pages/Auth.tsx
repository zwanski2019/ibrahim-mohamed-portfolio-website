
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
import { Eye, EyeOff, Mail, Lock, User, Github } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import TurnstileWidget from "@/components/TurnstileWidget";

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
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [signinTurnstileToken, setSigninTurnstileToken] = useState<string | null>(null);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState<string>("");
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);
  const [loadingTurnstile, setLoadingTurnstile] = useState(true);

  // Fetch Turnstile site key
  useEffect(() => {
    const fetchTurnstileConfig = async () => {
      try {
        console.log('Auth: Fetching Turnstile config...');
        const { data, error } = await supabase.functions.invoke('get-turnstile-config');
        
        if (error) {
          console.warn('Auth: Error fetching Turnstile config:', error);
          setTurnstileEnabled(false);
        } else if (data?.siteKey) {
          console.log('Auth: Turnstile config loaded successfully');
          setTurnstileSiteKey(data.siteKey);
          setTurnstileEnabled(true);
        } else {
          console.warn('Auth: No site key returned, Turnstile disabled');
          setTurnstileEnabled(false);
        }
      } catch (err) {
        console.warn('Auth: Error invoking Turnstile config function:', err);
        setTurnstileEnabled(false);
      } finally {
        setLoadingTurnstile(false);
      }
    };

    fetchTurnstileConfig();
  }, []);

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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Only require Turnstile if it's enabled
    if (turnstileEnabled && !signinTurnstileToken) {
      setError("Please complete the security verification");
      setLoading(false);
      return;
    }

    const { error } = await signIn(email, password, signinTurnstileToken);
    
    if (error) {
      setError(error.message);
    }
    
    setLoading(false);
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

    // Only require Turnstile if it's enabled
    if (turnstileEnabled && !turnstileToken) {
      setError("Please complete the security verification");
      setLoading(false);
      return;
    }

    try {
      // Only verify Turnstile token if it's enabled
      if (turnstileEnabled && turnstileToken) {
        const { data: verificationData, error: verificationError } = await supabase.functions.invoke('verify-turnstile', {
          body: { token: turnstileToken }
        });

        if (verificationError || !verificationData?.success) {
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
    }
    
    setLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await resetPassword(email);
    
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Password reset email sent!");
    }
    
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${searchParams.get("redirect") || "/"}`
      }
    });
    
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleGithubSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}${searchParams.get("redirect") || "/"}`
      }
    });
    
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
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
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Turnstile Widget for Sign In - Only show if enabled */}
                {turnstileEnabled && !loadingTurnstile && turnstileSiteKey && (
                  <div className="py-2">
                    <TurnstileWidget
                      siteKey={turnstileSiteKey}
                      onVerify={setSigninTurnstileToken}
                      onError={() => setSigninTurnstileToken(null)}
                      onExpire={() => setSigninTurnstileToken(null)}
                      theme="auto"
                      size="compact"
                    />
                  </div>
                )}

                {!turnstileEnabled && !loadingTurnstile && (
                  <div className="py-2 text-sm text-muted-foreground">
                    Security verification is currently unavailable
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || (turnstileEnabled && !signinTurnstileToken)}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={handleGoogleSignIn} disabled={loading}>
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" onClick={handleGithubSignIn} disabled={loading}>
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
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

                {/* Turnstile Widget - Only show if enabled */}
                {turnstileEnabled && !loadingTurnstile && turnstileSiteKey && (
                  <div className="py-2">
                    <TurnstileWidget
                      siteKey={turnstileSiteKey}
                      onVerify={setTurnstileToken}
                      onError={() => setTurnstileToken(null)}
                      onExpire={() => setTurnstileToken(null)}
                      theme="auto"
                      size="compact"
                    />
                  </div>
                )}

                {!turnstileEnabled && !loadingTurnstile && (
                  <div className="py-2 text-sm text-muted-foreground">
                    Security verification is currently unavailable
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || (turnstileEnabled && !turnstileToken)}
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
