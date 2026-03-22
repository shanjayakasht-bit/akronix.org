"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Code2, Rocket, TrendingUp, Zap, Globe, Layers,
  ShieldCheck, Star, ChevronRight, CheckCircle, Clock, Award,
  Cpu, Activity, Terminal, LayoutGrid, Database, Search, Palette, PlayCircle, Settings,
  BarChart3
} from "lucide-react";
import { InteractiveHeroText } from "@/components/ui/interactive-hero-text";
import { BrandEcosystem } from "@/components/ui/brand-ecosystem";
import { LiveIndicator } from "@/components/ui/live-indicator";

/* ── Variants ─────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ── Data ─────────────────────────────────────────────────────── */
const stats = [
  { value: "50+", label: "Projects Delivered", icon: Rocket },
  { value: "98%", label: "Client Satisfaction", icon: Award },
  { value: "3×",  label: "Avg. Revenue Growth", icon: TrendingUp },
  { value: "48h", label: "Project Kickoff",     icon: Clock },
];

const features = [
  { icon: ShieldCheck, title: "Enterprise Security", desc: "Military-grade encryption and advanced rate limiting baked into every layer.", color: "#00F0FF" },
  { icon: Activity,    title: "High-Performance Arch", desc: "Sub-second response times with global edge deployment and cached data layers.", color: "#9D5BFF" },
  { icon: Terminal,    title: "Rapid Deployment",   desc: "CI/CD pipelines that move code from commit to production in minutes.", color: "#A5B4FC" },
  { icon: Cpu,         title: "Scalable Infrastructure", desc: "Serverless and containerized systems that grow horizontally with your user base.", color: "#00F0FF" },
];

const services = [
  {
    icon: LayoutGrid, title: "SaaS Platform Development",
    desc: "Architecting multi-tenant platforms with enterprise-grade auth and billing systems.",
    href: "/services/saas-development", badge: "Most Popular", stat: "6-week delivery", color: "#00F0FF",
  },
  {
    icon: Rocket, title: "MVP Development",
    desc: "High-fidelity prototypes engineered to validate and scale at startup speed.",
    href: "/services/mvp-development", stat: "2-week delivery", color: "#9D5BFF",
  },
  {
    icon: Globe, title: "Landing Page Development",
    desc: "Performance-optimized conversion engines designed for global market dominance.",
    href: "/services/landing-pages", stat: "1-week delivery", color: "#A5B4FC",
  },
  {
    icon: Database, title: "Custom Web Applications",
    desc: "Legacy-ready, data-intensive systems built for mission-critical operations.",
    href: "/services/custom-web-app", stat: "8-week delivery", color: "#00F0FF",
  },
];

const steps = [
  { step: "01", title: "Discovery", desc: "We map your idea to a precise technical blueprint.", icon: Search },
  { step: "02", title: "Design & Build", desc: "Built in agile sprints with weekly demos.", icon: Palette },
  { step: "03", title: "Launch", desc: "Thorough testing and production rollout.", icon: PlayCircle },
  { step: "04", title: "Scale", desc: "Ongoing features and infrastructure scaling.", icon: Settings },
];

const testimonials = [
  { quote: "Akronix delivered our SaaS platform in 6 weeks. The code quality blew our investors away.", name: "Shanjay", role: "Founder", color: "#00F0FF" },
  { quote: "Our landing page conversion jumped from 2% to 11% after Akronix redesigned it. Incredible team.", name: "Bharath", role: "Co-Founder", color: "#9D5BFF" },
  { quote: "They think like a CTO, design like an agency, and execute like a world-class engineering team.", name: "Vishal", role: "Tech Lead", color: "#A5B4FC" },
];

const plans = [
  {
    name: "Starter", price: "$2,999", period: "one-time",
    desc: "Perfect for validating your idea",
    features: ["MVP Development", "3 core features", "Mobile-responsive design", "30-day support"],
    href: "/pricing", popular: false,
  },
  {
    name: "Growth", price: "$7,499", period: "one-time",
    desc: "For businesses ready to scale",
    features: ["Full SaaS platform", "Auth + billing + analytics", "Custom design system", "6-month warranty", "CI/CD pipeline"],
    href: "/pricing", popular: true,
  },
  {
    name: "Enterprise", price: "Custom", period: "",
    desc: "Tailored for scaling teams",
    features: ["Dedicated engineering team", "Architecture design", "Custom integrations", "SLA + on-call support"],
    href: "/contact", popular: false,
  },
];

