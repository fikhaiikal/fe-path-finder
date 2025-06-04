import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Upload, Check, Plus } from "lucide-react"
import Link from "next/link"

export default function PathFinderLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-xl text-gray-900">PathFinder</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                CV Review
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Job Recommendation
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                FAQ
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-teal-500">
                Log In
              </Button>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">Sign Up</Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/14a37ebb8c6b5ac3d6a55b26d0c767fe5a128894.jpg')",
            backgroundSize: "40%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        ></div>

        <div className="relative container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 mb-4 italic">Discover Careers, Unleash Potential</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Exploring <span className="text-teal-500">Career</span> Paths
                <br />
                Based on <span className="text-teal-500">CV</span> Competencies
              </h1>
            </div>

            <div className="text-gray-600 space-y-4">
              <p>
                AI-powered platform that analyzes users' CVs, provides personalized feedback, and recommends suitable
                job opportunities based on skills, streamlining the job search and recruitment process.
              </p>
            </div>
          </div>

          {/* CV Review Card */}
          <div className="mt-16 flex justify-center">
            <Card className="w-full max-w-md bg-white shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold">Review your CV now!</CardTitle>
                <CardDescription>Upload your CV or Resume and let the magic work</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag your files or <span className="text-teal-500 font-medium">browse</span>
                  </p>
                  <p className="text-sm text-gray-400">Less than 10MB are allowed</p>
                  <p className="text-xs text-gray-400 mt-2">Only support .pdf files</p>
                </div>
                <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">Analyze CV</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Job Recommendation Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-500 mb-4">Analyzed Result</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Job Recommendation</h2>
              <p className="text-gray-600">
                There are some job recommendations that most suitable for you based on your CV or Resume
              </p>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">?</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Sign in to see job position recommendations for you.
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              60.52% of the workforce in Indonesia are employed in jobs that do not match their educational level and/or
              field of study.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" className="text-teal-500 border-teal-500">
                Log In
              </Button>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">Sign Up</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Plans & Pricing</h2>
            <p className="text-gray-600">See the most suitable package for you</p>
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
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-gray-500 mb-4">We've answered your questions</p>
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border rounded-lg hover:bg-gray-50">
                <span className="font-medium">What is PathFinder and how does it work?</span>
                <Plus className="w-5 h-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border-t">
                <p className="text-gray-600">
                  PathFinder is an AI-powered platform that analyzes your CV using OCR and NLP to provide personalized
                  feedback and job recommendations that align with your skills and background.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border rounded-lg hover:bg-gray-50">
                <span className="font-medium">Do I need to manually search for jobs on PathFinder?</span>
                <Plus className="w-5 h-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border-t">
                <p className="text-gray-600">
                  No, PathFinder automatically recommends job listings that match your competencies, pulled from various
                  job portals through APIs or web scraping.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left border rounded-lg hover:bg-gray-50">
                <span className="font-medium">Is my personal data safe when I upload my CV?</span>
                <Plus className="w-5 h-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border-t">
                <p className="text-gray-600">
                  Yes, we prioritize user privacy and security. Your data is processed securely and used solely to
                  provide tailored recommendations and feedback.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© Copyright CC25-CF013. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
