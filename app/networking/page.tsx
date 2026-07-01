"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  Users, UserPlus, Send, Handshake, TrendingUp,
  ArrowRight, Play, Check, ChevronLeft, ChevronRight,
  Eye, Shield, Lightbulb, Calendar, Star, MapPin, Clock,
  Award, Zap, Building2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ── Helpers ──────────────────────────────────────────────────── */
function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return count;
}

const fadeUp = (delay = 0, y = 32) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -36 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.88 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ── Data ─────────────────────────────────────────────────────── */
const steps = [
  { num: "1", icon: UserPlus,   title: "Join the Community",       desc: "Become a member and get access to our network." },
  { num: "2", icon: Users,      title: "Connect & Engage",         desc: "Attend meetings, introduce your business, build trust." },
  { num: "3", icon: Send,       title: "Give & Receive Referrals", desc: "Share opportunities and receive quality referrals." },
  { num: "4", icon: Handshake,  title: "Collaborate & Grow",       desc: "Build partnerships and scale your business together." },
  { num: "5", icon: TrendingUp, title: "Grow & Succeed",           desc: "Unlock new opportunities and achieve more." },
];

const benefits = [
  { icon: UserPlus,   title: "Referral Opportunities", desc: "Get high-quality referrals from trusted community members.",       color: "#8B5CF6", bg: "#F5F3FF" },
  { icon: Eye,        title: "Business Visibility",    desc: "Showcase your business to a highly engaged audience.",             color: "#0EA5E9", bg: "#F0F9FF" },
  { icon: Handshake,  title: "Strategic Partnerships", desc: "Collaborate with businesses that complement you.",                  color: "#10B981", bg: "#F0FDF4" },
  { icon: Lightbulb,  title: "Knowledge Sharing",      desc: "Learn from experienced professionals and industry leaders.",       color: "#F59E0B", bg: "#FFFBEB" },
  { icon: Calendar,   title: "Monthly Events",         desc: "Attend exclusive networking events and business growth sessions.", color: "#EC4899", bg: "#FDF2F8" },
  { icon: Shield,     title: "Trusted Community",      desc: "Be part of a verified and supportive business ecosystem.",        color: "#EF4444", bg: "#FEF2F2" },
];

const plans = [
  {
    name: "Starter Member", price: "₹999", period: "/month",
    icon: Zap, iconColor: "#F59E0B",
    features: ["Access to Monthly Meetings", "Member Directory", "Business Introductions", "Community Support"],
    cta: "Join Now", href: "/contact?plan=network-starter", popular: false,
  },
  {
    name: "Business Member", price: "₹1,999", period: "/month",
    icon: Star, iconColor: "#ffffff",
    features: ["All Starter Benefits", "Referral Opportunities", "Business Promotion", "Priority Introductions", "Event Discounts"],
    cta: "Join Now", href: "/contact?plan=network-business", popular: true,
  },
  {
    name: "Premium Member", price: "₹3,999", period: "/month",
    icon: Award, iconColor: "#F59E0B",
    features: ["All Business Member Benefits", "Featured Member Listing", "Exclusive Networking Events", "Personalized Growth Support", "Business Collaboration Access"],
    cta: "Join Now", href: "/contact?plan=network-premium", popular: false,
  },
];

const events = [
  { day: "25", month: "MAY", title: "Business Networking Meetup",    location: "Ahmedabad, Gujarat",  time: "6:00 PM – 8:30 PM" },
  { day: "08", month: "JUN", title: "Founder Connect Summit",        location: "Bangalore, Karnataka", time: "10:00 AM – 1:00 PM" },
  { day: "22", month: "JUN", title: "Referral Networking Workshop",  location: "Online Event",         time: "4:00 PM – 6:00 PM" },
];

const testimonials = [
  { quote: "Akronix Network has introduced me to amazing business opportunities and trusted partners. It's a game changer for entrepreneurs!", name: "Ravi Sharma",   role: "CEO, TechNova Solutions" },
  { quote: "The referral community here is unmatched. Within 3 months I grew my client base by 40% purely through Akronix connections.",       name: "Priya Mehta",   role: "Founder, BrightEdge Marketing" },
  { quote: "Monthly events are incredibly well organized. The quality of professionals you meet here is truly extraordinary.",                  name: "Anil Kapoor",   role: "Director, InnovateTech Solutions" },
];

