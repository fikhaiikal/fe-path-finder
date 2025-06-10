"use client";

import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Upload, Check, Plus, FileText, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

function DonutChart({ percent }) {
  const radius = 120;
  const stroke = 42;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="block mx-auto">
      <defs>
        <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B2447" />
          <stop offset="100%" stopColor="#17E3B2" />
        </linearGradient>
      </defs>
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="url(#donutGradient)"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="square"
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s" }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="2.5rem"
        fontWeight="bold"
        fill="#10375C"
        dominantBaseline="middle"
      >
        {percent}%
      </text>
    </svg>
  );
}

export default function LandingPage() {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [jobResult, setJobResult] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      setUser(userStr ? JSON.parse(userStr) : null);
      const jobResultStr = localStorage.getItem("jobResult");
      setJobResult(jobResultStr ? JSON.parse(jobResultStr) : null);
    }
  }, []);

  // Reset jobResult di state jika user logout
  useEffect(() => {
    if (!user) {
      setJobResult(null);
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setUploading(true);
      setUploadProgress(0);
      // Simulasi animasi progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadProgress(100);
        }
      }, 20); // 2 detik total
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleAnalyzeCV = async () => {
    setLoginError("");
    if (!user) {
      setLoginError("You must be logged in to analyze your CV.");
      return;
    }
    if (!selectedFile) return;
    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const res = await fetch("https://be-path-finder.onrender.com/upload/cv", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to upload CV");
      }
      const data = await res.json();
      setJobResult(data);
      localStorage.setItem("jobResult", JSON.stringify(data));
      alert("CV uploaded and analyzed successfully!");
    } catch (err) {
      alert("Failed to upload CV. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploading(false);
  };

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
        <div className="container mx-auto px-4 pt-10 pb-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#222831] mb-4 italic">Discover Careers, Unleash Potential</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#10375C] mb-6 leading-tight lg:leading-tight">
                Exploring <span className="text-[#17E3B2]">Career</span> <span className="inline-block">Paths</span>
                <br />
                <span className="inline-block mt-2">Based on <span className="text-[#17E3B2]">CV</span> Competencies</span>
              </h1>
            </div>
            <div className="text-gray-600 flex justify-end">
              <p className="text-lg leading-[30px]">
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
          className="py-20 bg-gray-50 flex justify-center relative overflow-hidden px-2 sm:px-0"
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
                <CardTitle className="text-2xl text-[#051D40] text-left font-bold sm:text-2xl text-lg">Review your CV now!</CardTitle>
                <CardDescription className="text-left sm:text-base text-sm">Upload your CV or Resume and let the magic work</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${dragActive ? 'border-[#17E3B2] bg-teal-50' : 'border-[#222831]'} sm:p-8 p-4`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleButtonClick}
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="file"
                    accept="application/pdf"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  {selectedFile ? (
                    <div className="w-full flex flex-col items-center">
                      <div className="w-full bg-white rounded-lg shadow border flex items-center px-4 py-2 mb-2 relative">
                        <FileText className="w-8 h-8 text-red-500 mr-3" />
                        <div className="flex-1 text-left">
                          <div className="font-medium text-[#222831] text-sm break-all">{selectedFile.name}</div>
                          <div className="text-xs text-gray-400">{(selectedFile.size/1024).toFixed(0)}kb</div>
                        </div>
                        <button onClick={(e) => {e.stopPropagation(); handleRemoveFile();}} className="ml-2 p-1 rounded hover:bg-gray-100">
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#17E3B2] to-[#0B2447] h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                      <div className="w-full text-right text-xs text-gray-500 mb-2">{uploadProgress}%</div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4 sm:w-12 sm:h-12 w-8 h-8" />
                      <p className="text-gray-600 mb-2 sm:text-base text-sm">
                        Drag your PDF file here or <span className="text-[#222831] font-medium underline">browse</span>
                      </p>
                    </>
                  )}
                  <p className="text-sm text-gray-400 sm:text-sm text-xs">Only PDF files. Max 10MB.</p>
                </div>
                <p className="text-xs text-gray-400 mt-2 sm:text-xs text-[10px]">Only support .pdf files</p>
                <Button
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white sm:text-base text-sm py-2 sm:py-3"
                  onClick={selectedFile ? handleAnalyzeCV : handleButtonClick}
                  type="button"
                  disabled={analyzing || uploading || !selectedFile || (!selectedFile && !analyzing) || uploadProgress < 100}
                >
                  {analyzing ? "Analyzing..." : selectedFile ? "Analyze CV" : "Upload CV"}
                </Button>
                {loginError && (
                  <p className="text-red-500 text-xs mt-2 text-center">{loginError}</p>
                )}
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
                {user
                  ? "Upload your CV now and unlock a world of personalized job recommendations tailored just for you. Take the next step in your career journey—your dream job could be one click away!"
                  : "There are some job recommendations that most suitable for you based on your CV or Resume"}
              </p>
            </div>
          </div>

          {jobResult && jobResult.data && jobResult.data.jobs && jobResult.data.jobs.length > 0 ? (
            <div className="mt-16 space-y-12">
              {jobResult.data.jobs.map((group, idx) => (
                <div key={group.job} className="flex flex-col md:flex-row md:items-center md:space-x-8 bg-white p-6">
                  <div className="flex-shrink-0 flex justify-center items-center mb-4 mr-10 md:mb-0">
                    <DonutChart percent={group.percent} />
                  </div>
                  <div className="flex-1 ml-10">
                    <h3 className="text-2xl text-[#10375C] mb-4">
                      You're match as <span className="text-[#051D40] font-bold">{group.job.charAt(0).toUpperCase() + group.job.slice(1)}</span>
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {group.list_jobs.slice(0, 2).map((job, i) => (
                        <div
                          key={job.title + job.company_name}
                          className={`border rounded-xl p-5 bg-white shadow-sm flex flex-col justify-between h-full transition-all duration-200 ${i === 1 ? 'border-2 border-gray' : 'border border-gray-200'}`}
                        >
                          <div className="flex items-center mb-3 space-x-3">
                            {job.thumbnail ? (
                              <Image src={job.thumbnail} alt={job.company_name} width={32} height={32} className="rounded-full object-cover" />
                            ) : (
                              <div className="w-8 h-8 bg-gray-200 rounded-full" />
                            )}
                            <div>
                              <div className="font-semibold text-[#10375C] text-base leading-tight">{job.company_name}</div>
                              <div className="text-xs text-gray-400">{job.title}</div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1 mb-4">
                            <div className="flex items-center space-x-2">
                              <span role="img" aria-label="location">📍</span>
                              <span>{job.location}</span>
                            </div>
                            {job.detected_extensions && job.detected_extensions.schedule_type && (
                              <div className="flex items-center space-x-2">
                                <span role="img" aria-label="type">💼</span>
                                <span>{job.detected_extensions.schedule_type}</span>
                              </div>
                            )}
                            {job.detected_extensions && job.detected_extensions.salary && (
                              <div className="flex items-center space-x-2">
                                <span role="img" aria-label="salary">💰</span>
                                <span>{job.detected_extensions.salary}</span>
                              </div>
                            )}
                            {job.detected_extensions && job.detected_extensions.posted_at && (
                              <div className="flex items-center space-x-2">
                                <span role="img" aria-label="duration">⏳</span>
                                <span>{job.detected_extensions.posted_at}</span>
                              </div>
                            )}
                          </div>
                          <a
                            href={job.share_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto"
                          >
                            <Button className="w-full bg-[#10375C] hover:bg-[#17E3B2] text-white">Details</Button>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-16">
              <div className="mb-8">
                <img 
                  src="/70e2345212a7b1fe33ef11e848f99e7e76336e27.png" 
                  alt="Job recommendations illustration" 
                  className="max-w-xs mx-auto"
                />
              </div>
              {user ? (
                <>
                  <h3 className="text-3xl font-bold text-black-900 mb-4">
                    Ready to discover your best-fit jobs?
                  </h3>
                  <p className="text-black-600 mb-8 max-w-2xl mx-auto">
                    Upload your CV and let our AI match you with opportunities that fit your skills and ambitions. Start your journey to a brighter career today!
                  </p>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          )}
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="pricing"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#051D40] mb-4">Plans & Pricing</h2>
            <p className="text-[#222831] italic">See the most suitable package for you</p>
          </div>

          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
              {/* Free Plan */}
              <Card className="bg-teal-500 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Free</CardTitle>
                  <CardDescription className="text-teal-100">Starter</CardDescription>
                  <p className="text-sm text-teal-100">Everything you need to get started with our platform</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">Analyze CV</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">1 Recommendation Job</span>
                    </div>
                  </div>
                  <Button className="w-full bg-white text-teal-500 hover:bg-gray-100">Choose Plan</Button>
                </CardContent>
              </Card>

              {/* Professional Plan */}
              <Card className="bg-slate-800 text-white relative">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-teal-500">MOST POPULAR</Badge>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Rp 15,000<span className="text-sm font-normal">/month</span>
                  </CardTitle>
                  <CardDescription className="text-gray-300">Professional</CardDescription>
                  <p className="text-sm text-gray-300">Unlock more opportunities to enhance your career successfully</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-teal-500" />
                      <span className="text-sm">Analyze CV</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-teal-500" />
                      <span className="text-sm">3 Recommendation Jobs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-teal-500" />
                      <span className="text-sm">AI Chatbot Feedback</span>
                    </div>
                  </div>
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">Choose Plan</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-[#222831] mb-4 italic">We've answered your questions</p>
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md group">
                <span className="font-medium">What is PathFinder and how does it work?</span>
                <Plus className="w-5 h-5 transition-transform duration-400 group-data-[state=open]:rotate-45" />
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <div className="p-4 border-t animate-fade-in animate-slide-in-from-top duration-400">
                  <p className="text-gray-600 text-justify">
                    PathFinder is an AI-powered platform that analyzes your CV using OCR and NLP to provide personalized
                    feedback and job recommendations that align with your skills and background.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md group">
                <span className="font-medium">Do I need to manually search for jobs on PathFinder?</span>
                <Plus className="w-5 h-5 transition-transform duration-400 group-data-[state=open]:rotate-45" />
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <div className="p-4 border-t animate-fade-in animate-slide-in-from-top duration-400">
                  <p className="text-gray-600">
                    No, PathFinder automatically recommends job listings that match your competencies, pulled from
                    various job portals through APIs or web scraping.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md group">
                <span className="font-medium">Is my personal data safe when I upload my CV?</span>
                <Plus className="w-5 h-5 transition-transform duration-400 group-data-[state=open]:rotate-45" />
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <div className="p-4 border-t animate-fade-in animate-slide-in-from-top duration-400">
                  <p className="text-gray-600">
                    Yes, we prioritize user privacy and security. Your data is processed securely and used solely to
                    provide tailored recommendations and feedback.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        id="contact"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-black text-white py-8"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© Copyright CC25-CF013. All Rights Reserved.</p>
        </div>
      </motion.footer>

    </div>
  );
} 