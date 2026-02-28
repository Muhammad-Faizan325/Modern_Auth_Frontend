import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";

const Verify = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [message, setMessage] = useState("Verifying your identity...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Thora delay for smooth animation transitions
        const res = await axios.post(
          `http://localhost:5000/user/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.data.success) {
          setStatus("success");
          setMessage("Email Verified Successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 2500);
        } else {
          setStatus("error");
          setMessage("Invalid or Expired Token");
        }
      } catch (error) {
        console.log(error);
        setStatus("error");
        setMessage("Verification Failed. Please try again.");
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]"></div>

      <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2.5rem] text-white">
        <CardContent className="pt-10 pb-10 text-center space-y-6">
          {/* Dynamic Icon Section */}
          <div className="flex justify-center">
            {status === "loading" && (
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
                <Loader2 className="h-16 w-16 text-indigo-400 animate-spin relative z-10" />
              </div>
            )}
            {status === "success" && (
              <div className="bg-emerald-500/20 p-4 rounded-full animate-in zoom-in duration-500">
                <CheckCircle2 className="h-16 w-16 text-emerald-400" />
              </div>
            )}
            {status === "error" && (
              <div className="bg-red-500/20 p-4 rounded-full animate-in zoom-in duration-500">
                <XCircle className="h-16 w-16 text-red-400" />
              </div>
            )}
          </div>

          {/* Text Section */}
          <div className="space-y-2">
            <h2
              className={`text-2xl font-bold tracking-tight ${
                status === "error" ? "text-red-400" : "text-white"
              }`}
            >
              {status === "loading"
                ? "Almost There..."
                : status === "success"
                  ? "Verification Complete"
                  : "Verification Failed"}
            </h2>
            <p className="text-gray-400 font-medium">{message}</p>
          </div>

          {/* Progress indicator for success */}
          {status === "success" && (
            <div className="pt-4 space-y-3">
              <p className="text-xs text-indigo-300 animate-pulse uppercase tracking-widest font-bold">
                Redirecting to Login...
              </p>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full animate-progress-grow origin-left"></div>
              </div>
            </div>
          )}

          {/* Fallback button for error */}
          {status === "error" && (
            <button
              onClick={() => navigate("/signup")}
              className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 font-semibold transition-colors underline underline-offset-4"
            >
              Back to Sign Up
            </button>
          )}

          <div className="pt-4 flex items-center justify-center gap-2 opacity-40">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-widest font-bold">
              Secure Verification System
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Verify;
