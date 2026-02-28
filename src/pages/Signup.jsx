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

import { Eye, EyeOff, Loader2 } from "lucide-react";

import { toast } from "sonner";

import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",

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
    e.preventDefault();

    try {
      setIsLoading(true);

      const res = await axios.post(
        `https://modern-auth-frontend.vercel.app/user/register`,

        formData,

        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/verify");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl text-white">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Create Account
          </CardTitle>

          <CardDescription className="text-gray-300">
            Join us and start organizing your ideas
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Username */}

          <div className="space-y-2">
            <Label>Full Name</Label>

            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="John Doe"
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Email */}

          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Password */}

          <div className="space-y-2">
            <Label>Password</Label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-sm text-gray-300 text-center mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
