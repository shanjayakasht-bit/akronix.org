"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Code2, GraduationCap, Rocket, Building2, Share2,
  ArrowRight, Handshake, TrendingUp, Megaphone, Zap,
  Headphones, FileText, Users, BarChart3, ChevronLeft, ChevronRight,
  Globe, Trophy,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

/* ─── Animations ────────────────────────────────────────── */
const fadeUp = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});
const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});
const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});
const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.88 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─── 3-D tilt card ─────────────────────────────────────── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(y, { stiffness: 200, damping: 30 });
  const ry = useSpring(x, { stiffness: 200, damping: 30 });
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - r.left - r.width / 2) / r.width) * 10);
    y.set(-((e.clientY - r.top - r.height / 2) / r.height) * 10);
  }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 800 }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Styled partner logos ───────────────────────────────── */
// Technology
function LogoAWS() {
  return <div className="flex flex-col items-center gap-0.5">
    <svg width="48" height="29" viewBox="0 0 60 36" fill="none">
      <path d="M17 13.8c0 .9.1 1.6.3 2.1.2.5.5 1 .9 1.5.1.2.2.3.2.5 0 .2-.1.4-.4.6l-1.5 1c-.2.1-.4.2-.5.2-.2 0-.4-.1-.6-.3-.3-.3-.5-.6-.7-1-.2-.3-.4-.7-.7-1.2-1.8 2.1-4 3.2-6.7 3.2-1.9 0-3.4-.5-4.5-1.6C2 17.7 1.4 16.2 1.4 14.4c0-1.9.7-3.5 2-4.7 1.4-1.2 3.2-1.8 5.4-1.8.7 0 1.5.1 2.3.2.8.2 1.7.4 2.5.6V7.2c0-1.7-.4-2.9-1.1-3.6C11.8 3 10.5 2.6 8.7 2.6c-.8 0-1.6.1-2.4.3-.8.2-1.6.5-2.4.9-.4.2-.6.3-.8.3H3c-.3 0-.4-.2-.4-.6V2.3c0-.3 0-.5.1-.6.1-.1.3-.3.6-.4.8-.4 1.8-.8 3-1.1C7.5.1 8.7 0 10 0c2.7 0 4.7.6 6 1.9 1.3 1.2 1.9 3.1 1.9 5.6v7.3h-.9zM8.1 17.4c.7 0 1.5-.1 2.2-.4.8-.3 1.5-.8 2.1-1.5.4-.4.6-1 .7-1.5.1-.5.2-1.1.2-1.9v-.9c-.6-.1-1.3-.3-2-.4-.7-.1-1.3-.2-2-.2-1.4 0-2.4.3-3.1.8-.7.5-1 1.3-1 2.4 0 1 .2 1.7.7 2.2.5.4 1.2.7 2.2.7v-.3zm16.6 2.2c-.3 0-.5-.1-.7-.2-.1-.1-.3-.4-.4-.8L19 2c-.1-.3-.2-.6-.2-.8 0-.3.2-.5.5-.5h2c.3 0 .6.1.7.2.2.1.3.4.4.8l3.6 14.4 3.4-14.4c.1-.3.2-.6.4-.8.2-.1.4-.2.7-.2h1.6c.3 0 .6.1.7.2.2.1.3.4.4.8L36.5 16 40.2 2c.1-.4.2-.6.4-.8.2-.1.4-.2.7-.2h1.9c.3 0 .5.2.5.5 0 .1 0 .2-.1.4l-.1.4-5.1 16.6c-.1.4-.2.6-.4.8-.2.1-.4.2-.7.2h-1.7c-.3 0-.6-.1-.7-.2-.2-.1-.3-.4-.4-.8L31 4.4 27.6 19.4c-.1.4-.2.6-.4.8-.2.1-.4.2-.7.2h-1.8zm27.1.5c-1.1 0-2.3-.1-3.4-.4-1.1-.3-2-.7-2.6-1.1-.3-.2-.5-.5-.5-.7v-1.1c0-.4.1-.5.4-.5.1 0 .3 0 .5.1.2.1.4.2.5.3.8.5 1.7.8 2.6 1 .9.2 1.8.3 2.7.3 1.4 0 2.5-.2 3.2-.7.8-.5 1.2-1.2 1.2-2.1 0-.6-.2-1.1-.6-1.5-.4-.4-1.2-.8-2.3-1.1l-3.2-1c-1.6-.5-2.8-1.2-3.5-2.2-.7-.9-1.1-2-1.1-3.1 0-.9.2-1.7.6-2.4.4-.7.9-1.3 1.6-1.8.7-.5 1.4-.8 2.3-1.1.9-.2 1.8-.3 2.8-.3.5 0 1 0 1.5.1.5.1 1 .2 1.4.3.5.1.9.3 1.3.4.4.2.7.3.9.5.2.2.4.4.5.5.1.2.1.4.1.6v1c0 .4-.1.5-.4.5-.2 0-.5-.1-.9-.3-1.2-.5-2.5-.8-3.9-.8-1.2 0-2.2.2-2.9.6-.7.4-1 1-1 1.9 0 .6.2 1.1.7 1.5.4.4 1.3.8 2.5 1.2l3.1 1c1.6.5 2.7 1.2 3.4 2.1.7.9 1 2 1 3.1 0 .9-.2 1.7-.6 2.4-.4.7-.9 1.4-1.6 1.9-.7.5-1.6.9-2.6 1.2-1.1.3-2.2.4-3.4.4z" fill="#FF9900"/>
    </svg>
  </div>;
}
function LogoMicrosoft() {
  return <div className="flex items-center gap-1.5">
    <svg width="20" height="20" viewBox="0 0 21 21" fill="none">
      <rect x="0"  y="0"  width="10" height="10" fill="#F25022"/>
      <rect x="11" y="0"  width="10" height="10" fill="#7FBA00"/>
      <rect x="0"  y="11" width="10" height="10" fill="#00A4EF"/>
      <rect x="11" y="11" width="10" height="10" fill="#FFB900"/>
    </svg>
    <span className="text-[13px] font-semibold text-gray-700">Microsoft</span>
  </div>;
}
function LogoGoogleCloud() {
  return <div className="flex items-center gap-1.5">
    <svg width="22" height="18" viewBox="0 0 64 52" fill="none">
      <path d="M40.2 10.6l-4.8-4.8-3.4 3.4 4.8 4.8 3.4-3.4z" fill="#EA4335"/>
      <path d="M32 4.8L20.4 16.4 24 20l7.8-7.8L39.6 20l3.6-3.6L32 4.8z" fill="#4285F4"/>
      <path d="M52 28a19.8 19.8 0 00-8.8-16.4l-3.8 3.8A14 14 0 0146 28c0 7.7-6.3 14-14 14a14 14 0 01-14-14c0-6.4 4.3-11.8 10.2-13.4l.2-5.4A19.8 19.8 0 0032 48c11 0 20-9 20-20z" fill="#34A853"/>
      <path d="M12 28c0-5.3 2.3-10 6-13.2l-3.8-3.8A19.8 19.8 0 0012 28c0 5.6 2.3 10.7 6 14.4l3.8-3.8A14 14 0 0112 28z" fill="#FBBC05"/>
    </svg>
    <span className="text-[12px] font-semibold text-gray-600">Google Cloud</span>
  </div>;
}
function LogoDigitalOcean() {
  return <div className="flex items-center gap-1.5">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0080FF">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6.8A5.2 5.2 0 1 1 6.8 12H4.4A7.6 7.6 0 1 0 12 4.4V6.8z" fill="white"/>
      <path d="M9.6 15.2v2.4H7.2v-2.4H4.8v-2.4H7.2v-2.4h2.4v2.4h2.4v2.4H9.6z" fill="white"/>
    </svg>
    <span className="text-[12px] font-semibold text-blue-600">DigitalOcean</span>
  </div>;
}
// Educational
function LogoSRM() {
  return <div className="flex items-center gap-1.5">
    <div className="w-7 h-7 rounded-full border-2 border-blue-800 flex items-center justify-center flex-shrink-0">
      <span className="text-[7px] font-black text-blue-800">SRM</span>
    </div>
    <div><p className="text-[11px] font-black text-blue-900">SRM</p><p className="text-[8px] text-blue-500">University</p></div>
  </div>;
}
function LogoVIT() {
  return <div className="flex items-center gap-1.5">
    <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1e3a8a,#1d4ed8)" }}>
      <span className="text-[8px] font-black text-white">VIT</span>
    </div>
    <div><p className="text-[11px] font-black text-blue-900">VIT</p><p className="text-[8px] text-blue-500">University</p></div>
  </div>;
}
function LogoPES() {
  return <div className="flex items-center gap-1.5">
    <div className="w-7 h-7 rounded bg-green-700 flex items-center justify-center flex-shrink-0">
      <span className="text-[7px] font-black text-white">PES</span>
    </div>
    <div><p className="text-[11px] font-black text-green-900">PES</p><p className="text-[8px] text-green-600">University</p></div>
  </div>;
}
function LogoChrist() {
  return <div className="flex items-center gap-1.5">
    <div className="w-7 h-7 rounded bg-red-700 flex items-center justify-center flex-shrink-0">
      <span className="text-[7px] font-black text-white">CU</span>
    </div>
    <div><p className="text-[11px] font-black text-red-900">Christ</p><p className="text-[8px] text-red-500">University</p></div>
  </div>;
}
// Startup
function LogoThub() {
  return <div className="flex items-center gap-1">
    <span className="text-[18px] font-black text-gray-800">t</span>
    <span className="text-[13px] font-black text-orange-500">-hub</span>
  </div>;
}
function Logo10k() {
  return <div className="leading-tight">
    <p className="text-[13px] font-black text-orange-600">10,000</p>
    <p className="text-[8px] font-bold text-orange-400 uppercase tracking-wider">Startups</p>
  </div>;
}
function LogoNasscom() {
  return <div className="leading-tight">
    <p className="text-[12px] font-black text-blue-900">NASSCOM</p>
    <p className="text-[8px] font-bold text-blue-400 tracking-wider uppercase">Foundation</p>
  </div>;
}
function LogoInvestIndia() {
  return <div className="flex items-center gap-1.5">
    <div className="w-6 h-6 rounded-sm" style={{ background: "linear-gradient(135deg,#FF9933,#ffffff,#138808)" }} />
    <div><p className="text-[10px] font-black text-gray-800">Invest</p><p className="text-[10px] font-black text-blue-700">India</p></div>
  </div>;
}
// Business
function LogoZoho() {
  return <div className="flex items-center gap-1">
    <div className="flex gap-[2px]">
      {["#E74C3C","#3498DB","#2ECC71","#F39C12"].map((c,i) => (
        <div key={i} className="w-2 h-2 rounded-sm" style={{ background: c }} />
      ))}
    </div>
    <span className="text-[14px] font-black text-gray-800 ml-1">ZOHO</span>
  </div>;
}
function LogoPayU() {
  return <div className="flex items-center gap-1">
    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
      <span className="text-[8px] font-black text-white">P</span>
    </div>
    <span className="text-[14px] font-black" style={{ color: "#0a3d62" }}>Pay</span>
    <span className="text-[14px] font-black text-orange-500">U</span>
  </div>;
}
function LogoRazorpay() {
  return <div className="flex items-center gap-1.5">
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <path d="M8 0L0 10h5.5L3 18l13-11H10.5L8 0z" fill="#2563EB"/>
    </svg>
    <span className="text-[13px] font-bold text-blue-700">Razorpay</span>
  </div>;
}
function LogoTally() {
  return <div className="flex items-center gap-1.5">
    <div className="w-6 h-6 rounded bg-green-600 flex items-center justify-center">
      <span className="text-[8px] font-black text-white">T</span>
    </div>
    <span className="text-[13px] font-bold text-green-800">Tally</span>
  </div>;
}
// Networking
function LogoBNI() {
  return <div className="flex items-center gap-1.5">
    <div className="w-8 h-7 rounded bg-red-600 flex items-center justify-center">
      <span className="text-[10px] font-black text-white">BNI</span>
    </div>
  </div>;
}
function LogoTiE() {
  return <div className="flex items-center gap-1.5">
    <div className="w-8 h-7 rounded" style={{ background: "linear-gradient(135deg,#1e40af,#3b82f6)" }}>
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-[10px] font-black text-white">TiE</span>
      </div>
    </div>
  </div>;
}
function LogoLocalCircles() {
  return <div className="flex items-center gap-1.5">
    <div className="w-6 h-6 rounded-full bg-orange-100 border-2 border-orange-400 flex items-center justify-center">
      <span className="text-[7px] font-black text-orange-600">LC</span>
    </div>
    <span className="text-[11px] font-bold text-gray-700">LocalCircles</span>
  </div>;
}
function LogoFicci() {
  return <div className="leading-tight">
    <p className="text-[13px] font-black text-blue-900">FICCI</p>
    <p className="text-[7px] font-bold text-blue-400 uppercase tracking-wider">Industry Body</p>
  </div>;
}

