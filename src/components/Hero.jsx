import { ArrowRight, Zap, Sparkles, CheckCircle2 } from "lucide-react";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { getData } from "@/context/userContext";

const Hero = () => {
  const { user } = getData();
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#020617] overflow-hidden px-4">
      {/* --- Advanced Background Layer --- */}
      {/* Animated Gradient Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]"></div>

      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Floating Blobs with Animation */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

      {/* --- Content Layer --- */}
      <section className="relative z-10 max-w-5xl text-center space-y-10 text-white">
        {user && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-indigo-200">
              Welcome back, {user.username}
            </span>
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1]">
            Organize Your Ideas.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Build Your Second Brain.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed">
            Capture thoughts instantly, manage tasks with precision, and scale
            your workflow with our intelligent modern productivity hub.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-4">
          <Button
            onClick={() => navigate("/create-todo")}
            size="lg"
            className="group relative bg-indigo-600 hover:bg-indigo-500 px-10 h-14 text-lg rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full"></div>
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="h-14 px-10 text-lg border border-white/10 text-white hover:bg-white/5 backdrop-blur-sm rounded-xl"
          >
            Watch Demo
          </Button>
        </div>

        {/* --- Trust Indicators --- */}
        <div className="pt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 opacity-60">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>End-to-End Encryption</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Instant Sync</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>No Credit Card</span>
          </div>
        </div>
      </section>

      {/* Decorative Bottom Shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent"></div>
    </div>
  );
};

export default Hero;