const trustedBy = ["Akronix", "Mediatrix", "Gritscape", "Vercel", "Stripe", "Notion"];

/* ── Component ────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="overflow-hidden">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-4 overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full blur-[160px] opacity-20"
            style={{ background: "radial-gradient(circle, var(--c-brand), transparent)" }} />
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
            style={{ background: "radial-gradient(circle, var(--c-accent), transparent)" }} />
        </div>
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        <div className="container-xl relative z-10 text-center">


          {/* Brand name — interactive */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-36 sm:h-48 md:h-60 mb-6"
          >
            <InteractiveHeroText />
          </motion.div>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.25)}
            className="text-xl sm:text-2xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            We design, build, and scale{" "}
            <span className="gradient-text-primary font-bold">premium digital products</span>
            {" "}— from MVPs to full SaaS platforms.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.35)} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <Link href="/contact?type=project" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto">
              Start Your Project <ArrowRight size={16} />
            </Link>
            <Link href="/contact?type=consultation" className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto">
              Book Free Consultation
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div {...fadeUp(0.45)} className="flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {["#00F0FF","#9D5BFF","#A5B4FC","#3DFAFF","#00F0FF"].map((bg, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-black"
                  style={{ background: bg, borderColor: "#020205", zIndex: 5 - i }}
                >
                  {["SJ","BR","VK","AM","TK"][i]}
                </div>
              ))}
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              <span className="text-white font-semibold">50+</span> companies trust Akronix
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TRUSTED BY ────────────────────────────────────────── */}
      <section className="py-10 border-y" style={{ borderColor: "var(--c-border)" }}>
        <div className="container-xl">
          <p className="text-center text-[10px] font-bold uppercase tracking-widest mb-7" style={{ color: "rgba(255,255,255,0.2)" }}>
            Trusted by founders &amp; companies worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {trustedBy.map((n) => (
              <span key={n} className="font-bold text-lg transition-colors duration-200 cursor-default"
                style={{ color: "rgba(255,255,255,0.18)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.18)")}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────── */}
      <section className="section bg-black/50">
        <div className="container-xl">
          <div className="text-center mb-16">
            <motion.span {...fadeUp()} className="badge mb-4 inline-flex uppercase tracking-[0.2em]">Our Standards</motion.span>
            <motion.h2 {...fadeUp(0.07)} className="text-4xl sm:text-6xl font-black mb-6">
              Engineering <span className="gradient-text-primary">Excellence</span>
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div 
                key={title} 
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -5 }}
                className="card p-8 group relative overflow-hidden flex flex-col items-center text-center"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 transition-all duration-500 group-hover:h-full group-hover:opacity-[0.03] -z-10" style={{ backgroundColor: color }} />
                
                <div className="relative mb-6">
                  {/* Rotating status ring */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-8px] rounded-2xl border border-dashed border-white/10 group-hover:border-white/30 transition-colors"
                  />
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500 group-hover:scale-110 shadow-lg"
                    style={{ background: `${color}10`, border: `1px solid ${color}30` }}>
                    <Icon size={28} style={{ color }} className="animate-realtime-glow" />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 tracking-tight text-white/90">{title}</h3>
                <p className="text-sm leading-relaxed text-white/40 group-hover:text-white/60 transition-colors duration-500 font-medium">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section className="section relative overflow-hidden" style={{ background: "var(--c-surface)" }}>
        {/* Ambient background light */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00F0FF]/5 blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#9D5BFF]/5 blur-[130px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="container-xl relative z-10">
          <div className="text-center mb-20">
            <motion.span {...fadeUp()} className="badge mb-4 inline-flex">Services</motion.span>
            <motion.h2 {...fadeUp(0.07)} className="text-5xl md:text-6xl font-black mb-6">
              What we <span className="gradient-text-primary">build for you</span>
            </motion.h2>
            <motion.p {...fadeUp(0.14)} className="text-xl max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
              High-performance solutions engineered for the next generation of digital giants.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {services.map(({ icon: Icon, title, desc, href, badge, stat, color }, i) => (
              <motion.div 
                key={title} 
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -8 }}
                className="group relative"
                style={{ perspective: "1000px" }}
              >
                <Link href={href} className="block h-full">
                  <div className="card-hover p-6 h-full relative overflow-hidden flex flex-col border border-white/5 transition-all duration-500 group-hover:border-[#5B4DFF]/30 group-hover:bg-white/[0.02] rounded-3xl">
                    {/* Animated Data Stream Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none overflow-hidden">
                       <motion.div 
                          animate={{ y: [0, 32], opacity: [0, 1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent"
                       />
                    </div>

                    <div className="mb-6 relative">
                       <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                          className="absolute inset-[-5px] rounded-full blur-lg"
                          style={{ background: color }}
                        />
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500 group-hover:scale-110"
                          style={{ background: "rgba(11, 11, 15, 0.8)", border: `1px solid ${color}40` }}>
                          <Icon size={24} style={{ color }} />
                          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 blur-[1px] animate-pulse" />
                        </div>
                    </div>

                    <div className="mb-4">
                       <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">{title}</h3>
                       </div>
                       <div className="flex flex-wrap gap-2">
                          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/5 bg-white/5">
                            {stat}
                          </span>
                       </div>
                    </div>

                    <p className="text-xs leading-relaxed text-white/30 group-hover:text-white/50 transition-colors mb-6 flex-1">
                      {desc}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                       <span className="text-[10px] font-bold text-cyan-400/80">View Details</span>
                       <ChevronRight size={12} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────── */}
      <section className="section relative overflow-hidden py-24">
        {/* Layered Parallax Background */}
        <div className="absolute inset-0 z-0">
           <motion.div 
              animate={{ 
                 rotate: [0, 360],
                 scale: [1, 1.05, 1],
              }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5 blur-[120px] rounded-full"
           />
           <div className="absolute inset-0 bg-dot-bg opacity-[0.05]" />
        </div>
        
        <div className="container-xl relative z-10">
          <div className="text-center mb-24">
            <motion.span {...fadeUp()} className="badge mb-6 inline-flex tracking-[0.3em]">The Workflow</motion.span>
            <motion.h2 {...fadeUp(0.07)} className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              How we <span className="gradient-text-primary">architect growth</span>
            </motion.h2>
            <motion.div 
               {...fadeUp(0.14)}
               className="w-16 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto rounded-full"
            />
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Dynamic Liquid Progress Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/5 -translate-x-1/2 hidden md:block overflow-hidden">
               <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="w-full bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
               />
            </div>
            
            <div className="space-y-32">
              {steps.map(({ step, title, desc, icon: StepIcon }, i) => (
                <motion.div 
                  key={step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col md:flex-row items-center gap-20 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Content Block */}
                  <div className={`flex-1 group ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                    <motion.div 
                       whileHover={{ x: i % 2 === 0 ? -10 : 10 }}
                       className="relative inline-block"
                    >
                       <span className="absolute -inset-4 text-9xl font-black opacity-[0.03] pointer-events-none select-none -z-10 group-hover:opacity-[0.05] transition-opacity">
                          {step}
                       </span>
                       <h3 className="text-4xl md:text-5xl font-black text-white mb-8 group-hover:gradient-text-primary transition-all">
                          {title}
                       </h3>
                    </motion.div>
                    <p className="text-xl text-white/40 leading-relaxed max-w-lg mx-auto md:mx-0 group-hover:text-white/60 transition-colors">
                      {desc}
                    </p>
                    
                    <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
                       {i % 2 === 0 ? (
                          <div className="md:ml-auto flex gap-2">
                             <div className="w-12 h-1 bg-white/10 rounded-full" />
                             <div className="w-4 h-1 bg-indigo-500/50 rounded-full" />
                          </div>
                       ) : (
                          <div className="md:mr-auto flex gap-2">
                             <div className="w-4 h-1 bg-indigo-500/50 rounded-full" />
                             <div className="w-12 h-1 bg-white/10 rounded-full" />
                          </div>
                       )}
                    </div>
                  </div>

                  {/* High-Fi Interactive Node */}
                  <div className="relative z-10 flex-shrink-0">
                     {/* Orbiting Satellites */}
                     <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-40px] pointer-events-none"
                     >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                     </motion.div>
                     <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-60px] pointer-events-none"
                     >
                        <div className="absolute bottom-1/4 right-0 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
                     </motion.div>

                     {/* Central Core */}
                     <div className="w-28 h-28 md:w-32 md:h-32 rounded-[2rem] bg-black border border-white/10 flex items-center justify-center relative group overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-30 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Animated Interior Rings */}
                        <motion.div 
                           animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.4, 0.1] }}
                           transition={{ duration: 5, repeat: Infinity }}
                           className="absolute inset-3 border border-indigo-500/20 rounded-[1.5rem]"
                        />

                        <StepIcon size={40} className="text-white group-hover:text-indigo-400 transition-colors z-10 group-hover:scale-110 duration-500 animate-realtime-glow" />
                        
                        <div className="absolute bottom-3 inset-x-0 text-center">
                           <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/10 group-hover:text-indigo-400">
                             Phase {step}
                           </span>
                        </div>

                        {/* Status Pulse */}
                        <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-green-500 blur-[1px] animate-pulse" />
                     </div>
                  </div>

                  {/* Spacer helper */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND ECOSYSTEM ──────────────────────────────────── */}
      <BrandEcosystem />

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section py-20 relative overflow-hidden">
        <div className="container-lg relative z-10">
          <motion.div {...fadeUp()}
            className="relative rounded-[32px] overflow-hidden text-center p-12 md:p-20 border border-white/[0.08]"
            style={{
              background: "rgba(20, 20, 28, 0.95)",
              boxShadow: "0 20px 80px rgba(0,0,0,0.6), inset 0 0 80px rgba(91,77,255,0.03)",
            }}>
            
            {/* High-Fi Ultra Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
               {/* Ambient Glow behind the text */}
               <motion.div 
                 animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                 className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_40%_40%,var(--c-brand),transparent_50%),radial-gradient(circle_at_60%_60%,var(--c-accent),transparent_50%)] blur-[100px] opacity-20"
               />
               
               {/* High-Density Star Cluster */}
               <div className="absolute inset-0">
                  {Array.from({ length: 120 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: Math.random() }}
                      animate={{ opacity: [0.2, 0.9, 0.2] }}
                      transition={{ 
                        duration: 3 + Math.random() * 4, 
                        repeat: Infinity, 
                        delay: Math.random() * 5 
                      }}
                      className="absolute w-0.5 h-0.5 bg-white/60 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        boxShadow: "0 0 4px rgba(255,255,255,0.4)"
                      }}
                    />
                  ))}
               </div>
               
               <div className="absolute inset-0 bg-dot-bg opacity-[0.05]" />
               <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent shadow-[0_0_20px_rgba(0,240,255,0.2)]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight">
                Let&apos;s build your{" "}
                <span className="gradient-text-primary">next big thing</span>
              </h2>
              <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                From architecture planning to production scale, we guide your product strategy at every layer.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link href="/contact?type=project" className="btn-primary text-lg px-12 py-4 group shadow-[0_0_30px_rgba(91,77,255,0.3)] transition-all hover:scale-105 active:scale-95">
                  Start a Project <ArrowRight size={20} className="ml-2 group-hover:translate-x-1.5 transition-transform" />
                </Link>
                <Link href="/contact?type=consultation" className="btn-secondary text-lg px-12 py-4 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95">
                  Free Consultation
                </Link>
              </div>
              <div className="mt-14 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-x-10 gap-y-4">
                 {['Fast Delivery', 'Expert Support', 'Scalable Code'].map((text) => (
                   <div key={text} className="flex items-center gap-2">
                      <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_var(--c-brand)]" 
                      />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/25">{text}</span>
                   </div>
                 ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
