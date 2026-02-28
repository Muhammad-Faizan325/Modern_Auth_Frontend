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
import axios from "axios";
import {
  CheckCircle,
  Loader2,
  RotateCcw,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const VerifyOTP = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const { email } = useParams();
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Only numbers
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `https://modern-auth-frontend.vercel.app/user/verify-otp/${email}`,
        {
          otp: finalOtp,
        },
      );
      setSuccessMessage(res.data.message);
      setIsVerified(true);
      setTimeout(() => {
        navigate(`/change-password/${email}`);
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]"></div>

      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-black tracking-tight text-white italic">
              Brain<span className="text-indigo-400">Vault</span>
            </h1>
            <p className="text-gray-400">
              We've sent a code to{" "}
              <span className="text-indigo-300 font-medium">{email}</span>
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2.5rem] text-white overflow-hidden">
            <CardHeader className="space-y-1 pt-8">
              <div className="mx-auto bg-indigo-500/20 p-3 rounded-full w-fit mb-2">
                <ShieldCheck className="w-6 h-6 text-indigo-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Verify Identity
              </CardTitle>
              <CardDescription className="text-center text-gray-400">
                {isVerified
                  ? "Success! Ready to secure your account."
                  : "Enter the 6-digit verification code"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert
                  variant="destructive"
                  className="bg-red-500/10 border-red-500/20 text-red-400 rounded-xl"
                >
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {successMessage && !isVerified && (
                <p className="text-emerald-400 text-sm text-center font-medium animate-pulse">
                  {successMessage}
                </p>
              )}

              {isVerified ? (
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="bg-emerald-500/20 rounded-full p-4 animate-bounce">
                    <CheckCircle className="h-10 w-10 text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-white">
                      Verification Successful
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Redirecting to set your new password...
                    </p>
                  </div>
                  <Loader2 className="h-6 w-6 text-indigo-400 animate-spin" />
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-12 h-14 text-center text-2xl font-black bg-white/5 border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all rounded-xl text-white"
                        maxLength={1}
                      />
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleVerify}
                      disabled={isLoading || otp.some((digit) => digit === "")}
                      className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        "Verify & Continue"
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={clearOtp}
                      className="w-full h-12 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                      disabled={isLoading}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" /> Reset Inputs
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-center pb-8">
              <Link
                to="/forgot-password"
                title="Go back"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Change Email
              </Link>
            </CardFooter>
          </Card>

          <div className="text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-xs text-gray-500">
                Testing Code:{" "}
                <span className="font-mono font-bold text-indigo-400">
                  123456
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
