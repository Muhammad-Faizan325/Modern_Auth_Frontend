import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MailCheck, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-4 relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md z-10 text-center">
        {/* Brand Identity */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-black tracking-tight text-white italic">
            Brain<span className="text-indigo-400">Vault</span>
          </h1>
        </div>

        <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2.5rem] text-white overflow-hidden">
          <CardContent className="pt-12 pb-10 space-y-8">
            {/* Animated Icon Container */}
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-2xl animate-pulse scale-75"></div>
              <div className="bg-indigo-600/20 p-6 rounded-full border border-indigo-500/30 relative z-10 animate-bounce-slow">
                <MailCheck className="h-16 w-16 text-indigo-400" />
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-3 px-4">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Check Your Email
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We've sent a magic link to your inbox. Click the link to verify
                your account and start building your{" "}
                <span className="text-indigo-300 font-semibold">
                  Second Brain
                </span>
                .
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 px-4 pt-4">
              <Button
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-95 group"
                onClick={() => window.open("https://mail.google.com", "_blank")}
              >
                Open Gmail
                <ExternalLink className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
              </Button>

              <p className="text-xs text-gray-500">
                Didn't receive the email? Check your spam folder or{" "}
                <button className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4">
                  Resend link
                </button>
              </p>
            </div>

            {/* Bottom Link */}
            <div className="pt-6 border-t border-white/5 mx-6">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors group"
              >
                Back to Login
                <ArrowRight className="ml-2 h-4 w-4 opacity-50 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;
