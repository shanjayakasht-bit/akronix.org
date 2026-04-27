"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState, useMemo } from "react";

/* ─── Data ──────────────────────────────────────────────────────── */
const features = [
  { title: "Conversion Optimization", desc: "Built-in tools for landing page performance tracking and A/B testing to maximize user action." },
  { title: "Multi-Channel Integration", desc: "API-first design allows for seamless connection to CRM and email marketing tools like Stripe or Paddle." },
  { title: "User Lifecycle Tracking",  desc: "Detailed mapping of the user journey from initial sign-up to premium upgrade with precise analytics." },
  { title: "Growth Ecosystem",        desc: "A full suite of tools designed to convert visitors into long-term, loyal subscribers." },
];

/* ─── Parallax image panel ───────────────────────────────────────── */
function ParallaxImagePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rawY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <div ref={ref} className="relative aspect-square lg:order-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full relative rounded-[3rem] overflow-hidden border border-white/10
                   bg-black/40 backdrop-blur-3xl group shadow-[0_0_100px_rgba(0,0,0,0.5)]"
      >
        <motion.div style={{ y }} className="absolute inset-0 scale-110">
          <Image
            src="/blog-marketing.png"
            alt="Digital Marketing"
            fill
            className="object-cover opacity-40 grayscale group-hover:grayscale-0
                       group-hover:scale-110 transition-all duration-[2000ms] mix-blend-screen"
          />
        </motion.div>
        <motion.div
          animate={{ top: ["-100%", "200%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-fuchsia-400/0 via-fuchsia-400/10
                     to-transparent opacity-0 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent/20 to-transparent" />
        <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-white/20 group-hover:border-fuchsia-500/50 transition-colors" />
        <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-white/20 group-hover:border-fuchsia-500/50 transition-colors" />
      </motion.div>
    </div>
  );
}

/* ─── Workflow Wave Section ─────────────────────────────────────── */
function WorkflowSection() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const progress = useMotionValue(0);

  const wavePath = "M0 50 C100 50 130 75 220 75 C310 75 360 25 450 25 C540 25 590 75 670 75 C760 75 800 25 880 25 C950 25 1000 25 1000 25";

  const nodes = useMemo(() => [
    { cx: 220, cy: 75, num: 1, label: "Capture Lead",     desc: "Lead data entry via 'Zero Friction' sign-up workflows at the product entry point.", color: "#00F0FF", above: false },
    { cx: 450, cy: 25, num: 2, label: "Analyze",          desc: "Data feeds directly into the Advanced Analytics suite for deep behavioral insights.", color: "#9D5BFF", above: true  },
    { cx: 670, cy: 75, num: 3, label: "Target",           desc: "Running automated campaigns based on specific user behavior and lifecycle triggers.", color: "#00F0FF", above: false },
    { cx: 880, cy: 25, num: 4, label: "ROI Track",        desc: "Full visibility into campaign success through integrated billing and usage data.",    color: "#9D5BFF", above: true  },
  ], []);

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 10,
      repeat: Infinity,
      ease: "linear",
      onUpdate: (latest) => {
        const currentX = latest * 1000;
        const threshold = 40;
        const hit = nodes.find(n => currentX > n.cx - threshold && currentX < n.cx + threshold);
        setActiveNode(hit ? hit.num : null);
      }
    });
    return () => controls.stop();
  }, [progress, nodes]);

  const dashOffset = useTransform(progress, [0, 1], [0, -1000]);

  return (
    <section className="relative z-10 py-20">
      <div className="container-xl px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-14"
        >
          <div className="h-px w-7 bg-fuchsia-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-fuchsia-400">
            How It Works
          </span>
        </motion.div>

        <div className="relative w-full" style={{ height: "160px" }}>
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#00F0FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#9D5BFF" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <path d={wavePath} stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeDasharray="7 6" fill="none" />
            <motion.path
              d={wavePath}
              stroke="url(#waveGrad)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="150 850"
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>

          {nodes.map(({ cx, cy, num, label, desc, color, above }) => {
            const solidBg   = color === "#00F0FF" ? "#00282e" : "#1a0a2e";
            const glowColor = color === "#00F0FF" ? "rgba(0,240,255,0.25)" : "rgba(157,91,255,0.25)";
            const isActive = activeNode === num;

            return (
              <div key={num} className="absolute group" style={{ left: `${cx / 10}%`, top: `${cy}%`, transform: "translate(-50%, -50%)", zIndex: 20 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    boxShadow: isActive ? `0 0 30px ${color}` : `0 0 20px ${glowColor}`,
                    borderColor: isActive ? color : `${color}80`
                  }}
                  whileHover={{ scale: 1.15 }}
                  className="flex items-center justify-center cursor-pointer font-black text-lg select-none transition-colors duration-300"
                  style={{ width: "52px", height: "52px", borderRadius: "50%", background: solidBg, borderWidth: "2px", color: color }}
                >
                  {num}
                </motion.div>
                <div className={`absolute left-1/2 -translate-x-1/2 w-44 ${above ? "bottom-full mb-3" : "top-full mt-3"} p-4 rounded-2xl border border-white/[0.08] bg-[#0c0c18]/95 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.9)] transition-all duration-300 ease-out z-50 pointer-events-none ${isActive ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"}`}>
                  <div className="w-full h-px mb-3 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-1" style={{ color }}>Step {num}</p>
                  <h4 className="text-sm font-black text-white/90 mb-1.5 leading-snug">{label}</h4>
                  <p className="text-[11px] text-white/40 leading-relaxed">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Drifting BG orbs ──────────────────────────────────────────── */
function BgOrbs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div style={{ y: orb1Y }} className="absolute top-[8%] left-[20%] w-[550px] h-[550px] rounded-full bg-fuchsia-500/[0.04] blur-[150px]" />
      <motion.div style={{ y: orb2Y }} className="absolute top-[55%] right-[10%] w-[450px] h-[450px] rounded-full bg-cyan-500/[0.04] blur-[130px]" />
      <motion.div animate={{ opacity: [0.025, 0.055, 0.025] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function DigitalMarketingPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pageRef });
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

  return (
    <>
      <Navigation />
      <main ref={pageRef} className="bg-[#020205] text-white relative overflow-hidden">
        <BgOrbs />

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-16 z-10">
          <div className="container-xl px-6">
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-5xl">
              <div className="flex items-center gap-3 mb-8">
                <motion.div initial={{ width: 0 }} animate={{ width: "48px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="h-px bg-fuchsia-500" />
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-[10px] font-black uppercase tracking-[0.5em] text-fuchsia-400">Growth Ecosystem</motion.span>
              </div>

              <div className="overflow-visible mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter uppercase italic text-white/90 whitespace-nowrap"
                >
                  Growth <span className="gradient-text-primary">Marketing</span> Engines
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-base md:text-lg text-white/35 max-w-xl leading-relaxed font-medium uppercase tracking-widest"
              >
                Converting visitors into long-term subscribers with data-driven strategy.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }} className="mt-14 flex items-center gap-4">
                <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="w-4 h-7 border border-white/10 rounded-full flex items-start justify-center pt-1">
                  <div className="w-0.5 h-1.5 bg-white/20 rounded-full" />
                </motion.div>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Scroll to explore</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES + IMAGE ─────────────────────────────────── */}
        <section className="relative z-10 pb-20">
          <div className="container-xl px-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-12">
              <div className="h-px w-7 bg-fuchsia-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-fuchsia-400">Core Capabilities</span>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-4 order-2 lg:order-1">
                {features.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex gap-6 p-6 rounded-3xl transition-all duration-500 hover:bg-white/[0.02] border border-transparent hover:border-white/[0.05]"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-fuchsia-500/50 transition-all duration-500 shadow-2xl">
                      <CheckCircle size={20} className="text-fuchsia-400" />
                    </div>
                    <div>
                      <h3 className="font-black text-xl mb-2 text-white/90 group-hover:text-white transition-colors">{item.title}</h3>
                      <p className="text-sm md:text-base text-white/30 group-hover:text-white/50 leading-relaxed transition-colors">{item.desc}</p>
                    </div>
                    <div className="absolute right-6 top-6 text-[8px] font-black text-white/5 group-hover:text-white/10 opacity-0 group-hover:opacity-100 uppercase tracking-widest transition-all">Growth_Node_0{i + 1}</div>
                  </motion.div>
                ))}
              </div>
              <ParallaxImagePanel />
            </div>
          </div>
        </section>

        {/* ── WORKFLOW ─────────────────────────────────────────── */}
        <WorkflowSection />

        {/* ── KINETIC EDGE GLOW CTA ────────────────────────────── */}
        <section className="relative z-10 py-32">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="p-12 md:p-20 rounded-[4rem] border border-white/[0.05] bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-3xl relative overflow-hidden text-center"
            >
              <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-72 h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent" />
              <motion.div animate={{ x: ["200%", "-100%"] }} transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 1.75 }} className="absolute bottom-0 right-0 w-72 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

              <h2 className="text-3xl md:text-6xl lg:text-7xl font-black mb-8 leading-[0.9] tracking-tighter italic uppercase text-white/90">
                Boost your <span className="gradient-text-primary">Conversions</span>
              </h2>

              <p className="text-base md:text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed text-white/30 uppercase tracking-widest">
                We guide your product strategy at every layer to ensure maximum engagement and ROI.
              </p>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                <Link
                  href="/contact?service=digital-marketing"
                  className="px-12 py-5 rounded-full bg-white text-black font-black uppercase tracking-[0.2em] text-sm transition-all hover:bg-fuchsia-600 hover:text-white hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)] inline-flex items-center gap-3"
                >
                  Analyze ROI <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
