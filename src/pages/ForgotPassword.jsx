import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { CheckCircle, Loader2, Mail, ArrowLeft, Timer } from "lucide-react"; // Timer icon added
import React, { useState, useEffect } from "react"; // useEffect added
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // Redirect Logic: Jab email send ho jaye toh 3 seconds baad redirect karega
  useEffect(() => {
    let timeout;
    if (isSubmitted) {
      timeout = setTimeout(() => {
        navigate(`/verify-otp/${email}`);
      }, 3000);
    }
    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [isSubmitted, navigate, email]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:5000/user/forgot-password`,
        { email },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsSubmitted(true);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-4 relative overflow-hidden">
      {/* Background Aesthetic Blobs */}
      <div className="absolute top-[-5%] left-[-5%] w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-white italic">
            Brain<span className="text-indigo-400">Vault</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Recover your second brain access
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2.5rem] text-white overflow-hidden">
          <CardHeader className="space-y-1 pt-8">
            <CardTitle className="text-2xl font-bold text-center">
              Reset Password
            </CardTitle>
            <CardDescription className="text-center text-gray-400 px-4">
              {isSubmitted
                ? "Verification code sent to your inbox"
                : "Enter your email to receive a recovery code"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 px-8">
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-500/10 border-red-500/20 text-red-400 rounded-xl"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isSubmitted ? (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="bg-emerald-500/20 rounded-full p-4 relative z-10">
                    <CheckCircle className="h-12 w-12 text-emerald-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-2xl text-white">Email Sent!</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We've sent a 6-digit code to <br />
                    <span className="font-semibold text-indigo-300 italic">
                      {email}
                    </span>
                  </p>
                </div>

                {/* Redirecting Indicator */}
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                  <span className="text-xs text-gray-300 font-medium italic">
                    Redirecting to OTP screen...
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-indigo-200/70 ml-1 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email Address
                  </Label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10 focus:border-indigo-500 focus:ring-indigo-500/50 text-white h-12 rounded-xl placeholder:text-gray-600 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button
                  className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Get Verification Code"
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex justify-center pb-10">
            {!isSubmitted && (
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Sign In
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
