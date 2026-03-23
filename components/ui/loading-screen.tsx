"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<"init" | "logo" | "done">("init");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const t1 = setTimeout(() => setPhase("logo"), 300);
    const t2 = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Don't render on server or if not mounted yet
  if (!mounted || !loading) return null;

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "var(--c-bg, #020205)" }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
              style={{ background: "radial-gradient(circle, #5B4DFF, transparent 70%)" }}
            />
          </div>

          {/* Logo + brand */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: phase === "logo" ? 1 : 0, y: phase === "logo" ? 0 : 16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo image */}
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-30"
                style={{ background: "linear-gradient(135deg, #5B4DFF, #9B8FFF)" }}
              />
              <Image
                src="/logo.jpeg"
                alt="Akronix"
                width={88}
                height={88}
                className="relative rounded-2xl border border-white/10 object-contain"
                priority
              />
            </div>

            {/* Brand name */}
            <div className="text-center">
              <p
                className="text-3xl font-black tracking-tighter"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #9B8FFF 50%, #5B4DFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                AKRONIX
              </p>
              <motion.p
                className="text-xs text-white/30 uppercase tracking-[0.4em] mt-1"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                Loading
              </motion.p>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 flex flex-col gap-2">
            <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #5B4DFF, #9B8FFF, #F08A8A)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
