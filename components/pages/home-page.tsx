"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence, useMotionValueEvent } from "framer-motion";
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
  { step: "01", title: "Discovery", desc: "Map your idea to a precise technical blueprint.", icon: Search, phase: "DISCOVERY", image: "/assets/execution/discovery.png" },
  { step: "02", title: "Design & Build", desc: "Agile sprints with weekly demos and live previews.", icon: Palette, phase: "ASSEMBLY", image: "/assets/execution/design_build.png" },
  { step: "03", title: "Launch", desc: "Thorough QA and zero-downtime production rollout.", icon: PlayCircle, phase: "LAUNCH", image: "/assets/execution/launch.png" },
  { step: "04", title: "Scale", desc: "Elastic infrastructure engineered for 1M+ users.", icon: Settings, phase: "SCALE", image: "/assets/execution/scale.png" },
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

const heroStars = [
  { top: "15%", left: "20%", size: 1.5, delay: 0 },
  { top: "25%", left: "75%", size: 2, delay: 1 },
  { top: "45%", left: "10%", size: 1, delay: 2 },
  { top: "65%", left: "85%", size: 2.5, delay: 0.5 },
  { top: "80%", left: "30%", size: 1.5, delay: 1.5 },
  { top: "10%", left: "60%", size: 1, delay: 2.5 },
  { top: "35%", left: "40%", size: 2, delay: 0.8 },
  { top: "55%", left: "65%", size: 1.5, delay: 1.2 },
  { top: "75%", left: "15%", size: 1, delay: 2.2 },
  { top: "85%", left: "70%", size: 2.5, delay: 0.3 },
  { top: "20%", left: "90%", size: 1.5, delay: 1.8 },
  { top: "50%", left: "95%", size: 1, delay: 0.7 },
  { top: "70%", left: "50%", size: 2, delay: 2.1 },
  { top: "30%", left: "5%", size: 1.5, delay: 1.1 },
  { top: "90%", left: "8%", size: 1, delay: 0.4 },
  { top: "5%", left: "45%", size: 2, delay: 1.6 },
  { top: "40%", left: "25%", size: 1.5, delay: 2.4 },
  { top: "60%", left: "55%", size: 1, delay: 0.9 },
  { top: "95%", left: "40%", size: 2.5, delay: 1.7 },
  { top: "80%", left: "90%", size: 1.5, delay: 1.4 },
];

