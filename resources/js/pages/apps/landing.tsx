import React, { useState } from "react";
import { ArrowRight, BarChart3, Zap, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

     const { errors } = usePage().props;
   
     function handleSignIn(e: React.FormEvent) {
       e.preventDefault();
   
       router.post(
         "/", // Halkan waa URL-ka POST route-ka login-ka ee Laravel
         { email, password },
         {
           onSuccess: () => {
             // Login guuleystay: backend ayaa redirect gareyn doona
           },
           onError: () => {
             // Haddii qof aan signup samaynin isku dayo inuu login-gareeyo
             alert(errors.email || "Login failed. Please sign up first.");
           },
         }
       );
     }

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex-col justify-center px-12 lg:px-16">

        {/* Decorative blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute top-1/3 right-10 w-40 h-40 rounded-full bg-blue-300/15 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="7" height="7" rx="1.5" fill="white" />
                <rect x="11" y="2" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.6" />
                <rect x="2" y="11" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.6" />
                <rect x="11" y="11" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.4" />
              </svg>
            </div>
            <span className="text-white font-display text-xl font-bold tracking-tight">TaskFlow</span>
          </div>

          <h1 className="text-white font-display text-3xl lg:text-4xl font-bold leading-tight mb-4">
            Manage your tasks with <br /> elegance
          </h1>
          <p className="text-blue-100 text-base lg:text-lg leading-relaxed mb-10 max-w-md">
            A premium task management experience designed to boost your productivity.
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
     <div className="w-full md:w-1/2 relative flex items-center justify-center bg-card px-6 py-12 bg-gradient-to-tl from-white to-gray-100">
        <div className="w-full max-w-sm relative z-10 border rounded-lg px-2 border-gray-200 pb-8  bg-white mr-4">
          <h2 className=" font-display text-2xl font-bold mb-1.5 text-black text-center">
            Welcome back
          </h2>
          <p className="text-muted-foreground text-sm mb-8 text-center">
            Sign in to taskflow
          </p>

          <form onSubmit={handleSignIn} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-black font-bold text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-lg border border-gray-300 text-black px-3.5 font-bold text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="font-bold text-sm font-medium text-black">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 rounded-lg border border-gray-300 text-black px-3.5 pr-10 text-sm font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="h-11 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Link href="/signin">Sign In</Link>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
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