const statsData = [
  { value: 1250, suffix: "+", label: "Active Members",       icon: Users },
  { value: 3450, suffix: "+", label: "Referrals Given",      icon: Send },
  { value: 860,  suffix: "+", label: "Partnerships Created", icon: Handshake },
  { value: 120,  suffix: "+", label: "Monthly Meetings",     icon: Calendar },
  { value: 25,   suffix: "+", label: "Cities Covered",       icon: MapPin },
  { value: 95,   suffix: "%", label: "Member Satisfaction",  icon: Star },
];

/* ── Stat counter component ───────────────────────────────────── */
function StatItem({ value, suffix, label, icon: Icon, delay }: { value: number; suffix: string; label: string; icon: React.ElementType; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(value, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center group"
    >
      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition-colors duration-300">
        <Icon size={20} className="text-amber-400" />
      </div>
      <p className="text-3xl font-black text-white leading-none mb-1">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
    </motion.div>
  );
}

/* ── Tilt card wrapper ────────────────────────────────────────── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 200, damping: 30 });
  const rotateY = useSpring(x, { stiffness: 200, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(((e.clientX - cx) / rect.width) * 12);
    y.set(-((e.clientY - cy) / rect.height) * 12);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function NetworkingPage() {
  const [activeT, setActiveT] = useState(0);
  const [hoverStep, setHoverStep] = useState<number | null>(null);

  /* Auto-advance testimonials */
  useEffect(() => {
    const id = setInterval(() => setActiveT(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Navigation />
      <main className="bg-white text-gray-900 overflow-x-hidden">

        {/* ═══════════════════ HERO ═══════════════════ */}
        <section className="relative pt-28 pb-24 overflow-hidden">
          {/* Ambient background orbs */}
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-amber-100 rounded-full blur-[120px] opacity-50 pointer-events-none" />
          <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] opacity-60 pointer-events-none" />

          <div className="container-xl relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left ─ text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-600 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full mb-7">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Akronix Network
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[2.8rem] md:text-[3.4rem] font-black leading-[1.08] tracking-tight text-gray-900 mb-5"
              >
                Connections Today.{" "}
                <motion.span
                  initial={{ backgroundPosition: "200% center" }}
                  animate={{ backgroundPosition: "0% center" }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                  className="inline-block"
                  style={{
                    background: "linear-gradient(90deg,#F59E0B,#EA580C,#F59E0B)",
                    backgroundSize: "200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Opportunities
                </motion.span>{" "}
                Tomorrow.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-gray-500 text-[1.05rem] leading-relaxed mb-9 max-w-[480px]"
              >
                Akronix Network is a BNI-inspired business community that helps entrepreneurs, professionals, and businesses grow through trusted relationships, referrals, collaborations, and knowledge sharing.
              </motion.p>

              {/* Feature badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                {[
                  { icon: Shield,    label: "Quality Connections", sub: "Connect with verified business professionals." },
                  { icon: Users,     label: "Grow Together",       sub: "Referrals, partnerships and collaboration." },
                  { icon: TrendingUp,label: "Business Growth",     sub: "More opportunities, more visibility, more growth." },
                ].map(({ icon: Ic, label, sub }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                    whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(245,158,11,0.15)" }}
                    className="flex items-start gap-2.5 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 cursor-default"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Ic size={13} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-gray-800">{label}</p>
                      <p className="text-[11px] text-gray-400 leading-snug">{sub}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex items-center gap-5 flex-wrap"
              >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact?plan=network-business"
                    className="relative inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-full overflow-hidden group"
                    style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)", boxShadow: "0 6px 20px rgba(245,158,11,0.38)" }}
                  >
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    Join the Network
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full border-2 border-gray-300 group-hover:border-amber-400 flex items-center justify-center transition-all duration-300 group-hover:bg-amber-50 group-hover:shadow-[0_0_0_4px_rgba(245,158,11,0.1)]">
                    <Play size={13} fill="currentColor" className="text-gray-600 group-hover:text-amber-500 transition-colors ml-0.5" />
                  </span>
                  How It Works
                </motion.button>
              </motion.div>
            </div>

            {/* Right ─ image + floating stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_32px_80px_rgba(0,0,0,0.18)]">
                <Image
                  src="/blog-networking.png"
                  alt="Business Networking"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-gray-900/40" />
                {/* Play button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl cursor-pointer"
                  >
                    <Play size={22} className="text-amber-500 ml-1" fill="#F59E0B" />
                  </motion.div>
                  <p className="text-white/70 text-xs font-semibold mt-3 tracking-wide">Watch Overview</p>
                </div>
              </div>

              {/* Floating stat cards */}
              {[
                { top: "-16px", right: "-16px", icon: Users,    value: "1,250+", label: "Active Members",      delay: 0.5 },
                { top: "-16px", right: "148px",  icon: ArrowRight, value: "3,450+", label: "Referrals Given", delay: 0.6 },
                { bottom: "-16px", left: "16px", icon: Handshake, value: "860+",  label: "Partnerships Created", delay: 0.7 },
                { bottom: "-16px", right: "16px", icon: Calendar, value: "120+",  label: "Business Meetings",  delay: 0.8 },
              ].map(({ top, right, bottom, left, icon: Ic, value, label, delay }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay, type: "spring", bounce: 0.4 }}
                  whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.16)" }}
                  className="absolute bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100"
                  style={{ top, right, bottom, left }}
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Ic size={16} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-[17px] font-black text-gray-900 leading-none">{value}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.04),transparent_60%)] pointer-events-none" />
          <div className="container-xl relative z-10">
            <motion.div {...fadeUp(0)} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                How Akronix{" "}
                <span style={{ background: "linear-gradient(90deg,#F59E0B,#EA580C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Network
                </span>{" "}
                Works
              </h2>
              <div className="w-14 h-1 rounded-full mx-auto mt-4" style={{ background: "linear-gradient(90deg,#F59E0B,#EA580C)" }} />
            </motion.div>

            {/* Steps */}
            <div className="relative flex flex-col md:flex-row items-start gap-0">
              {/* Connecting line (desktop) */}
              <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-[2px] bg-amber-100 z-0">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                  className="h-full origin-left rounded-full"
                  style={{ background: "linear-gradient(90deg,#F59E0B,#EA580C)" }}
                />
              </div>

              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  {...fadeUp(0.1 + i * 0.1)}
                  onMouseEnter={() => setHoverStep(i)}
                  onMouseLeave={() => setHoverStep(null)}
                  className="relative flex-1 flex flex-col items-center text-center px-3 group cursor-default"
                >
                  <motion.div
                    animate={{ scale: hoverStep === i ? 1.18 : 1, backgroundColor: hoverStep === i ? "#F59E0B" : "#fff" }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="w-14 h-14 rounded-full border-2 border-amber-200 bg-white flex items-center justify-center mb-5 relative z-10 shadow-md"
                  >
                    <motion.div animate={{ color: hoverStep === i ? "#ffffff" : "#F59E0B" }}>
                      <step.icon size={20} />
                    </motion.div>
                  </motion.div>
                  <motion.p
                    animate={{ color: hoverStep === i ? "#F59E0B" : "#111827" }}
                    className="text-sm font-black mb-1.5"
                  >
                    {step.num}. {step.title}
                  </motion.p>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-[150px]">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ WHY JOIN US ═══════════════════ */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-[500px] h-full bg-gradient-to-l from-amber-50/60 to-transparent pointer-events-none" />
          <div className="container-xl relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            {/* Left */}
            <motion.div {...fadeLeft(0)}>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 mb-3">Why Join Us</p>
              <h2 className="text-4xl md:text-[2.8rem] font-black leading-tight text-gray-900 mb-5">
                More Than Networking.
                <br />
                It&apos;s{" "}
                <span style={{ background: "linear-gradient(90deg,#F59E0B,#EA580C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Business Growth.
                </span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-9 max-w-[400px]">
                We go beyond exchanging business cards. We build long-term relationships that create real business value.
              </p>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact?plan=network-business"
                  className="inline-flex items-center gap-2 text-sm font-black text-white bg-gray-900 px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Explore Benefits
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <TiltCard key={b.title}>
                  <motion.div
                    {...scaleIn(0.05 + i * 0.07)}
                    whileHover={{ y: -5, boxShadow: `0 16px 40px ${b.color}18` }}
                    className="flex items-start gap-3.5 p-5 rounded-2xl border border-gray-100 bg-white transition-shadow cursor-default"
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: b.bg }}>
                      <b.icon size={18} style={{ color: b.color }} />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-gray-800 mb-1">{b.title}</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ MEMBERSHIP PLANS ═══════════════════ */}
        <section className="py-24 bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-100/40 rounded-full blur-[80px] pointer-events-none" />
          <div className="container-xl relative z-10">
            <motion.div {...fadeUp(0)} className="mb-14">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 mb-3">Membership Plans</p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                Choose a Plan That<br />Fits Your Growth
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-7">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  {...fadeUp(i * 0.12, 40)}
                  whileHover={!plan.popular ? { y: -8, boxShadow: "0 24px 60px rgba(0,0,0,0.1)" } : { y: -8 }}
                  className={`relative flex flex-col rounded-3xl p-8 border overflow-hidden transition-all duration-300 ${
                    plan.popular
                      ? "bg-gray-900 border-amber-400 shadow-[0_24px_60px_rgba(245,158,11,0.2)]"
                      : "bg-white border-gray-200 shadow-sm"
                  }`}
                >
                  {/* Popular glow ring */}
                  {plan.popular && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-3xl border-2 border-amber-400/40 pointer-events-none"
                    />
                  )}

                  {plan.popular && (
                    <div
                      className="absolute -top-px left-1/2 -translate-x-1/2 text-white text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-b-xl"
                      style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)" }}
                    >
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6 mt-2">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${plan.popular ? "bg-amber-500/20" : "bg-amber-50"}`}>
                      <plan.icon size={20} style={{ color: plan.iconColor }} />
                    </div>
                    <p className={`text-sm font-bold mb-3 ${plan.popular ? "text-white/80" : "text-gray-600"}`}>{plan.name}</p>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-black ${plan.popular ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                      <span className={`text-sm font-medium ${plan.popular ? "text-white/40" : "text-gray-400"}`}>{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className={`flex items-center gap-2.5 text-sm ${plan.popular ? "text-white/70" : "text-gray-600"}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? "bg-amber-500/20" : "bg-amber-50"}`}>
                          <Check size={11} className={plan.popular ? "text-amber-400" : "text-amber-500"} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href={plan.href}
                      className={`w-full block py-3.5 text-sm font-black rounded-xl text-center transition-all duration-200 relative overflow-hidden group ${
                        plan.popular
                          ? "text-white"
                          : "border-2 border-gray-200 text-gray-800 hover:border-amber-400 hover:text-amber-600"
                      }`}
                      style={plan.popular ? { background: "linear-gradient(135deg,#F59E0B,#EA580C)" } : {}}
                    >
                      {plan.popular && (
                        <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                      )}
                      <span className="relative z-10">{plan.cta}</span>
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ EVENTS + TESTIMONIALS ═══════════════════ */}
        <section className="py-24">
          <div className="container-xl grid lg:grid-cols-2 gap-16">

            {/* Events */}
            <div>
              <div className="flex items-center justify-between mb-7">
                <motion.h3 {...fadeUp(0)} className="text-xl font-black text-gray-900">Upcoming Networking Events</motion.h3>
                <motion.div {...fadeUp(0.1)}>
                  <Link href="/contact?type=events" className="text-sm font-semibold text-amber-500 hover:text-amber-600 flex items-center gap-1 group">
                    View All Events
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
              <div className="space-y-4">
                {events.map((ev, i) => (
                  <motion.div
                    key={ev.title}
                    {...fadeLeft(0.05 + i * 0.1)}
                    whileHover={{ x: 6, boxShadow: "0 8px 28px rgba(245,158,11,0.12)" }}
                    className="flex items-center gap-5 bg-white rounded-2xl p-4 border border-gray-100 hover:border-amber-200 transition-all duration-200 cursor-default group"
                  >
                    {/* Date block */}
                    <div
                      className="w-14 flex-shrink-0 rounded-xl py-2 text-center"
                      style={{ background: "linear-gradient(135deg,#FEF3C7,#FDE68A)" }}
                    >
                      <p className="text-2xl font-black text-amber-700 leading-none">{ev.day}</p>
                      <p className="text-[9px] font-black uppercase tracking-wider text-amber-500 mt-0.5">{ev.month}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 group-hover:text-amber-600 transition-colors">{ev.title}</p>
                      <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-400">
                        <MapPin size={10} />
                        {ev.location}
                        <span className="mx-1 text-gray-300">·</span>
                        <Clock size={10} />
                        {ev.time}
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/contact?type=events"
                        className="text-xs font-bold text-gray-700 border border-gray-200 px-3.5 py-2 rounded-xl hover:border-amber-400 hover:text-amber-600 transition-all flex-shrink-0 whitespace-nowrap"
                      >
                        Register Now
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <div className="flex items-center justify-between mb-7">
                <motion.h3 {...fadeUp(0)} className="text-xl font-black text-gray-900">What Our Members Say</motion.h3>
                <motion.div {...fadeUp(0.1)}>
                  <Link href="/pricing/testimonials" className="text-sm font-semibold text-amber-500 hover:text-amber-600 flex items-center gap-1 group">
                    View All Testimonials
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              <motion.div {...scaleIn(0.1)} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 relative overflow-hidden min-h-[260px]">
                {/* Giant quote mark */}
                <span className="absolute top-3 left-5 text-[80px] font-serif text-amber-200 leading-none select-none">&ldquo;</span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeT}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative z-10 pt-10"
                  >
                    <p className="text-gray-700 leading-relaxed text-[0.97rem] mb-6">
                      {testimonials[activeT].quote}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-black text-sm">
                        {testimonials[activeT].name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{testimonials[activeT].name}</p>
                        <p className="text-xs text-gray-400">{testimonials[activeT].role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="flex items-center gap-3 mt-7">
                  <div className="flex gap-1.5 flex-1">
                    {testimonials.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setActiveT(i)}
                        animate={{ width: i === activeT ? 24 : 10 }}
                        className={`h-1.5 rounded-full transition-colors ${i === activeT ? "bg-amber-500" : "bg-gray-200 hover:bg-amber-200"}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {[ChevronLeft, ChevronRight].map((Ic, d) => (
                      <motion.button
                        key={d}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setActiveT(p => (p + (d === 0 ? -1 : 1) + testimonials.length) % testimonials.length)}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-amber-400 hover:bg-amber-50 transition-all"
                      >
                        <Ic size={14} />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ STATS BAR ═══════════════════ */}
        <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#111827,#1f2937)" }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06),transparent_70%)] pointer-events-none" />
          <div className="container-xl relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
              {statsData.map((s, i) => (
                <StatItem key={s.label} {...s} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ FINAL CTA ═══════════════════ */}
        <section className="py-24 relative overflow-hidden">
          {/* Animated gradient background */}
          <motion.div
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{ background: "linear-gradient(270deg,#FFFBEB,#FEF3C7,#FDE68A,#FFFBEB)", backgroundSize: "400%" }}
          />
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm pointer-events-none" />

          <div className="container-xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <motion.div {...fadeLeft(0)}>
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)" }}
                >
                  <Users size={20} className="text-white" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">Ready to Expand Your Network?</h2>
              </div>
              <p className="text-gray-500 ml-[60px]">Join Akronix Network and unlock endless business opportunities.</p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="flex items-center gap-4 flex-wrap flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact?plan=network-business"
                  className="relative inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-full overflow-hidden group"
                  style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)", boxShadow: "0 6px 20px rgba(245,158,11,0.38)" }}
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  Join the Network
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-800 bg-white border-2 border-gray-300 px-7 py-3.5 rounded-full hover:border-gray-500 transition-colors shadow-sm"
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