/* ─── Ecosystem data ─────────────────────────────────────── */
const ecosystem = [
  {
    icon: Code2, color: "#8B5CF6", bg: "#F5F3FF",
    title: "Technology Partners",
    desc: "Leading technology providers and innovators powering digital transformation.",
    logos: [LogoAWS, LogoMicrosoft, LogoGoogleCloud, LogoDigitalOcean],
  },
  {
    icon: GraduationCap, color: "#0EA5E9", bg: "#F0F9FF",
    title: "Educational Partners",
    desc: "Partnering with top institutions to empower students and drive innovation.",
    logos: [LogoSRM, LogoVIT, LogoPES, LogoChrist],
  },
  {
    icon: Users, color: "#10B981", bg: "#ECFDF5",
    title: "Startup Ecosystem Partners",
    desc: "Collaborating with incubators, accelerators and startup communities.",
    logos: [LogoThub, Logo10k, LogoNasscom, LogoInvestIndia],
  },
  {
    icon: Building2, color: "#2563EB", bg: "#EFF6FF",
    title: "Business Partners",
    desc: "Working with businesses to deliver solutions, create value and scale together.",
    logos: [LogoZoho, LogoPayU, LogoRazorpay, LogoTally],
  },
  {
    icon: Share2, color: "#F59E0B", bg: "#FFFBEB",
    title: "Networking Partners",
    desc: "Joining hands with networking organizations to build strong communities.",
    logos: [LogoBNI, LogoTiE, LogoLocalCircles, LogoFicci],
  },
];

