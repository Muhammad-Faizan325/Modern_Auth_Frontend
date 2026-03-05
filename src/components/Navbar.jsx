import { BookA, BookOpen, LogOut, User, Menu } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getData } from "@/context/userContext";
import axios from "axios";
import { toast } from "sonner";

const Navbar = () => {
  const { user, setUser } = getData();
  const accessToken = localStorage.getItem("accessToken");

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        setUser(null);
        toast.success(res.data.message);
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    // Glassmorphism effect: sticky, blur, and semi-transparent border
    <nav className="sticky top-0 z-[50] w-full border-b border-white/10 bg-[#0f172a]/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex gap-2 items-center hover:opacity-80 transition-opacity"
        >
          <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <h1 className="font-bold text-xl tracking-tight text-white">
            Brain<span className="text-indigo-400">Vault</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="flex gap-8 items-center">
          <ul className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-300">
            <li className="hover:text-indigo-400 transition-colors cursor-pointer">
              Features
            </li>
            <li className="hover:text-indigo-400 transition-colors cursor-pointer">
              Pricing
            </li>
            <li className="hover:text-indigo-400 transition-colors cursor-pointer">
              About
            </li>
          </ul>

          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="p-0.5 rounded-full border-2 border-indigo-500/50 hover:border-indigo-400 transition-all">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-indigo-900 text-indigo-200">
                        {user?.username?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#1e1b4b] border-white/10 text-gray-200 backdrop-blur-xl">
                  <DropdownMenuLabel className="text-gray-400 font-normal">
                    Signed in as{" "}
                    <p className="font-bold text-white">{user.username}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    asChild
                    className="focus:bg-white/10 focus:text-white cursor-pointer"
                  >
                    <Link to="/profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">
                    <BookA className="mr-2 h-4 w-4" /> My Notes
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    onClick={logoutHandler}
                    className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <button className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all shadow-lg shadow-indigo-500/20">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
