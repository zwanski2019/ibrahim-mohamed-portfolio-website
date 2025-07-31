
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Turnstile from "@/components/Turnstile";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { verifyTurnstile } from "@/lib/verifyTurnstile";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signUp, signIn, resetPassword, isAuthenticated, isLoading } = useAuth();
  
  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userRoles, setUserRoles] = useState<string[]>(["student"]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [signinCaptchaToken, setSigninCaptchaToken] = useState<string | null>(null);

  // Turnstile refs for reset functionality (temporarily disabled)
  // const signupTurnstileRef = useRef<TurnstileInstance>(null);
  // const signinTurnstileRef = useRef<TurnstileInstance>(null);

  // Get site key from environment - DISABLED for testing
  const siteKey = ""; // Temporarily disable Turnstile to allow login

  console.log("Turnstile DISABLED for testing - authentication should work without captcha");

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
    toast({
      title: "Security Verification Failed",
      description: "Please try again or refresh the page.",
      variant: "destructive",
    });
  };

  const resetTurnstiles = () => {
    // signupTurnstileRef.current?.reset();
    // signinTurnstileRef.current?.reset();
    setCaptchaToken(null);
    setSigninCaptchaToken(null);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("Sign in attempt:", { 
      email, 
      siteKey, 
      signinCaptchaToken: signinCaptchaToken ? "TOKEN_PRESENT" : "NO_TOKEN",
      captchaTokenLength: signinCaptchaToken?.length || 0
    });

    try {
      console.log("Calling Supabase signIn (CAPTCHA bypassed)...");
      const { error } = await signIn(email, password);
      
      console.log("SignIn result:", { error: error ? error.message : "SUCCESS" });
      
      if (error) {
        resetTurnstiles();
        console.error("SignIn error details:", error);
        toast({
          title: "Sign In Failed",
          description: error.message || "Please check your credentials and try again.",
          variant: "destructive",
        });
      } else {
        console.log("SignIn successful!");
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      }
    } catch (err: any) {
      resetTurnstiles();
      console.error("SignIn exception:", err);
      toast({
        title: "Sign In Error",
        description: err.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation checks
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Check for Turnstile validation
    if (siteKey && !captchaToken) {
      toast({
        title: "Security Check Required",
        description: "Please complete the security verification",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // Verify Turnstile token when enabled
      if (siteKey && captchaToken) {
        const result = await verifyTurnstile(captchaToken);
        if (!result.success) {
          resetTurnstiles();
          throw new Error('Security verification failed');
        }
      }

      const { error } = await signUp(email, password, {
        full_name: fullName,
        user_roles: userRoles
      });
      
      if (error) {
        resetTurnstiles();
        toast({
          title: "Account Creation Failed",
          description: error.message || "Failed to create account. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created Successfully!",
          description: "Check your email for the verification link to complete your registration.",
        });
        // Clear form on success
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFullName("");
        setAgreedToTerms(false);
        resetTurnstiles();
      }
    } catch (error: any) {
      resetTurnstiles();
      toast({
        title: "Registration Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        toast({
          title: "Reset Failed",
          description: error.message || "Failed to send reset email. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Reset Email Sent",
          description: "Check your email for password reset instructions.",
        });
        setEmail("");
      }
    } catch (err: any) {
      toast({
        title: "Reset Error",
        description: err.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner if checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-background/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Zwanski Tech
          </CardTitle>
          <CardDescription className="text-base">
            Join our community of developers and tech enthusiasts
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 h-11">
              <TabsTrigger value="signin" className="text-sm">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="text-sm">Sign Up</TabsTrigger>
              <TabsTrigger value="reset" className="text-sm">Reset</TabsTrigger>
            </TabsList>

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

                {siteKey && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <CheckCircle className="h-3 w-3" />
                      <span>Security verification required</span>
                    </div>
                    <Turnstile
                      siteKey={siteKey}
                      onVerify={setSigninCaptchaToken}
                      onError={handleCaptchaError}
                      onExpire={() => setSigninCaptchaToken(null)}
                    />
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-11" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
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

                {siteKey && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <CheckCircle className="h-3 w-3" />
                      <span>Security verification required</span>
                    </div>
                    <Turnstile
                      siteKey={siteKey}
                      onVerify={setCaptchaToken}
                      onError={handleCaptchaError}
                      onExpire={() => setCaptchaToken(null)}
                    />
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-11" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
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

                <Button type="submit" className="w-full h-11" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Email"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="text-center text-sm text-muted-foreground border-t pt-6">
          <p className="w-full">
            {activeTab === "signin" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setActiveTab(activeTab === "signin" ? "signup" : "signin")}
              className="text-primary font-medium underline-offset-4 hover:underline transition-colors"
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