const whyPartner = [
  { icon: Rocket,     color: "#F59E0B", bg: "#FFFBEB", title: "Business Growth",    desc: "Expand your reach and unlock new business opportunities." },
  { icon: Users,      color: "#8B5CF6", bg: "#F5F3FF", title: "Strong Ecosystem",   desc: "Be part of a trusted network of innovators and leaders." },
  { icon: BarChart3,  color: "#10B981", bg: "#ECFDF5", title: "Mutual Success",     desc: "We grow together through collaboration and shared goals." },
  { icon: Megaphone,  color: "#2563EB", bg: "#EFF6FF", title: "Brand Visibility",   desc: "Increase your brand exposure and industry recognition." },
  { icon: Zap,        color: "#EC4899", bg: "#FDF2F8", title: "Innovation",         desc: "Collaborate on innovative solutions that drive real impact." },
  { icon: Headphones, color: "#EA580C", bg: "#FFF7ED", title: "Dedicated Support",  desc: "Get partner support and resources every step of the way." },
];

const steps = [
  { num: "01", icon: FileText,  title: "Connect",       desc: "Reach out to us and share your goals." },
  { num: "02", icon: Users,     title: "Explore",       desc: "We understand your vision and explore opportunities together." },
  { num: "03", icon: Handshake, title: "Collaborate",   desc: "We define how we can work together for mutual growth." },
  { num: "04", icon: Rocket,    title: "Implement",     desc: "Execute initiatives and create powerful impact." },
  { num: "05", icon: BarChart3, title: "Grow Together", desc: "Celebrate success and continue growing together." },
];

