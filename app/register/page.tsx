"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-fuchsia-950/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 -z-10" />
      
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
          Create account
        </h2>
        <p className="mt-2 text-center text-sm text-white/40">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-cyan-700 hover:text-fuchsia-600 transition-colors">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card py-8 px-4 shadow-2xl rounded-3xl border-white/5 sm:px-10"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 ml-1">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl placeholder-white/20 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-900/50 transition-all sm:text-sm"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl placeholder-white/20 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-900/50 transition-all sm:text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <input
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
                type="password"
                required
                className="appearance-none block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl placeholder-white/20 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-900/50 transition-all sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn-primary py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 group"
              >
                Create account
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-black text-white/30 uppercase tracking-widest font-bold">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-bold hover:bg-white/10 transition-all">
              <Github size={20} />
              <span>GitHub</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
