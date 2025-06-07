"use client";

import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Upload, Check, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Header />

      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 pt-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#222831] mb-4 italic">Discover Careers, Unleash Potential</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#10375C] mb-6 leading-tight lg:leading-tight">
                Exploring <span className="text-[#17E3B2]">Career</span> <span className="inline-block">Paths</span>
                <br />
                <span className="inline-block mt-2">Based on <span className="text-[#17E3B2]">CV</span> Competencies</span>
              </h1>
            </div>
            <div className="text-gray-600 space--4 flex justify-end">
              <p>
                AI-powered platform that analyzes users' CVs, provides personalized feedback, and recommends suitable
                job opportunities based on skills, streamlining the job search and recruitment process.
              </p>
            </div>
          </div>
        </div>

        {/* CV Review Card Section */}
        <motion.div
          id="cv-review"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-42 bg-gray-50 flex justify-center relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{
              backgroundImage: "url('/14a37ebb8c6b5ac3d6a55b26d0c767fe5a128894.jpg')",
            }}
          ></div>
          <div className="absolute inset-0" style={{ backgroundColor: '#051D4099' }}></div>
          <div className="relative w-full max-w-md">
            <Card className="w-full bg-white shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-[#051D40] text-left font-bold">Review your CV now!</CardTitle>
                <CardDescription className="text-left">Upload your CV or Resume and let the magic work</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-[#222831] rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag your files or <span className="text-[#222831] font-medium">browse</span>
                  </p>
                  <p className="text-sm text-gray-400">Less than 10MB are allowed</p>
                </div>
                <p className="text-xs text-gray-400 mt-2">Only support .pdf files</p>
                <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">Analyze CV</Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* Job Recommendation Section */}
      <motion.section
        id="job-recommendation"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="pt-10">
              <p className="text-[#222831] mb-4 italic">Analyzed Result</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Job Recommendation</h2>
            </div>
            <div className="text-right pt-10">
              <p className="text-gray-600">
                There are some job recommendations that most suitable for you based on your CV or Resume
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="mb-8">
              <img 
                src="/70e2345212a7b1fe33ef11e848f99e7e76336e27.png" 
                alt="Job recommendations illustration" 
                className="max-w-xs mx-auto"
              />
            </div>
            <h3 className="text-3xl font-bold text-black-900 mb-4">
              Sign in to see job position recommendations for you.
            </h3>
            <p className="text-black-600 mb-8 max-w-2xl mx-auto">
              60.52% of the workforce in Indonesia are employed in jobs that do not match their educational level and/or
              field of study.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-[#17E3B2]">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#17E3B2] hover:bg-[#14c99d] text-white">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Add other sections (Pricing, FAQ, Contact) here */}
    </div>
  );
} 