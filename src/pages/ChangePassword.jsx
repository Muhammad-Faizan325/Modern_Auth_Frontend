import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2, Lock, ShieldCheck, AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChangePassword = () => {
  const { email } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `import.meta.env.BASE_URLuser/change-password/${email}`,
        {
          newPassword,
          confirmPassword,
        },
      );

      setSuccess(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] px-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]"></div>

      <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl text-white">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-indigo-500/20 p-3 rounded-full w-fit mb-2">
            <Lock className="w-6 h-6 text-indigo-400" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Change Password
          </CardTitle>
          <CardDescription className="text-gray-400">
            Secure your account for{" "}
            <span className="text-indigo-300 font-medium">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Status Messages */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2.5 rounded-xl text-sm animate-shake">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2.5 rounded-xl text-sm">
              <ShieldCheck className="w-4 h-4" />
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300 ml-1">New Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-white/5 border-white/10 focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-gray-600 h-12"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300 ml-1">Confirm New Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white/5 border-white/10 focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-gray-600 h-12"
              />
            </div>

            <Button
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] mt-2"
              disabled={isLoading}
              onClick={handleChangePassword}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Updating Security...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
