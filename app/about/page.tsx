"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import {
  Rocket, Target, Eye, Gem, CheckCircle2, ArrowRight, Play,
  Users, Globe, Trophy, Award, Zap, Headphones, Building2,
  Flag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

/* ─── Animation helpers ──────────────────────────────────── */
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

/* ─── Count-up hook ──────────────────────────────────────── */
function useCountUp(end: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(timer); } else setVal(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return { val, ref };
}

/* ─── Stat Item ──────────────────────────────────────────── */
function StatItem({ icon: Ic, value, label, suffix = "" }: { icon: React.ElementType; value: number | string; label: string; suffix?: string }) {
  const isNumber = typeof value === "number";
  const { val, ref } = useCountUp(isNumber ? (value as number) : 0);
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-1">
        <Ic size={22} className="text-amber-500" />
      </div>
      <p className="text-2xl font-black text-gray-900 leading-none">
        {isNumber ? <span ref={ref}>{val}</span> : <span>{value}</span>}{suffix}
      </p>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
    </div>
  );
}

/* ─── 3-D tilt ───────────────────────────────────────────── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rx = useSpring(y, { stiffness: 200, damping: 30 });
  const ry = useSpring(x, { stiffness: 200, damping: 30 });
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - r.left - r.width / 2) / r.width) * 8);
    y.set(-((e.clientY - r.top - r.height / 2) / r.height) * 8);
  }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 800 }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Social icon SVGs ───────────────────────────────────── */
function IconLinkedin() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>;
}
function IconX() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L2.002 2.25h6.765l4.256 5.633 5.221-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>;
}
function IconInstagram() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>;
}

/* ─── Team data ──────────────────────────────────────────── */
const team = [
  {
    name: "Shanjay Akash T.",
    role: "Founder & CEO",
    desc: "Visionary leader with a passion for technology, innovation and building strategic ecosystems.",
    photo: "/shanjay pic.jpeg",
    socials: ["linkedin", "x", "instagram"],
  },
  {
    name: "Ritika Sharma",
    role: "COO",
    desc: "Operations expert ensuring excellence in execution and customer success.",
    photo: "/avanthika pic.jpeg",
    socials: ["linkedin", "x", "instagram"],
  },
  {
    name: "Arun Prakash",
    role: "CTO",
    desc: "Technology leader driving innovation and building future-ready solutions.",
    photo: "/Mareeswaran pic.jpeg",
    socials: ["linkedin", "x", "instagram"],
  },
  {
    name: "Neha Verma",
    role: "Head of Growth",
    desc: "Growth strategist focused on partnerships, marketing and community building.",
    photo: "/Dakshitha pic.jpg",
    socials: ["linkedin", "x", "instagram"],
  },
];

const journey = [
  { year: "2021", icon: Flag,      title: "The Beginning",          desc: "Akronix was founded with a vision to empower businesses through technology and strategic connections." },
  { year: "2022", icon: Building2, title: "Building the Foundation", desc: "Expanded our services, built a strong team and launched our first set of products." },
  { year: "2023", icon: Users,     title: "Growing Together",        desc: "Launched Akronix Academy and Networking Platform. Reached 250+ clients across industries." },
  { year: "2024", icon: Globe,     title: "Expanding Horizons",      desc: "Strengthened global partnerships and served clients in 10+ countries worldwide." },
  { year: "2025 & Beyond", icon: Rocket, title: "Shaping the Future", desc: "Continuing our mission to innovate, connect and create long-term impact at scale." },
];

const whyChoose = [
  { icon: Zap,        title: "End-to-End Solutions", desc: "From strategy to execution, we've got you covered." },
  { icon: Users,      title: "Expert Team",           desc: "Industry experts with deep knowledge and experience." },
  { icon: Globe,      title: "Global Reach",          desc: "Serving clients across 15+ countries." },
  { icon: Headphones, title: "Customer First",        desc: "We prioritize your success in everything we do." },
  { icon: Rocket,     title: "Innovation Driven",     desc: "We leverage technology to create impact." },
];

const values = [
  "Integrity in everything we do",
  "Innovation that drives change",
  "Collaboration over competition",
  "Excellence in execution",
  "Impact that matters",
];

