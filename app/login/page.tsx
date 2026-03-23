"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-fuchsia-950/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center mb-10 group">
          <Image
            src="/logo.jpeg"
            alt="Akronix Logo"
            width={160}
            height={50}
            className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-110 mix-blend-screen"
            priority
          />
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-white/40">
          Or{" "}
          <Link href="/register" className="font-medium text-cyan-700 hover:text-fuchsia-600 transition-colors">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card py-8 px-4 shadow-2xl rounded-3xl border-white/5 sm:px-10"
        >
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                const formData = new FormData(e.currentTarget);
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;
                
                try {
                  await signIn("credentials", {
                    email,
                    password,
                    callbackUrl: "/portal",
                    redirect: true,
                  });
                } catch (error) {
                  console.error(error);
                } finally {
                  setIsLoading(false);
                }
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 ml-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl placeholder-white/20 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-900/50 transition-all sm:text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 ml-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl placeholder-white/20 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-900/50 transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 bg-white/5 border border-white/10 rounded text-fuchsia-950 focus:ring-fuchsia-900/50"
                  />
                  <label className="ml-2 block text-xs text-white/50">
                    Remember me
                  </label>
                </div>

                <div className="text-xs">
                  <a href="#" className="font-medium text-cyan-700 hover:text-fuchsia-600 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                  {!isLoading && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
                </button>
              </div>
            </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-black text-white/30 uppercase tracking-widest font-bold">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-bold hover:bg-white/10 transition-all">
                <Github size={20} />
                <span>GitHub</span>
              </button>
            </div>
          </div>
        </motion.div>
        
        <p className="mt-8 text-center text-xs text-white/20">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
