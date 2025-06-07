"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

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
                className="text-gray-600 hover:text-gray-900"
              >
                CV Review
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('job-recommendation')}
                className="text-gray-600 hover:text-gray-900"
              >
                Job Recommendation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 hover:text-gray-900"
              >
                Pricing
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('faq')}
                className="text-gray-600 hover:text-gray-900"
              >
                FAQ
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-gray-900"
              >
                Contact Us
              </motion.button>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {isAuthPage ? (
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
            ) : (
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
          </div>
        </nav>
      </div>
    </header>
  );
} 