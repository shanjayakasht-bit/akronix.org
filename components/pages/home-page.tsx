"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight, Search, Palette, PlayCircle, Settings,
  GraduationCap, Sparkles, BarChart3, TrendingUp,
  ChevronRight, Zap, Globe, Star
} from "lucide-react";
import { InteractiveHeroText } from "@/components/ui/interactive-hero-text";
import { BrandEcosystem } from "@/components/ui/brand-ecosystem";

/* ── Animation Variants ──────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

/* ── Data ─────────────────────────────────────────────────────── */
const steps = [
  { step: "01", title: "Discovery", desc: "Map your idea to a precise technical blueprint.", icon: Search, phase: "DISCOVERY" },
  { step: "02", title: "Design & Build", desc: "Agile sprints with weekly demos and live previews.", icon: Palette, phase: "ASSEMBLY" },
  { step: "03", title: "Launch", desc: "Thorough QA and zero-downtime production rollout.", icon: PlayCircle, phase: "LAUNCH" },
  { step: "04", title: "Scale", desc: "Elastic infrastructure engineered for 1M+ users.", icon: Settings, phase: "SCALE" },
];

const capabilities = [
  { icon: GraduationCap, title: "Founder Mentorship", desc: "Product-market fit, venture strategy, and investor-ready foundations.", color: "#00F0FF", tag: "CAP_01" },
  { icon: Sparkles, title: "Visual Narrative", desc: "World-class brand identity and premium storytelling that drives valuation.", color: "#9D5BFF", tag: "CAP_02" },
  { icon: BarChart3, title: "Venture Intelligence", desc: "Data-driven insights to guide your roadmap and operational logic.", color: "#A5B4FC", tag: "CAP_03" },
  { icon: TrendingUp, title: "Ecosystem Scaling", desc: "Elastic mission-critical infrastructure built beyond the launch.", color: "#00F0FF", tag: "CAP_04" },
];

const stats = [
  { value: "50+", label: "Global Partners", icon: Globe },
  { value: "3×", label: "Avg. Growth Rate", icon: TrendingUp },
  { value: "98%", label: "Client Retention", icon: Star },
  { value: "12d", label: "Avg. First Deploy", icon: Zap },
];

/* ── Animated Counter ─────────────────────────────────────────── */
function AnimatedStat({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2 group"
    >
      <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-1 group-hover:border-cyan-400/30 transition-colors duration-500">
        <Icon size={16} className="text-white/30 group-hover:text-cyan-400 transition-colors duration-500" />
      </div>
      <span className="text-3xl md:text-4xl font-black tracking-tighter text-white">{value}</span>
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25">{label}</span>
    </motion.div>
  );
}

