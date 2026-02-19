import React, { useState } from "react";
import { ArrowRight, BarChart3, Zap, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import { Button, Input } from "@headlessui/react";

import AlertError from "@/components/alert-error";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

    const { errors } = usePage().props as {
  errors: Record<string, string>;
};

   
     function handleSignIn(e: React.FormEvent) {
       e.preventDefault();
   
       router.post(
         "/", // Halkan waa URL-ka POST route-ka login-ka ee Laravel
         { email, password },
         {
           onSuccess: () => {
             // Login guuleystay: backend ayaa redirect gareyn doona
           },
           
         }
       );
     }

  return (
        <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-gradient-to-t from-blue-400 via-blue-500 to-indigo-800 flex-col justify-center px-12 lg:px-16">

        
<div className="absolute inset-0 pointer-events-none">
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 800 800"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-20"
  >
    {/* Large bottom right circle (reduced) */}
    <circle cx="750" cy="750" r="130" fill="white" />

    {/* Smaller overlapping circle (reduced more) */}
    <circle cx="600" cy="600" r="110" fill="white" />

    {/* Middle circle */}
    <circle cx="450" cy="450" r="110" fill="white" />

    {/* New added circle */}
    <circle cx="320" cy="320" r="100" fill="white" />

    {/* Top faint circle (much smaller) */}
    <circle cx="180" cy="130" r="50" fill="white" />
  </svg>
</div>


        {/* Decorative blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute top-1/3 right-10 w-40 h-40 rounded-full bg-blue-300/15 blur-2xl" />

        <div className="relative z-10">
          {/* Halkan waa content-ka asalka ah */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="7" height="7" rx="1.5" fill="white" />
                <rect
                  x="11"
                  y="2"
                  width="7"
                  height="7"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.6"
                />
                <rect
                  x="2"
                  y="11"
                  width="7"
                  height="7"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.6"
                />
                <rect
                  x="11"
                  y="11"
                  width="7"
                  height="7"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.4"
                />
              </svg>
            </div>
            <span className="text-white font-display text-xl font-bold tracking-tight">
              TaskFlow
            </span>
          </div>

          <h1 className="text-white font-display text-3xl lg:text-4xl font-bold leading-tight mb-4">
            Manage your tasks with <br /> elegance
          </h1>
          <p className="text-blue-100 text-base lg:text-lg leading-relaxed mb-10 max-w-md">
            A premium task management experience designed to boost your
            productivity.
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-white text-sm lg:text-base font-medium">
                Organize tasks by category & priority
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-white text-sm lg:text-base font-medium">
                Track progress with visual stats
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center flex-shrink-0">
                <Zap className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-white text-sm lg:text-base font-medium">
                Lightning fast & beautiful interface
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
       {/* Right Side */}
      <div className="w-full md:w-1/2 relative flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-sm relative z-10 rounded-lg bg-white p-8 shadow-md">
          <h2 className="font-display text-2xl font-semibold mb-1.5 text-center text-gray-900">
            Welcome back
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            Sign in to continue
          </p>

          <form onSubmit={handleSignIn} className="flex flex-col gap-6">

            {/* ✅ Error Alert */}
            {Object.keys(errors).length > 0 && (
              <AlertError errors={Object.values(errors)} title="Login Failed" />
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-gray-700 font-medium text-sm">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-md border border-gray-300 bg-gray-50 px-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-gray-700 font-medium text-sm">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 rounded-md border border-gray-300 bg-gray-50 px-3 pr-10 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* ✅ Fixed Submit Button */}
            <Button
              type="submit"
              className="h-11 rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}