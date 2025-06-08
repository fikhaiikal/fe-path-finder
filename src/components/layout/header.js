"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        setUser(JSON.parse(userStr));
      } else {
        setUser(null);
      }
    }
  }, []);

  // Close dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("jobResult");
    setUser(null);
    router.push("/");
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/Clip path group.png" alt="PathFinder Logo" width={32} height={32} className="object-contain" />
            <span className="font-bold text-xl text-gray-900">PathFinder</span>
          </Link>

          {!isAuthPage && (
            <div className="hidden md:flex items-center space-x-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('cv-review')}
                className="text-gray-900 font-semibold"
              >
                CV Review
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('job-recommendation')}
                className="text-gray-900 font-semibold"
              >
                Job Recommendation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('pricing')}
                className="text-gray-900 font-semibold"
              >
                Pricing
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('faq')}
                className="text-gray-900 font-semibold"
              >
                FAQ
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="text-gray-900 font-semibold"
              >
                Contact Us
              </motion.button>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {!user && !isAuthPage && (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-[#17E3B2]">
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-[#17E3B2] hover:bg-[#14c99d] text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            {user && (
              <div className="flex items-center space-x-3">
                <span className="text-[#0B2447] font-semibold">Halo, {user.name.split(" ")[0]}</span>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdown((v) => !v)}
                    className="focus:outline-none"
                  >
                    <img
                      src={user.photoUrl || "/profile-dummy.png"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#0B2447]"
                    />
                  </button>
                  {dropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50 border">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
} 