const spotlights = [
  {
    LogoComponent: LogoAWS,
    quote: "Akronix is a valuable partner with deep technical expertise and a strong commitment to delivering innovative solutions.",
    by: "AWS Partner Network",
  },
  {
    LogoComponent: LogoSRM,
    quote: "Our partnership with Akronix Academy empowers students with real-world skills and industry exposure.",
    by: "SRM Institute of Science & Technology",
  },
  {
    LogoComponent: LogoThub,
    quote: "Akronix has been a catalyst for our startup community — connecting founders with the right resources and mentors.",
    by: "T-Hub Foundation",
  },
  {
    LogoComponent: LogoBNI,
    quote: "The Akronix networking community has added tremendous value to our members' business growth.",
    by: "BNI Partner Network",
  },
  {
    LogoComponent: LogoNasscom,
    quote: "Akronix's commitment to innovation aligns perfectly with NASSCOM's vision for India's digital future.",
    by: "NASSCOM Foundation",
  },
];

/* ─── Page ───────────────────────────────────────────────── */
export default function PartnersPage() {
  const [spotlight, setSpotlight] = useState(0);
  const [hoverStep, setHoverStep] = useState<number | null>(null);

  return (
    <>
      <Navigation />
      <main className="bg-white text-gray-900 overflow-x-hidden">

        {/* ════════════ HERO ════════════ */}
        <section className="relative pt-28 pb-20 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[650px] h-[650px] bg-amber-100/50 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 -left-40 w-[500px] h-[400px] bg-yellow-50/60 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-24 right-12 w-40 h-40 opacity-20 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle,#F59E0B 1px,transparent 1px)", backgroundSize: "14px 14px" }} />

          <div className="container-xl relative z-10 grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-600 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full mb-7">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Our Partners
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[2.9rem] md:text-[3.4rem] font-black leading-[1.08] tracking-tight text-gray-900 mb-5"
              >
                Stronger Together.<br />Creating{" "}
                <motion.span
                  initial={{ backgroundPosition: "200% center" }}
                  animate={{ backgroundPosition: "0% center" }}
                  transition={{ duration: 1.4, delay: 0.5 }}
                  style={{
                    background: "linear-gradient(90deg,#F59E0B,#EA580C,#F59E0B)",
                    backgroundSize: "200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Greater Impact.
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-500 text-base leading-relaxed mb-9 max-w-[460px]"
              >
                We collaborate with leading technology providers, educational institutions, startup communities and business organizations to drive innovation, create opportunities and deliver exceptional value.
              </motion.p>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-5"
              >
                {[
                  { icon: Handshake, title: "Trusted Collaboration", sub: "Building long-term, mutually beneficial partnerships." },
                  { icon: TrendingUp, title: "Shared Growth",         sub: "Together we grow, innovate and create lasting impact." },
                  { icon: Globe,      title: "Global Network",        sub: "A powerful ecosystem that connects, empowers and inspires." },
                ].map(({ icon: Ic, title, sub }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.32 + i * 0.07 }}
                    className="flex items-start gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Ic size={14} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-gray-800">{title}</p>
                      <p className="text-[11px] text-gray-400 leading-snug">{sub}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right — hero image + stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.16)]" style={{ aspectRatio: "4/3" }}>
                <Image src="/blog-networking.png" alt="Partner handshake" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-gray-900/40" />
              </div>

              {/* Stat overlays */}
              {[
                { top: "-16px", right: "-16px", icon: Users,  value: "50+",  label: "Active Partners",        delay: 0.5 },
                { bottom: "-16px", left: "12px", icon: Globe,  value: "15+",  label: "Countries",              delay: 0.65 },
                { bottom: "-16px", right: "12px", icon: Trophy, value: "100+", label: "Successful Collaborations", delay: 0.8 },
              ].map(({ top, right, bottom, left, icon: Ic, value, label, delay }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay, type: "spring", bounce: 0.4 }}
                  whileHover={{ y: -4 }}
                  className="absolute bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100"
                  style={{ top, right, bottom, left }}
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Ic size={16} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-gray-900 leading-none">{value}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ════════════ PARTNER ECOSYSTEM ════════════ */}
        <section className="py-20 border-t border-gray-100">
          <div className="container-xl">
            <motion.div {...fadeUp(0)} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Our Partner Ecosystem</h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">We work with a diverse network of organizations across industries.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {ecosystem.map((cat, i) => (
                <TiltCard key={cat.title}>
                  <motion.div
                    {...scaleIn(i * 0.08)}
                    whileHover={{ y: -5, boxShadow: `0 16px 40px ${cat.color}20` }}
                    className="bg-white border border-gray-100 rounded-2xl p-5 h-full flex flex-col transition-shadow duration-300"
                  >
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: cat.bg }}>
                      <cat.icon size={20} style={{ color: cat.color }} />
                    </div>
                    <p className="text-[13px] font-black text-gray-900 mb-1">{cat.title}</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed mb-5">{cat.desc}</p>

                    {/* Logo grid */}
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      {cat.logos.map((Logo, j) => (
                        <motion.div
                          key={j}
                          whileHover={{ scale: 1.06, backgroundColor: "#FFFBEB" }}
                          className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 flex items-center justify-center transition-colors min-h-[44px]"
                        >
                          <Logo />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ WHY PARTNER ════════════ */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(245,158,11,0.04),transparent_60%)] pointer-events-none" />
          <div className="container-xl relative z-10">
            <motion.div {...fadeUp(0)} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Why Partner with Akronix?</h2>
              <div className="w-14 h-1 rounded-full mx-auto mt-3" style={{ background: "linear-gradient(90deg,#F59E0B,#EA580C)" }} />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {whyPartner.map((w, i) => (
                <motion.div
                  key={w.title}
                  {...fadeUp(i * 0.07)}
                  whileHover={{ y: -5, boxShadow: `0 12px 32px ${w.color}20` }}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center text-center transition-shadow duration-300 cursor-default"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: w.bg }}>
                    <w.icon size={22} style={{ color: w.color }} />
                  </div>
                  <p className="text-[13px] font-black text-gray-800 mb-1.5">{w.title}</p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{w.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ PARTNERSHIP PROCESS ════════════ */}
        <section className="py-20">
          <div className="container-xl">
            <motion.div {...fadeUp(0)} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Our Partnership Process</h2>
            </motion.div>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-[2px] bg-gray-100 z-0">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
                  className="h-full origin-left rounded-full"
                  style={{ background: "linear-gradient(90deg,#F59E0B,#EA580C)" }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {steps.map((s, i) => (
                  <motion.div
                    key={s.num}
                    {...fadeUp(0.1 + i * 0.1)}
                    onMouseEnter={() => setHoverStep(i)}
                    onMouseLeave={() => setHoverStep(null)}
                    className="relative flex flex-col items-center text-center cursor-default group"
                  >
                    {/* Number circle */}
                    <motion.div
                      animate={{
                        background: hoverStep === i
                          ? "linear-gradient(135deg,#F59E0B,#EA580C)"
                          : "linear-gradient(135deg,#FEF3C7,#FDE68A)",
                        scale: hoverStep === i ? 1.15 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-5 relative z-10 shadow-md"
                    >
                      <motion.span
                        animate={{ color: hoverStep === i ? "#ffffff" : "#B45309" }}
                        className="text-sm font-black"
                      >
                        {s.num}
                      </motion.span>
                    </motion.div>

                    {/* Step icon */}
                    <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center mb-3 group-hover:bg-amber-100 transition-colors">
                      <s.icon size={18} className="text-amber-500" />
                    </div>
                    <p className="text-[13px] font-black text-gray-900 mb-1">{s.title}</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed max-w-[130px]">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════ PARTNER SPOTLIGHT ════════════ */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="container-xl">
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              {/* Left label */}
              <motion.div {...fadeLeft(0)}>
                <h2 className="text-2xl font-black text-gray-900 mb-3">Partner Spotlight</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  We are proud to collaborate with amazing partners who share our vision and values.
                </p>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact?type=partner"
                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-800 border-2 border-gray-300 px-5 py-2.5 rounded-full hover:border-amber-400 hover:text-amber-600 transition-all group"
                  >
                    View All Partners
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Spotlight carousel — spans 2 cols */}
              <motion.div {...scaleIn(0.1)} className="lg:col-span-2">
                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm relative overflow-hidden">
                  <div className="flex items-start justify-between mb-8">
                    {/* Logo */}
                    <div className="scale-150 origin-left ml-4">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={spotlight}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {(() => { const L = spotlights[spotlight].LogoComponent; return <L />; })()}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    {/* Arrows */}
                    <div className="flex gap-2">
                      {[ChevronLeft, ChevronRight].map((Ic, d) => (
                        <motion.button
                          key={d}
                          whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                          onClick={() => setSpotlight(p => (p + (d === 0 ? -1 : 1) + spotlights.length) % spotlights.length)}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-amber-400 hover:bg-amber-50 transition-all"
                        >
                          <Ic size={14} />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={spotlight}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35 }}
                    >
                      <p className="text-gray-700 text-base leading-relaxed mb-5 italic">
                        &ldquo;{spotlights[spotlight].quote}&rdquo;
                      </p>
                      <p className="text-sm font-bold text-amber-600">— {spotlights[spotlight].by}</p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Dot indicators */}
                  <div className="flex gap-1.5 mt-6">
                    {spotlights.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setSpotlight(i)}
                        animate={{ width: i === spotlight ? 24 : 8, opacity: i === spotlight ? 1 : 0.35 }}
                        className="h-1.5 rounded-full bg-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════ CTA (DARK) ════════════ */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gray-900" />
          <motion.div
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{ background: "linear-gradient(270deg,#92400E,#78350F,#451a03,#92400E)", backgroundSize: "400%" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.1),transparent_65%)] pointer-events-none" />

          <div className="container-xl relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <motion.div {...fadeLeft(0)} className="flex-1">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)" }}
                >
                  <Users size={28} className="text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
                    Let&apos;s Build the Future Together
                  </h2>
                  <p className="text-gray-400 leading-relaxed max-w-lg">
                    Become a partner and join us in creating innovative solutions that drive growth and meaningful impact.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeRight(0.1)} className="flex items-center gap-4 flex-wrap flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact?type=partner"
                  className="relative inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-full overflow-hidden group"
                  style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)", boxShadow: "0 6px 20px rgba(245,158,11,0.4)" }}
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  Become a Partner
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white border-2 border-white/20 px-7 py-3.5 rounded-full hover:border-white/50 transition-colors"
                >
                  Book a Consultation
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
