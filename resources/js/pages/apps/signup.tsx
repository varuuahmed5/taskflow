"use client"

import { useState } from "react"
import { ArrowRight, BarChart3, Zap, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Link,router } from "@inertiajs/react"



export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  if (!name || !email || !password) {
    alert("Fadlan ku qor dhammaan fields")
    return
  }

  router.visit("/signin")
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
    

      {/* Right Side - Sign Up Form */}
      <div className="relative flex w-full items-center justify-center bg-[#fafafa] px-6 lg:w-1/2">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            className="absolute -bottom-32 -right-32 h-[500px] w-[500px] opacity-20"
            viewBox="0 0 500 500"
            fill="none"
          >
            {[100, 140, 180, 220, 260, 300, 340, 380].map((r) => (
              <circle
                key={r}
                cx="500"
                cy="500"
                r={r}
                stroke="#c9a84c"
                strokeWidth="1"
                fill="none"
              />
            ))}
          </svg>
          <svg
            className="absolute -right-20 -top-20 h-[400px] w-[400px] opacity-15"
            viewBox="0 0 400 400"
            fill="none"
          >
            {[60, 100, 140, 180, 220, 260, 300].map((r) => (
              <circle
                key={r}
                cx="400"
                cy="0"
                r={r}
                stroke="#c9a84c"
                strokeWidth="1"
                fill="none"
              />
            ))}
          </svg>
        </div>

        <div className="absolute left-0 right-0 top-0 flex items-center gap-3 bg-gradient-to-r from-[#4f8ef7] to-[#6c5ce7] px-6 py-4 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.9" />
              <rect x="10" y="1" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.6" />
              <rect x="1" y="10" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.6" />
              <rect x="10" y="10" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.4" />
            </svg>
          </div>
          <span className="text-base font-semibold text-white">TaskFlow</span>
        </div>

        <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-black/5 lg:p-10">
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl font-bold text-[#1a1a2e]">Create account</h2>
            <p className="mt-2 text-sm text-[#6b7280]">Get started with taskflow</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-[#374151]">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-[#fafafa] px-4 text-sm text-[#1a1a2e] placeholder-[#9ca3af] outline-none transition-all focus:border-[#4f8ef7] focus:ring-2 focus:ring-[#4f8ef7]/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="signup-email" className="text-sm font-medium text-[#374151]">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-[#fafafa] px-4 text-sm text-[#1a1a2e] placeholder-[#9ca3af] outline-none transition-all focus:border-[#4f8ef7] focus:ring-2 focus:ring-[#4f8ef7]/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="signup-password" className="text-sm font-medium text-[#374151]">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-[#fafafa] px-4 text-sm text-[#1a1a2e] placeholder-[#9ca3af] outline-none transition-all focus:border-[#4f8ef7] focus:ring-2 focus:ring-[#4f8ef7]/20"
              />
            </div>

            <button
              type="submit"
              className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#4f8ef7] to-[#6c5ce7] text-sm font-semibold text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4f8ef7]/50 focus:ring-offset-2"
            >
              Create Account
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6b7280]">
            Already have an account?{" "}
            <Link href="/signin" className="font-medium text-[#4f8ef7] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}