/* ── Component ────────────────────────────────────────────────── */
export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const axisScaleY = useSpring(
    useTransform(scrollYProgress, [0.3, 0.85], [0, 1]),
    { damping: 25, stiffness: 80 }
  );

  return (
    <div ref={containerRef} className="overflow-hidden bg-[#020205]">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-60 left-1/4 w-[900px] h-[900px] rounded-full blur-[180px] opacity-15"
            style={{ background: "radial-gradient(circle, #00F0FF, transparent 70%)" }} />
          <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-10"
            style={{ background: "radial-gradient(circle, #9D5BFF, transparent 70%)" }} />
        </div>
        <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />

        {/* Floating orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], opacity: [0.06, 0.15, 0.06] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
            className="absolute rounded-full blur-[70px] pointer-events-none"
            style={{
              width: 200 + i * 60, height: 200 + i * 60,
              background: i % 2 === 0 ? "rgba(0,240,255,0.2)" : "rgba(157,91,255,0.2)",
              left: `${[10, 70, 20, 80][i]}%`, top: `${[20, 30, 70, 65][i]}%`,
            }}
          />
        ))}

        <div className="container-xl relative z-10 text-center">
          {/* Hero word mark */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-32 sm:h-44 md:h-56 mb-6"
          >
            <InteractiveHeroText />
          </motion.div>

          {/* Sub-label */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-base sm:text-lg md:text-xl font-medium max-w-xl mx-auto mb-10 leading-relaxed tracking-tight text-white/35"
          >
            We help SMEs and startups build and scale premium digital products — from idea to market.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link href="/contact?type=project" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto shadow-[0_0_30px_rgba(0,240,255,0.15)]">
              Execute Vision <ArrowRight size={18} className="ml-1.5" />
            </Link>
            <Link href="/contact?type=consultation" className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto">
              Engineering Audit
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div {...fadeUp(0.4)} className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {stats.map((s) => (
              <AnimatedStat key={s.label} {...s} />
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border border-white/10 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-white/20 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── CAPABILITIES ────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden border-t border-white/[0.03]">
        {/* Background ambient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-cyan-500/[0.04] blur-[100px]" />
          <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-purple-500/[0.04] blur-[100px]" />
        </div>

        <div className="container-xl relative z-10">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-lg">
              <motion.div {...fadeUp()} className="flex items-center gap-3 mb-4">
                <div className="h-px w-7 bg-cyan-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400">Total Acceleration</span>
              </motion.div>
              <motion.h2 {...fadeUp(0.1)} className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.88] uppercase italic text-white/90">
                Beyond the <span className="gradient-text-primary">Build.</span>
              </motion.h2>
            </div>
            <motion.p {...fadeUp(0.2)} className="text-base text-white/25 max-w-xs font-medium leading-relaxed uppercase tracking-widest md:text-right">
              Engineering business outcomes,<br />not just code.
            </motion.p>
          </div>

          {/* Capability cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map(({ icon: Icon, title, desc, color, tag }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.08)}
                className="group relative p-7 rounded-3xl bg-white/[0.02] border border-white/[0.05] overflow-hidden flex flex-col justify-between min-h-[280px] transition-all duration-500 hover:border-white/10 hover:bg-white/[0.035] cursor-pointer"
              >
                {/* Hover sweep */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <motion.div
                    animate={{ x: ["-120%", "220%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-20deg]"
                  />
                </div>
                {/* Glow dot */}
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full"
                  style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                />

                <div className="relative z-10">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                    style={{ background: `${color}10`, border: `1px solid ${color}25` }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <h3 className="text-lg font-black mb-2.5 tracking-tight uppercase italic text-white/85">{title}</h3>
                  <p className="text-[13px] leading-relaxed text-white/30 group-hover:text-white/55 transition-colors duration-500 font-medium">
                    {desc}
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between mt-6">
                  <span className="text-[9px] font-black text-white/10 uppercase tracking-widest">{tag}</span>
                  <div className="w-8 h-px bg-white/10 group-hover:w-14 transition-all duration-500" style={{ '--tw-shadow-color': color } as React.CSSProperties} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXECUTION STRATEGY ──────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden border-t border-white/[0.03]">
        {/* Background particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-cyan-500/[0.04] to-transparent" />
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -30, 0], x: [0, 15, 0], opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.8 }}
              className="absolute w-[250px] h-[250px] rounded-full blur-[90px]"
              style={{
                background: i % 2 === 0 ? "rgba(0,240,255,0.12)" : "rgba(157,91,255,0.12)",
                left: `${i * 22}%`, top: `${15 + i * 18}%`,
              }}
            />
          ))}
        </div>

        <div className="container-xl relative z-10">
          {/* Section header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400" />
              <span className="text-[11px] font-black uppercase tracking-[0.6em] text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">Execution Strategy</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-7xl font-black mb-5 leading-[0.88] tracking-tighter italic uppercase"
            >
              Turning <span className="gradient-text-primary">chaos</span> into code.
            </motion.h2>

            <motion.p
              {...fadeIn(0.3)}
              className="text-sm text-white/35 max-w-lg mx-auto font-medium uppercase tracking-widest"
            >
              A high-precision framework built for <span className="text-white/70">market-dominant ecosystems</span>.
            </motion.p>
          </div>

          {/* Steps timeline */}
          <div className="relative">
            {/* Central axis */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden hidden md:block">
              {/* Static track */}
              <div className="absolute inset-0 bg-white/[0.04]" />
              {/* Animated fill */}
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent"
                style={{ scaleY: axisScaleY, transformOrigin: "top", height: "100%" }}
              />
              {/* Traveling pulse */}
              <motion.div
                animate={{ top: ["-15%", "115%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-24 bg-gradient-to-b from-transparent via-cyan-400/70 to-transparent z-10"
              />
            </div>

            <div className="space-y-20 md:space-y-32 relative">
              {steps.map(({ step, title, desc, icon: StepIcon, phase }, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex flex-col md:flex-row items-center relative ${!isEven ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Content side */}
                    <div className={`w-full md:w-[44%] ${isEven ? "md:pr-20" : "md:pl-20"}`}>
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -16 : 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                        className={`group relative p-7 rounded-3xl border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-500 ${isEven ? "text-left" : "text-right"}`}
                      >
                        {/* Phase label */}
                        <div className={`flex items-center gap-3 mb-4 ${!isEven ? "flex-row-reverse" : ""}`}>
                          <div className="h-px w-8 bg-gradient-to-r from-cyan-400/50 to-transparent" />
                          <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.7em] group-hover:text-cyan-400 transition-colors duration-500">
                            {phase}
                          </span>
                        </div>

                        {/* Large bg step number */}
                        <div className="absolute inset-0 flex items-center justify-center text-[10rem] font-black text-white/[0.013] pointer-events-none select-none italic group-hover:text-cyan-400/[0.025] transition-colors duration-700">
                          {step}
                        </div>

                        <h3 className="relative text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-[0.88] mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-400 transition-all duration-500">
                          {title}
                        </h3>
                        <p className="relative text-sm md:text-base text-white/35 leading-relaxed font-medium group-hover:text-white/60 transition-colors duration-500 uppercase tracking-wide">
                          {desc}
                        </p>
                      </motion.div>
                    </div>

                    {/* Center node */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
                      <div className="relative group cursor-default">
                        {/* Orbital ring */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-10 border border-white/[0.07] rounded-full border-dashed"
                        />
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-6 border border-cyan-500/[0.08] rounded-full"
                        />
                        {/* Core */}
                        <motion.div
                          whileHover={{ scale: 1.12 }}
                          transition={{ duration: 0.4 }}
                          className="w-20 h-20 rounded-3xl bg-[#030308] border border-white/[0.08] flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.9)] group-hover:border-cyan-400/40 group-hover:bg-cyan-950/20 transition-all duration-500 overflow-hidden relative"
                        >
                          <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-white/15" />
                          <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-white/15" />
                          <StepIcon size={28} className="text-white/25 group-hover:text-cyan-400 transition-all duration-500 relative z-10 group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]" />
                        </motion.div>
                        {/* Connector line */}
                        <motion.div
                          animate={{ opacity: [0.4, 0.9, 0.4] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          className={`absolute top-1/2 ${isEven ? "right-full mr-2" : "left-full ml-2"} h-px w-[calc(100%-0px)] bg-gradient-to-r from-cyan-400/50 to-transparent hidden xl:block`}
                          style={{ width: "4rem" }}
                        />
                      </div>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block w-[44%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND ECOSYSTEM ───────────────────────────────────────── */}
      <BrandEcosystem />

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="container-xl relative z-10 px-4">
          <motion.div
            {...fadeUp()}
            className="relative rounded-[28px] overflow-hidden text-center py-16 px-8 md:py-20 md:px-16 border border-white/[0.06]"
            style={{
              background: "linear-gradient(135deg, rgba(12,12,22,0.98) 0%, rgba(8,8,18,0.98) 100%)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Ambient glows */}
            <div className="absolute -top-20 left-1/4 w-60 h-60 bg-cyan-500/[0.06] rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-20 right-1/4 w-60 h-60 bg-purple-500/[0.06] rounded-full blur-[80px] pointer-events-none" />

            <motion.div {...fadeUp(0.1)} className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400">Ready to Launch</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400" />
            </motion.div>

            <motion.h2 {...fadeUp(0.15)} className="text-4xl sm:text-6xl font-black mb-5 leading-[0.9] tracking-tighter uppercase">
              Let&apos;s build your <span className="gradient-text-primary">next big thing.</span>
            </motion.h2>
            <motion.p {...fadeUp(0.2)} className="text-sm md:text-base mb-10 max-w-xl mx-auto font-medium text-white/40 uppercase tracking-[0.15em] leading-relaxed">
              From architecture planning to production scale — we guide your product at every layer.
            </motion.p>
            <motion.div {...fadeUp(0.25)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary text-base px-10 py-3.5 shadow-[0_0_35px_rgba(0,240,255,0.12)]">
                Start a Project <ArrowRight size={18} className="ml-1.5" />
              </Link>
              <Link href="/services" className="btn-secondary text-base px-10 py-3.5">
                View Services <ChevronRight size={18} className="ml-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
