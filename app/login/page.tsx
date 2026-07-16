"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Eye, EyeOff, ArrowRight, ShieldCheck, Loader2,
  AlertCircle, CheckCircle2, Lock, Mail,
} from "lucide-react";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      // NextAuth v5 beta quirk: undefined = success, object with error = failure.
      // Never treat undefined as failure.
      if (result?.error || result?.ok === false) {
        setError("Invalid email or password. Please try again.");
        triggerShake();
        return;
      }

      // Success — refresh session state then navigate
      setSuccess(true);
      router.refresh();
      setTimeout(() => router.push(callbackUrl), 700);
    } catch {
      setError("A network error occurred. Please try again.");
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex">

      {/* ── Left Panel (branding) ── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden"
        style={{ background: "linear-gradient(145deg, #111318 0%, #0D0D0D 100%)" }}
      >
        {/* Decorative amber orb */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20"
          style={{ background: "radial-gradient(circle, #F59E0B, #EA580C)" }} />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-10"
          style={{ background: "radial-gradient(circle, #3B82F6, transparent)" }} />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-black text-black text-lg">A</div>
            <div>
              <p className="text-white font-black tracking-wider text-lg leading-none">AKRONIX</p>
              <p className="text-white/30 text-[10px] font-medium tracking-widest">Build. Connect. Scale.</p>
            </div>
          </Link>
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck size={12} />
              Admin Portal
            </div>
            <h1 className="text-4xl font-black text-white leading-tight mb-4">
              Manage your<br />
              <span style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                entire platform
              </span><br />
              from one place.
            </h1>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Access the Akronix CMS to manage homepage content, leads, testimonials, blog posts, and more.
            </p>
          </div>

          {/* Feature pills */}
          <div className="space-y-2">
            {[
              "Homepage & content editor",
              "Real-time lead management",
              "Newsletter & subscribers",
              "Website settings & users",
            ].map((f) => (
              <div key={f} className="flex items-center gap-3 text-sm text-white/50">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-white/20">
          © {new Date().getFullYear()} Akronix. All rights reserved.
        </div>
      </div>

      {/* ── Right Panel (form) ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center font-black text-black">A</div>
          <span className="text-white font-black tracking-wider">AKRONIX</span>
        </div>

        <motion.div
          animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-sm"
        >
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-white mb-1">Welcome back</h2>
            <p className="text-white/40 text-sm">Sign in to your admin account</p>
          </div>

          {/* Error banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="mb-5 flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
              >
                <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-300">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success banner */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3"
              >
                <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                <p className="text-sm text-green-300">Login successful! Redirecting…</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  required
                  placeholder="admin@akronix.io"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:bg-amber-500/[0.03] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null); }}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:bg-amber-500/[0.03] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 rounded bg-white/5 border border-white/10 accent-amber-500" />
                <span className="text-xs text-white/40">Remember me</span>
              </label>
              <a href="#" className="text-xs text-amber-400 hover:text-amber-300 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full mt-2 py-3 rounded-xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-all disabled:opacity-60 hover:-translate-y-0.5 hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #F59E0B, #EA580C)",
                boxShadow: "0 4px 20px rgba(245,158,11,0.25)",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Verifying…
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={16} />
                  Redirecting…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-[#0D0D0D] text-xs text-white/20 uppercase tracking-widest">
                or
              </span>
            </div>
          </div>

          {/* Back to site */}
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-white/40 bg-white/[0.03] border border-white/8 hover:text-white/70 hover:bg-white/[0.06] transition-all"
          >
            ← Back to website
          </Link>

          <p className="text-center text-xs text-white/15 mt-6">
            By signing in you agree to our{" "}
            <Link href="/policies" className="underline hover:text-white/30 transition-colors">Terms & Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-amber-500" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