/* ── Execution Card ─────────────────────────────────────────── */
function ExecutionCard({ step, title, desc, icon: Icon, phase, image, index, progress }: any) {
  // Each card is active for a specific range
  // Total range is [0, 1]. For 4 cards, each gets ~0.25.
  const start = index * 0.25;
  const end = (index + 1) * 0.25;
  
  // Local progress within this card's scroll range
  const cardProgress = useTransform(progress, [start, end], [0, 1]);
  
  // Exit animations (moving to back)
  const isLast = index === steps.length - 1;
  const y = useTransform(cardProgress, [0, 0.6, 1], [0, -40, isLast ? 0 : -1000]);
  const scale = useTransform(cardProgress, [0, 0.6, 1], [1, 0.96, isLast ? 1 : 0.8]);
  const opacity = useTransform(cardProgress, [0, 0.6, 1], [1, 1, isLast ? 1 : 0]);
  const blur = useTransform(cardProgress, [0, 0.6, 1], [0, 2, isLast ? 0 : 20]);

  // Entrance animations (coming from front/bottom)
  const entranceY = useTransform(progress, [start - 0.1, start], [600, 0]);
  const entranceOpacity = useTransform(progress, [start - 0.05, start], [0, 1]);

  return (
    <motion.div
      style={{ 
        y: index === 0 ? y : (progress < start ? entranceY : y), 
        scale, 
        opacity: index === 0 ? opacity : (progress < start ? entranceOpacity : opacity),
        filter: `blur(${blur}px)`,
        zIndex: steps.length - index 
      }}
      className="absolute inset-0 w-full h-full rounded-[40px] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] bg-[#0A0A14]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#020205]" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-cyan-400" />
          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.6em]">{phase}</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-6 leading-[0.85]">
              <span className="text-white/10 mr-6 not-italic">{step}</span><br />
              {title}
            </h3>
            <p className="text-base md:text-xl text-white/40 font-medium max-w-lg leading-relaxed uppercase tracking-widest">
              {desc}
            </p>
          </div>
          
          <div className="hidden md:flex w-28 h-28 rounded-[32px] bg-white/[0.03] border border-white/10 items-center justify-center backdrop-blur-xl group">
            <Icon size={44} className="text-white/20 group-hover:text-cyan-400 transition-colors duration-500" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}


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
  const [selectedCapability, setSelectedCapability] = useState<number | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const executionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: cardsProgress } = useScroll({
    target: executionRef,
    offset: ["start start", "end end"]
  });

  // Apply spring physics to smooth out the card transitions (absorbs rigid scroll ticks)
  const smoothCardsProgress = useSpring(cardsProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  useMotionValueEvent(cardsProgress, "change", (latest) => {
    let newIndex = Math.floor(latest / 0.25);
    if (newIndex > 3) newIndex = 3;
    if (newIndex < 0) newIndex = 0;
    setActiveCardIndex(newIndex);
  });

  const scrollToCard = (index: number) => {
    if (executionRef.current) {
      const rect = executionRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const sectionTop = rect.top + scrollTop;
      const scrollableDistance = window.innerHeight * 4; // 500vh - 100vh
      const targetY = sectionTop + (index * 0.25 * scrollableDistance) + 5; // +5px buffer
      
      window.scrollTo({
        top: targetY,
        behavior: "smooth"
      });
    }
  };

  // Separate tracker for the title so it joins *as* the user scrolls to it, before it even pins
  const { scrollYProgress: titleProgress } = useScroll({
    target: executionRef,
    offset: ["start 90%", "start 40%"]
  });

  // Title join animation values
  const titleXLeft = useTransform(titleProgress, [0, 1], ["-100%", "0%"]);
  const titleXRight = useTransform(titleProgress, [0, 1], ["100%", "0%"]);
  const titleOpacity = useTransform(titleProgress, [0, 0.8], [0, 1]);


  // Minimal interactive spotlight
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div className="overflow-clip bg-[#020205]">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section 
        className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Minimal Background Layer */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Central subtle breathing core */}
          <motion.div
            animate={{ opacity: [0.06, 0.12, 0.06], scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[80vw] h-[60vh] max-w-[1000px] rounded-[100%] blur-[140px]"
            style={{ background: "radial-gradient(ellipse, #00F0FF, transparent 65%)" }}
          />
        </div>

        {/* Small glowing blobs / stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {heroStars.map((star, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-100"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                boxShadow: "0 0 10px 2px rgba(0,240,255,0.3)"
              }}
              animate={{ opacity: [0.1, 0.6, 0.1] }}
              transition={{ duration: 3 + star.delay, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
            />
          ))}
        </div>
        
        {/* Faint static grid */}
        <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

        {/* Cursor interactive spotlight */}
        <motion.div
          className="absolute top-0 left-0 pointer-events-none w-[600px] h-[600px] rounded-full blur-[90px]"
          style={{
            background: "radial-gradient(circle, rgba(157,91,255,0.18), transparent 70%)",
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            zIndex: 1
          }}
        />

        <div className="container-xl relative z-10 text-center">
          {/* Hero word mark */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-32 sm:h-44 md:h-56 mb-6"
          >
            {/* Constant light blob behind the title */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[700px] h-[180px] rounded-[100%] blur-[80px] pointer-events-none z-0"
              style={{ background: "radial-gradient(ellipse, rgba(0,240,255,0.65), transparent 70%)" }}
            />
            <div className="relative z-10 w-full h-full">
              <InteractiveHeroText />
            </div>
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

          {/* Capability cards - Infinite Auto Carousel */}
          <div className="relative w-[100vw] left-1/2 -ml-[50vw] mt-12 overflow-hidden">
            {/* Fade edges */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#020205] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#020205] to-transparent z-10 pointer-events-none" />
            
            <motion.div 
               animate={{ x: ["0%", "-50%"] }}
               transition={{ duration: 40, ease: "linear", repeat: Infinity }}
               className="flex gap-6 w-max py-8 pb-12 px-6"
            >
              {[...capabilities, ...capabilities, ...capabilities, ...capabilities].map(({ icon: Icon, title, desc, color, tag }, idx) => {
                const realIndex = idx % capabilities.length;
                return (
                  <motion.div
                    key={`${title}-${idx}`}
                    onClick={() => setSelectedCapability(realIndex)}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="shrink-0 w-[85vw] max-w-[340px] group relative p-8 rounded-[32px] bg-[#0A0A14] border border-white/[0.05] overflow-hidden flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer hover:border-white/[0.15] hover:bg-[#0c0c18] transition-colors duration-300 min-h-[380px]"
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
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: realIndex * 0.5 }}
                      className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full"
                      style={{ background: color, boxShadow: `0 0 12px ${color}` }}
                    />

                    {/* Watermark Icon — centered background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none transition-all duration-700 group-hover:opacity-[0.12]">
                      <Icon size={200} style={{ color }} />
                    </div>

                    <div className="relative z-10 w-full flex-grow pt-10">
                      <h3 className="text-2xl font-black mb-3 tracking-tight uppercase italic text-white/95">{title}</h3>
                      <p className="text-[15px] leading-relaxed text-white/40 group-hover:text-white/60 transition-colors duration-500 font-medium">
                        {desc}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between mt-8 w-full border-t border-white/[0.05] pt-6">
                      <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{tag}</span>
                      <span className="text-xs text-white/20 uppercase tracking-widest font-black group-hover:text-white flex items-center gap-2 transition-colors duration-300">
                        Explore <div className="w-3 h-3 rounded-full bg-white/20 group-hover:bg-white flex items-center justify-center transition-colors"><div className="w-1 h-1 bg-black rounded-full" /></div>
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Centered Overlay Popup */}
          <AnimatePresence>
            {selectedCapability !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedCapability(null)}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/40 backdrop-blur-sm cursor-pointer"
              >
                {(() => {
                  const { icon: Icon, title, desc, color, tag } = capabilities[selectedCapability];
                  return (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      onClick={(e) => e.stopPropagation()}
                      className="relative w-full max-w-2xl bg-[#0d0d16] p-10 sm:p-14 rounded-[36px] border border-white/20 flex flex-col justify-between shadow-[0_50px_100px_rgba(0,0,0,0.8),inset_0_1px_30px_rgba(255,255,255,0.05)] cursor-default overflow-hidden"
                    >
                      {/* Close button */}
                      <button 
                        onClick={() => setSelectedCapability(null)}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white/60 hover:text-white z-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>

                      {/* Ambient modal glow */}
                      <div 
                        className="absolute -top-32 -left-32 w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none"
                        style={{ background: color }}
                      />

                      {/* Watermark Icon */}
                      <div className="absolute -bottom-16 -right-16 opacity-[0.04] pointer-events-none -rotate-12">
                        <Icon size={500} style={{ color }} />
                      </div>

                      <div className="relative z-10 w-full mb-10 mt-16">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 tracking-tighter uppercase italic text-white">{title}</h3>
                        <p className="text-base sm:text-lg leading-relaxed text-white/50 font-medium max-w-lg">
                          {desc}
                          <br/><br/>
                          This is an expanded view. By leveraging our deeply integrated ecosystem approach, we map these specific capabilities directly into your project&apos;s technical architecture, ensuring flawless scale and absolute market superiority.
                        </p>
                      </div>

                      <div className="relative z-10 flex items-center justify-between w-full border-t border-white/10 pt-8 mt-4">
                        <span className="text-xs font-black text-white/30 uppercase tracking-[0.2em]">{tag}</span>
                        <Link href="/contact" className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 hover:bg-white text-white hover:text-black transition-colors border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                          Initiate Sequence
                        </Link>
                      </div>
                    </motion.div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── EXECUTION STRATEGY ──────────────────────────────────── */}
      <section className="relative">
        <div ref={executionRef} className="h-[500vh] relative bg-[#020205]">
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-24">
            
            {/* Side Navigation */}
            <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
              {steps.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => scrollToCard(i)} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 ${activeCardIndex === i ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-110' : 'bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10'}`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>

            {/* Background ambient */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-screen bg-gradient-to-b from-cyan-500/[0.04] to-transparent" />
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.2, 1] }}
                  transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-[800px] h-[800px] rounded-full blur-[160px]"
                  style={{
                    background: i % 2 === 0 ? "rgba(0,240,255,0.08)" : "rgba(157,91,255,0.08)",
                    left: `${i * 20 - 10}%`, top: `${10 + i * 20}%`,
                  }}
                />
              ))}
            </div>

            <div className="container-xl relative z-10 w-full px-4">
              {/* Section header with Join Animation */}
              <div className="text-center mb-12">
                <motion.div
                  style={{ opacity: titleOpacity }}
                  className="flex items-center justify-center gap-3 mb-6"
                >
                  <div className="h-px w-10 bg-cyan-400/50" />
                  <span className="text-[11px] font-black uppercase tracking-[0.6em] text-cyan-400">Execution Strategy</span>
                  <div className="h-px w-10 bg-cyan-400/50" />
                </motion.div>

                <div className="flex flex-col items-center overflow-hidden">
                  <motion.h2
                    style={{ x: titleXLeft }}
                    className="text-5xl sm:text-7xl md:text-9xl font-black leading-tight tracking-tighter italic uppercase text-white"
                  >
                    Turning <span className="gradient-text-primary">chaos</span>
                  </motion.h2>
                  <motion.h2
                    style={{ x: titleXRight }}
                    className="text-5xl sm:text-7xl md:text-9xl font-black leading-tight tracking-tighter italic uppercase text-white -mt-4 md:-mt-8"
                  >
                    into code.
                  </motion.h2>
                </div>
              </div>

              {/* Stacked Cards Deck */}
              <div className="relative h-[60vh] md:h-[70vh] w-full max-w-6xl mx-auto">
                {steps.map((step, i) => (
                  <ExecutionCard 
                    key={step.step} 
                    {...step} 
                    index={i} 
                    progress={smoothCardsProgress}
                  />
                ))}
              </div>
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
