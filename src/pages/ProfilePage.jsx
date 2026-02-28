import React from "react";
import { getData } from "@/context/userContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  ShieldCheck,
  Fingerprint,
  Settings,
  LogOut,
  CircleCheck,
  CircleX,
  Loader2,
  KeyRound, // Added icon
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, setUser } = getData();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const logoutHandler = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      setIsLoggingOut(true);
      const res = await axios.post(
        `https://modern-auth-frontend.vercel.app/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        setUser(null);
        localStorage.clear();
        toast.success("Logged out successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Profile not found state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="text-center space-y-4">
          <div className="bg-red-500/10 p-4 rounded-full w-fit mx-auto">
            <CircleX className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">Access Denied</h2>
          <p className="text-gray-400">
            Please login to view your profile security.
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 hover:bg-indigo-500 mt-2"
          >
            Login Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>

      <Card className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[2.5rem] text-white overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-600/40 to-purple-600/40 w-full border-b border-white/10"></div>

        <CardContent className="pt-0 pb-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 px-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${user.username}&background=4f46e5&color=fff`
                }
                alt="profile"
                className="relative w-36 h-36 rounded-full border-4 border-[#1e1b4b] object-cover shadow-2xl"
              />
            </div>

            <div className="text-center md:text-left flex-1 space-y-2 pb-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h2 className="text-4xl font-black tracking-tight text-white italic">
                  {user.username}
                </h2>
                <Badge
                  className={`${user.isVerified ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"} px-3 py-1 w-fit mx-auto md:mx-0`}
                >
                  {user.isVerified ? (
                    <CircleCheck className="w-3 h-3 mr-1" />
                  ) : (
                    <CircleX className="w-3 h-3 mr-1" />
                  )}
                  {user.isVerified ? "Verified" : "Unverified"}
                </Badge>
              </div>
              <p className="text-indigo-200/70 font-medium flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4" /> {user.email}
              </p>
            </div>
          </div>

          {/* Account Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 px-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                Account Status
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${user.isLoggedIn ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-gray-500"}`}
                ></div>
                <span className="font-semibold">
                  {user.isLoggedIn ? "Currently Active" : "Offline"}
                </span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                Security Grade
              </p>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-emerald-400">
                  Enhanced Protection
                </span>
              </div>
            </div>
          </div>

          {/* Security & Password Section */}
          <div className="mt-8 mx-6 p-1 rounded-2xl bg-white/5 border border-white/10">
            <div
              onClick={() => navigate("/forgot-password")}
              className="group flex justify-between items-center p-4 rounded-xl cursor-pointer hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500/20 p-2 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
                  <KeyRound className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="font-bold text-white">Change Password</p>
                  <p className="text-xs text-gray-400 text-left">
                    Update your login credentials
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 px-6">
            <Button className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
              <Settings className="w-4 h-4 mr-2" /> Preferences
            </Button>

            <Button
              variant="ghost"
              disabled={isLoggingOut}
              onClick={logoutHandler}
              className="flex-1 h-12 border border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all rounded-xl font-bold active:scale-95"
            >
              {isLoggingOut ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4 mr-2" />
              )}
              Logout
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">
              User ID: {user._id}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