/* ─── Page ───────────────────────────────────────────────── */
export default function AboutPage() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <>
      <Navigation />
      <main className="bg-white text-gray-900 overflow-x-hidden">

        {/* ═══════════ HERO ═══════════ */}
        <section className="relative pt-28 pb-20 overflow-hidden">
          <div className="absolute -top-32 right-0 w-[700px] h-[700px] bg-amber-100/40 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-yellow-50/50 rounded-full blur-[80px] pointer-events-none" />

          <div className="container-xl relative z-10 grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-600 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full mb-7">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  About Akronix
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="text-[3rem] md:text-[3.6rem] font-black leading-[1.08] tracking-tight text-gray-900 mb-6"
              >
                Building the Future.{" "}
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
                    display: "block",
                  }}
                >
                  Together.
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="text-gray-500 text-base leading-relaxed mb-9 max-w-md"
              >
                Akronix is a technology and growth enabler on a mission to empower businesses, individuals and communities through innovative solutions, meaningful connections and knowledge.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="flex items-center gap-4 flex-wrap"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="#journey"
                    className="relative inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-full overflow-hidden group"
                    style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)", boxShadow: "0 6px 20px rgba(245,158,11,0.35)" }}
                  >
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    Our Story
                    <ArrowRight size={15} />
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center gap-2.5 text-sm font-bold text-gray-700 border-2 border-gray-200 px-6 py-3.5 rounded-full hover:border-gray-400 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                    <Play size={9} className="text-gray-600 ml-0.5" fill="currentColor" />
                  </div>
                  Watch Video
                </motion.button>
              </motion.div>
            </div>

            {/* Right — building / hero image */}
            <motion.div
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.14)]" style={{ aspectRatio: "4/3" }}>
                <Image src="/team.png" alt="Akronix Building" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-gray-900/30" />
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, type: "spring", bounce: 0.3 }}
                className="absolute bottom-8 -left-8 bg-gray-900 text-white rounded-2xl p-5 shadow-2xl max-w-[240px] border border-white/5"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                  <Users size={17} className="text-amber-400" />
                </div>
                <p className="text-[13px] font-medium text-white/80 leading-relaxed">
                  We believe in the power of collaboration, innovation and continuous learning to create lasting impact.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════ STATS BAR ═══════════ */}
        <section className="py-10 border-t border-b border-gray-100">
          <div className="container-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm px-8 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 divide-x divide-gray-100"
            >
              <StatItem icon={Award}    value="2021"  label="Founded"             suffix="" />
              <StatItem icon={Rocket}   value={500}   label="Projects Delivered"   suffix="+" />
              <StatItem icon={Globe}    value={15}    label="Countries Served"     suffix="+" />
              <StatItem icon={Users}    value={50}    label="Industry Experts"     suffix="+" />
              <StatItem icon={Trophy}   value={95}    label="Client Satisfaction"  suffix="%" />
            </motion.div>
          </div>
        </section>

        {/* ═══════════ PURPOSE ═══════════ */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(245,158,11,0.04),transparent_55%)] pointer-events-none" />
          <div className="container-xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              {/* Left */}
              <motion.div {...fadeLeft(0)}>
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-600 mb-4 block">
                  Our Purpose
                </span>
                <h2 className="text-[2.4rem] font-black leading-tight text-gray-900 mb-5">
                  Driven by Purpose.<br />
                  Focused on{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg,#F59E0B,#EA580C)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Impact.
                  </span>
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                  We&apos;re here to accelerate growth, spark innovation and create opportunities that empower people and businesses to achieve more.
                </p>
              </motion.div>

              {/* Right — 3 cards */}
              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: Target, color: "#F59E0B", bg: "#FFFBEB",
                    title: "Our Mission",
                    desc: "To empower businesses and individuals by delivering innovative solutions, building meaningful connections and providing world-class learning experiences.",
                  },
                  {
                    icon: Eye, color: "#8B5CF6", bg: "#F5F3FF",
                    title: "Our Vision",
                    desc: "To be a global ecosystem that inspires growth, fosters innovation and creates a better, more connected future for all.",
                  },
                  {
                    icon: Gem, color: "#10B981", bg: "#ECFDF5",
                    title: "Our Values",
                    values: true,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    {...scaleIn(i * 0.1)}
                    whileHover={{ x: 4, boxShadow: `0 8px 28px ${item.color}18` }}
                    className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4 items-start transition-shadow duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: item.bg }}>
                      <item.icon size={18} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-black text-gray-900 mb-1.5">{item.title}</p>
                      {item.values ? (
                        <ul className="flex flex-col gap-1">
                          {values.map((v) => (
                            <li key={v} className="flex items-center gap-2">
                              <CheckCircle2 size={12} className="text-green-500 flex-shrink-0" />
                              <span className="text-[11px] text-gray-500">{v}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[11px] text-gray-400 leading-relaxed">{item.desc}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ JOURNEY ═══════════ */}
        <section id="journey" className="py-20">
          <div className="container-xl">
            <motion.div {...fadeUp(0)} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Our Journey</h2>
              <div className="w-14 h-1 rounded-full mx-auto mt-3" style={{ background: "linear-gradient(90deg,#F59E0B,#EA580C)" }} />
            </motion.div>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-[24px] left-[10%] right-[10%] h-[2px] bg-gray-100 z-0">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
                  className="h-full origin-left rounded-full"
                  style={{ background: "linear-gradient(90deg,#F59E0B,#EA580C)" }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                {journey.map((j, i) => (
                  <motion.div
                    key={j.year}
                    {...fadeUp(0.1 + i * 0.1)}
                    className="relative flex flex-col items-center text-center group"
                  >
                    {/* Icon circle */}
                    <motion.div
                      whileHover={{ scale: 1.15, background: "linear-gradient(135deg,#F59E0B,#EA580C)" }}
                      initial={{ background: "linear-gradient(135deg,#FEF3C7,#FDE68A)" }}
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4 relative z-10 shadow-md transition-all duration-300"
                    >
                      <j.icon size={18} className="text-amber-600 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                    <p className="text-[11px] font-black text-amber-600 mb-0.5">{j.year}</p>
                    <p className="text-[13px] font-black text-gray-900 mb-2">{j.title}</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{j.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ LEADERSHIP ═══════════ */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="container-xl">
            <motion.div {...fadeUp(0)} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Leadership That Inspires</h2>
              <div className="w-14 h-1 rounded-full mx-auto mt-3" style={{ background: "linear-gradient(90deg,#F59E0B,#EA580C)" }} />
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {team.map((member, i) => (
                <TiltCard key={member.name}>
                  <motion.div
                    {...scaleIn(i * 0.08)}
                    onMouseEnter={() => setHoveredMember(i)}
                    onMouseLeave={() => setHoveredMember(null)}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden group transition-shadow duration-300"
                    style={{ boxShadow: hoveredMember === i ? "0 16px 48px rgba(0,0,0,0.1)" : "" }}
                  >
                    {/* Photo */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-[13px] font-black text-gray-900">{member.name}</p>
                      <p className="text-[11px] text-amber-600 font-semibold mb-2">{member.role}</p>
                      <p className="text-[10px] text-gray-400 leading-relaxed mb-3">{member.desc}</p>
                      {/* Social */}
                      <div className="flex items-center gap-2">
                        {[
                          { key: "linkedin", icon: <IconLinkedin />, href: "#" },
                          { key: "x",        icon: <IconX />,        href: "#" },
                          { key: "instagram",icon: <IconInstagram />, href: "#" },
                        ].map((s) => (
                          <motion.a
                            key={s.key}
                            href={s.href}
                            whileHover={{ scale: 1.2, color: "#F59E0B" }}
                            className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-amber-50 hover:text-amber-500 transition-colors"
                          >
                            {s.icon}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>

            <motion.div {...fadeUp(0.2)} className="flex justify-center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 border-2 border-gray-300 px-8 py-3.5 rounded-full hover:border-amber-400 hover:text-amber-600 transition-all"
                >
                  Meet the Team
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════ WHY CHOOSE ═══════════ */}
        <section className="py-20">
          <div className="container-xl">
            <motion.div {...fadeUp(0)} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Why Choose Akronix?</h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
              {whyChoose.map((w, i) => (
                <motion.div
                  key={w.title}
                  {...scaleIn(i * 0.07)}
                  whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(245,158,11,0.12)" }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-shadow duration-300 cursor-default"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                    <w.icon size={20} className="text-amber-500" />
                  </div>
                  <p className="text-[12px] font-black text-gray-900">{w.title}</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed">{w.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ DARK CTA ═══════════ */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0F1623]" />
          <motion.div
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: "linear-gradient(270deg,#92400E,#1e3a8a,#0F1623,#92400E)", backgroundSize: "400%" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(245,158,11,0.08),transparent_60%)] pointer-events-none" />

          <div className="container-xl relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <motion.div {...fadeLeft(0)} className="flex items-start gap-5 flex-1">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)" }}
              >
                <Users size={26} className="text-white" />
              </motion.div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-2">
                  Let&apos;s Build Something Amazing Together
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                  Whether you&apos;re a business looking to scale, a startup with a big idea, or an individual ready to grow — we&apos;re here to help you succeed.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeRight(0.1)} className="flex items-center gap-4 flex-wrap flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="relative inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-full overflow-hidden group"
                  style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)", boxShadow: "0 6px 20px rgba(245,158,11,0.35)" }}
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  Book a Free Consultation
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white border-2 border-white/20 px-7 py-3.5 rounded-full hover:border-white/50 transition-colors"
                >
                  Explore Our Services
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Video modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="aspect-video flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                    <Play size={28} className="text-amber-400 ml-1" fill="currentColor" />
                  </div>
                  <p className="text-white/50 text-sm">Video coming soon</p>
                </div>
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <p className="text-white font-bold text-sm">Akronix — Building the Future Together</p>
                <button onClick={() => setVideoOpen(false)} className="text-white/40 hover:text-white transition-colors text-sm">✕ Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
