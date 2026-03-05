import React, { useState } from "react";
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
import { Eye, EyeOff, Loader2, LogIn, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getData } from "@/context/userContext";
import Google from "../assets/googleLogo.png";

const Login = () => {
  const { setUser } = getData();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("accessToken", res.data.accessToken);
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-4 relative overflow-hidden">
      {/* Animated Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>

      <div className="w-full max-w-md z-10 space-y-8">
        {/* Brand Logo Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-white italic">
            Brain<span className="text-indigo-400">Vault</span>
          </h1>
          <p className="text-indigo-200/60 font-medium">
            Access your Second Brain
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2.5rem] text-white overflow-hidden">
          <CardHeader className="pt-10 pb-6 text-center">
            <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to continue your journey
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 px-8">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-indigo-200/70 ml-1">
                Email Address
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 h-12 bg-white/5 border-white/10 focus:border-indigo-500 focus:ring-indigo-500/50 rounded-xl transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <Label htmlFor="password" className="text-indigo-200/70">
                  Password
                </Label>
                <Link
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  to={"/forgot-password"}
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 h-12 bg-white/5 border-white/10 focus:border-indigo-500 focus:ring-indigo-500/50 rounded-xl transition-all"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:bg-transparent hover:text-indigo-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Verifying...
                </>
              ) : (
                "Login"
              )}
            </Button>

            {/* Divider */}
            <div className="relative py-4">
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button */}
            <Button
              onClick={() =>
                window.open(
                  `${import.meta.env.VITE_BASE_URL}/auth/google`,
                  "_self",
                )
              }
              variant="outline"
              className="w-full h-12 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all flex gap-3"
            >
              <img src={Google} alt="Google" className="w-5 h-5" />
              Sign in with Google
            </Button>
          </CardContent>

          <CardFooter className="pb-8 pt-4 flex justify-center">
            <p className="text-sm text-gray-400">
              New here?{" "}
              <Link
                to="/signup"
                className="text-indigo-400 hover:text-indigo-300 font-bold underline-offset-4 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
