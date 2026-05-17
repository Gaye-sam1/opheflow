import { useState, useCallback, type FormEvent, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

enum ForgotPasswordStep {
  EnterEmail = "enter-email",
  CheckEmail = "check-email",
  ResetCode = "reset-code",
  NewPassword = "new-password",
  Success = "success",
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ForgotPasswordStep>(ForgotPasswordStep.EnterEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmitEmail = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // In a real app, this would send an email
    setStep(ForgotPasswordStep.CheckEmail);
    setLoading(false);
  }, [email]);

  const handleVerifyCode = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setError("Please enter all 6 digits of the verification code");
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStep(ForgotPasswordStep.NewPassword);
    setLoading(false);
  }, [code]);

  const handleResetPassword = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (!newPassword) {
      setError("Please enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setStep(ForgotPasswordStep.Success);
    setLoading(false);
  }, [newPassword, confirmPassword]);

  const handleCodeChange = useCallback((index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value.replace(/[^0-9]/g, "");
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  }, [code]);

  const handleCodeKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="relative overflow-hidden bg-card/50 backdrop-blur-xl border-border/50 rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />

          <CardHeader className="relative pb-4">
            <div className="flex flex-col items-center pt-6 pb-4">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
                <Lock className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-center">
                {step === ForgotPasswordStep.EnterEmail && "Reset Password"}
                {step === ForgotPasswordStep.CheckEmail && "Check Your Email"}
                {step === ForgotPasswordStep.ResetCode && "Verify Code"}
                {step === ForgotPasswordStep.NewPassword && "New Password"}
                {step === ForgotPasswordStep.Success && "Password Reset!"}
              </h1>
              <p className="text-slate-400 mt-2 text-center text-sm">
                {step === ForgotPasswordStep.EnterEmail && "Enter your email and we'll send a reset link."}
                {step === ForgotPasswordStep.CheckEmail && "We've sent a 6-digit code to your email."}
                {step === ForgotPasswordStep.ResetCode && "Enter the code sent to your email."}
                {step === ForgotPasswordStep.NewPassword && "Create a new password for your account."}
                {step === ForgotPasswordStep.Success && "Your password has been successfully reset."}
              </p>
            </div>
          </CardHeader>

          <CardContent className="relative px-8 pb-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Enter Email */}
              {step === ForgotPasswordStep.EnterEmail && (
                <motion.div
                  key="enter-email"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  {error && (
                    <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-xl text-sm mb-4 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmitEmail} className="space-y-5">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-slate-300">
                        Email Address
                      </Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError(null);
                          }}
                          className={cn(
                            "pl-10 bg-background/50 border-border text-foreground placeholder-muted-foreground",
                            "focus:border-primary focus:ring-2 focus:ring-primary/20",
                            "transition-all duration-300"
                          )}
                          maxLength={100}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full gradient-primary text-primary-foreground font-semibold shadow-glow py-6 text-base group relative overflow-hidden"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Send Reset Link
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}

              {/* Step 2: Check Email */}
              {step === ForgotPasswordStep.CheckEmail && (
                <motion.div
                  key="check-email"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-8"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20"
                  >
                    <Mail className="h-10 w-10 text-primary-foreground" />
                  </motion.div>
                  <h2 className="text-xl font-black mb-2">Email Sent!</h2>
                  <p className="text-muted-foreground mb-4">
                    We've sent a 6-digit verification code to {email}. It should arrive within a few seconds.
                  </p>
                  <Button
                    onClick={() => {
                      setStep(ForgotPasswordStep.ResetCode);
                      setError(null);
                    }}
                    className="gradient-primary text-primary-foreground font-semibold"
                    disabled={loading}
                  >
                    I've Got the Code
                  </Button>
                </motion.div>
              )}

              {/* Step 3: Verify Code */}
              {step === ForgotPasswordStep.ResetCode && (
                <motion.div
                  key="verify-code"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  {error && (
                    <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-xl text-sm mb-4 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleVerifyCode} className="space-y-5">
                    <div>
                      <Label className="text-sm font-medium text-slate-300">
                        Verification Code
                      </Label>
                      <div className="flex justify-center gap-2 mt-3">
                        {code.map((digit, index) => (
                          <Input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleCodeKeyDown(index, e)}
                            className={cn(
                              "w-12 h-14 text-center text-xl font-bold",
                              "bg-background/50 border-border text-foreground",
                              "focus:border-primary focus:ring-2 focus:ring-primary/20",
                              "transition-all duration-300"
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full gradient-primary text-primary-foreground font-semibold shadow-glow py-6 text-base group relative overflow-hidden"
                      disabled={loading || code.filter(Boolean).length < 6}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Verifying...
                        </span>
                      ) : (
                        "Verify Code"
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}

              {/* Step 4: New Password */}
              {step === ForgotPasswordStep.NewPassword && (
                <motion.div
                  key="new-password"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  {error && (
                    <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-xl text-sm mb-4 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleResetPassword} className="space-y-5">
                    <div>
                      <Label htmlFor="new-password" className="text-sm font-medium text-slate-300">
                        New Password
                      </Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="new-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Min. 6 characters"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            setError(null);
                          }}
                          className="pl-10 pr-12 bg-background/50 border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                          maxLength={128}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirm-password" className="text-sm font-medium text-slate-300">
                        Confirm New Password
                      </Label>
                      <div className="relative mt-1">
                        <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Re-enter new password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setError(null);
                          }}
                          className="pl-10 pr-12 bg-background/50 border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                          maxLength={128}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full gradient-primary text-primary-foreground font-semibold shadow-glow py-6 text-base group relative overflow-hidden"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Resetting...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Reset Password
                          <Lock className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}

              {/* Step 5: Success */}
              {step === ForgotPasswordStep.Success && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-8"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20"
                  >
                    <CheckCircle2 className="h-12 w-12 text-primary-foreground" />
                  </motion.div>
                  <h2 className="text-2xl font-black mb-2">Password Reset!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your password has been successfully updated. You can now log in with your new password.
                  </p>
                  <Button
                    onClick={() => {
                      setStep(ForgotPasswordStep.EnterEmail);
                      setEmail("");
                      setError(null);
                      setNewPassword("");
                      setConfirmPassword("");
                      setShowPassword(false);
                      setShowConfirmPassword(false);
                      setCode(["", "", "", "", "", ""]);
                    }}
                    className="gradient-primary text-primary-foreground font-semibold"
                    disabled={loading}
                  >
                    Back to Login
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back to Login */}
            {(step === ForgotPasswordStep.EnterEmail ||
              step === ForgotPasswordStep.ResetCode ||
              step === ForgotPasswordStep.NewPassword) && (
              <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} OpheFlow. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
