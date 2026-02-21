import React, { useState } from "react";
import { ArrowRight, BarChart3, Zap, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { RxTarget } from "react-icons/rx";
import { LuSparkles } from "react-icons/lu";


export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

 function handleSignIn(e: React.FormEvent) {
  e.preventDefault();

  if (!email || !password) {
    alert("Email iyo password soo geli");
    return;
  }

 router.post('/login', { email, password }, {
    onError: (errors) => {
      alert(errors.email || 'Login failed');
    }
  });
}

  return (
    <div className="flex min-h-screen">
          {/* Left Side */}
<div className="hidden md:flex md:w-1/2 relative overflow-hidden flex-col items-center justify-center px-12 lg:px-16 " 
style={{
          background: "linear-gradient(135deg, hsl(258 89% 70%) 0%, hsl(230 82% 58%) 35%, hsl(210 89% 59%) 65%, hsl(199 99% 55%) 100%)",
        }}>

         
         <div className="absolute inset-0 pointer-events-none">
           <svg
             width="100%"
             height="100%"
             viewBox="0 0 800 800"
             xmlns="http://www.w3.org/2000/svg"
             className="opacity-20"
           >
             {/* Large bottom right circle (reduced) */}
             <circle cx="750" cy="750" r="140" fill="white" />
         
             {/* Smaller overlapping circle (reduced more) */}
             <circle cx="600" cy="600" r="130" fill="white" />
         
             {/* Middle circle */}
             <circle cx="450" cy="450" r="110" fill="white" />
         
             {/* New added circle */}
             <circle cx="320" cy="320" r="100" fill="white" />
         
             {/* Top faint circle (much smaller) */}
             <circle cx="200" cy="160" r="50" fill="white" />
              {/* Top faint circle (much smaller) */}
             <circle cx="140" cy="80" r="30" fill="white" />
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
                       <svg width="20" height="20" viewBox="0 0 15 15" color="white" fill="none">
                         <LuSparkles />
                         
                         
                       </svg>
                     </div>
                     <span className="text-white font-display text-2xl font-bold tracking-tight">
                       
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
                         <RxTarget className="w-4.5 h-4.5 text-white" />
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
          <div className="w-full md:w-1/2 relative flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-sm relative z-10 rounded-lg bg-white p-8 shadow-md">
          <h2 className="font-display text-2xl font-semibold mb-1.5 text-center text-gray-900">
            Welcome back
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            Sign in to continue
          </p>
      
          <form onSubmit={handleSignIn} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-gray-700 font-medium text-sm">
                Email
              </label>
              <input
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
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 rounded-md border border-gray-300 bg-gray-50 px-3 pr-10 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
      
            <button
  type="submit"
  className="h-11 rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition"
>
  Sign In
  <ArrowRight className="w-5 h-5" />
</button>

          </form>
      
          <p className="text-center text-sm text-gray-500 mt-6">
            <Link href="/signup" className="text-blue-600 font-medium hover:underline">
             Don't have an account?{" "} Sign up
            </Link>
          </p>
        </div>
      </div>
      </div>
  );
}