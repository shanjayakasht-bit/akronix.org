"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight, ChevronRight, Play, Star, Globe, TrendingUp, Zap,
  Code2, BarChart3, Users, GraduationCap, CheckCircle2, Quote,
  ChevronLeft, ExternalLink, ShieldCheck, Lightbulb, Handshake, Rocket,
  Building2, Package, Cpu, MailOpen, PhoneCall, MapPin, Database, Bot, Layers,
} from "lucide-react";
import type { PublishedTestimonial } from "@/lib/site-settings";
import { generateSlug } from "@/lib/utils";

/* ── Animation Variants ──────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ── Data ─────────────────────────────────────────────────────── */
const stats = [
  { value: "50+", label: "Businesses Empowered" },
  { value: "15+", label: "Valuable Partnerships" },
  { value: "98%", label: "Client Retention" },
  { value: "60%", label: "Avg. Efficiency Gain" },
];

const ecosystem = [
  {
    icon: Code2,
    title: "Software Solutions",
    tagline: "Build Powerful Products",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    accentColor: "#DBEAFE",
    desc: "Custom SaaS, white-label products, CRM, ERP, AI applications and more to power your business.",
    features: ["SaaS Development", "White-Label Products", "CRM & ERP Systems", "AI & Automation"],
    cta: "Explore Software",
    href: "/services",
  },
  {
    icon: BarChart3,
    title: "Digital Growth",
    tagline: "Grow Your Brand",
    color: "#16A34A",
    bgColor: "#F0FDF4",
    accentColor: "#DCFCE7",
    desc: "Data-driven marketing strategies that generate leads, build brands and accelerate business growth.",
    features: ["SEO & SEM", "Social Media Marketing", "Performance Marketing", "Branding & Content"],
    cta: "Explore Marketing",
    href: "/services",
  },
  {
    icon: Users,
    title: "Business Networking",
    tagline: "Connect & Collaborate",
    color: "#9333EA",
    bgColor: "#FDF4FF",
    accentColor: "#F3E8FF",
    desc: "BNI-inspired networking ecosystem that connects, mentors, collaborates and creates opportunities.",
    features: ["Tailored Networking", "Mentorship Networking Events", "Business Communities", "Strategic Partnerships"],
    cta: "Join the Network",
    href: "/contact",
  },
  {
    icon: GraduationCap,
    title: "Academy & Mentorship",
    tagline: "Learn & Grow",
    color: "#EA580C",
    bgColor: "#FFF7ED",
    accentColor: "#FFEDD5",
    desc: "Empowering students, startups and professionals to up-skill, get mentorship and unlock opportunities.",
    features: ["Startup Mentorship", "Fund Your Projects", "Workshops & Internships", "Business Guidance"],
    cta: "Explore Academy",
    href: "/contact",
  },
];

const products = [
  { name: "Akronix CRM", desc: "Manage leads and customers", icon: Users, tag: "CRM" },
  { name: "Akronix HRMS", desc: "Simplify HR and employee management", icon: Building2, tag: "HRMS" },
  { name: "Akronix ERP", desc: "Complete ERP solution for your business", icon: Package, tag: "ERP" },
  { name: "Akronix Inventory", desc: "Track inventory & stock needs", icon: Cpu, tag: "INV" },
  { name: "Akronix POS", desc: "Point-of-sale for retail businesses", icon: ShieldCheck, tag: "POS" },
  { name: "Akronix AI", desc: "A remote assistant with AI Intelligence", icon: Zap, tag: "AI" },
];

const whyChoose = [
  { icon: ShieldCheck, title: "Complete Ecosystem", desc: "One platform to manage all your business needs." },
  { icon: Lightbulb, title: "Expert Mentorship", desc: "Guidance from industry experts and professionals." },
  { icon: Rocket, title: "AI-Powered Growth", desc: "Smart solutions for faster, better decision-making." },
  { icon: Handshake, title: "Strategic Networking", desc: "Opportunities that create real growth." },
  { icon: Globe, title: "Scalable Solutions", desc: "Build to grow with your business at every stage." },
  { icon: TrendingUp, title: "Long-Term Partnership", desc: "We grow when you grow. Your success is ours." },
];

const successStories = [
  {
    category: "Digital Transformation",
    title: "Retail/CRM Solution",
    highlight: "60%",
    highlightLabel: "increase in customer management efficiency",
    desc: "We helped streamline CRM and increase managed customer reach.",
    tag: "CRM",
    color: "#2563EB",
    bg: "#EFF6FF",
  },
  {
    category: "Performance Marketing",
    title: "Performance Marketing",
    highlight: "300%",
    highlightLabel: "increase in deals with targeted campaigns",
    desc: "Our marketing team delivered results that exceeded expectations.",
    tag: "MARKETING",
    color: "#16A34A",
    bg: "#F0FDF4",
  },
  {
    category: "Networking Impact",
    title: "Business Networking",
    highlight: "15+",
    highlightLabel: "valuable partnerships in 6 months",
    desc: "Our networking program connected businesses to mutual success.",
    tag: "NETWORK",
    color: "#9333EA",
    bg: "#FDF4FF",
  },
];

const testimonials = [
  {
    name: "Ravi Sharma",
    title: "CEO, ShopEasy",
    rating: 5,
    text: "Akronix transformed our business with an exceptional CRM solution and outstanding support. The team truly understands what we need.",
    avatar: "RS",
    color: "#2563EB",
  },
  {
    name: "Priya Nair",
    title: "Founder, EduBridge",
    rating: 5,
    text: "Their networking ecosystem introduced us to valuable partners and new opportunities. We grew our business network 5x in 6 months!",
    avatar: "PN",
    color: "#9333EA",
  },
  {
    name: "Arjun Nair",
    title: "CTO, HealthPlus",
    rating: 5,
    text: "From Akronix helped us define our long-term growth partners. Their technical expertise and mentorship is unparalleled.",
    avatar: "AN",
    color: "#16A34A",
  },
  {
    name: "Smitha Iyer",
    title: "Marketing Head, TechCo",
    rating: 5,
    text: "The marketing strategies from Akronix delivered amazing results for our brand! Our revenue grew 300% in just 3 months.",
    avatar: "SI",
    color: "#EA580C",
  },
];

const partners = [
  { name: "ZOHO", logo: null },
  { name: "Microsoft", logo: null },
  { name: "AWS", logo: null },
  { name: "HubSpot", logo: null },
  { name: "Google", logo: null },
  { name: "BNI", logo: null },
  { name: "Meta", logo: null },
  { name: "GitHub", logo: null },
  { name: "Hostinger", logo: null },
];

/* ── Animated Counter ─────────────────────────────────────────── */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-black text-[#F59E0B] mb-1">{value}</div>
      <div className="text-sm text-gray-500 font-medium">{label}</div>
    </motion.div>
  );
}

/* ── Testimonial Card ─────────────────────────────────────────── */
function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-4 h-full">
      <div className="flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed flex-1">"{testimonial.text}"</p>
      <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: testimonial.color }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">{testimonial.name}</p>
          <p className="text-xs text-gray-400">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Icon map for DB-driven products ─────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  Users, Building2, Package, Cpu, ShieldCheck, Zap,
  Globe, BarChart3, Code2, Database, Bot, Layers,
  Lightbulb, Handshake, Rocket, TrendingUp, GraduationCap,
};

/* ── Component ────────────────────────────────────────────────── */
interface HomePageProps {
  settings?: Record<string, string>;
  dbTestimonials?: PublishedTestimonial[];
}

const TESTIMONIAL_COLORS = ["#2563EB", "#9333EA", "#16A34A", "#EA580C"];

export default function HomePage({ settings = {}, dbTestimonials = [] }: HomePageProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialsPerPage] = useState(2);
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Resolve settings with fallbacks to hardcoded defaults
  const heroBadge = settings["homepage.hero.badge"] || "Empowering Startups, Businesses & Institutions";
  const heroDesc = settings["homepage.hero.description"] || "Akronix is your complete business growth ecosystem. We deliver software solutions, digital marketing, business networking, mentorship and innovation — under one roof.";
  const cta1Text = settings["homepage.hero.cta1.text"] || "Get Started";
  const cta1Href = settings["homepage.hero.cta1.href"] || "/contact?type=project";
  const cta2Text = settings["homepage.hero.cta2.text"] || "Explore Products";
  const cta2Href = settings["homepage.hero.cta2.href"] || "/products";
  const ctaHeadline = settings["homepage.cta.headline"] || "Ready to Build the Future of Your Business?";
  const ctaDesc = settings["homepage.cta.description"] || "Let's build software that matters, expand your network and unlock new opportunities — together.";
  const testimonialsLabel = settings["homepage.testimonials.label"] || "4.9/5 from 100+ reviews";

  let activeStats = stats;
  try {
    if (settings["homepage.stats"]) activeStats = JSON.parse(settings["homepage.stats"]);
  } catch {}

  let activePartners = partners;
  try {
    if (settings["homepage.partners"]) {
      const parsed: string[] = JSON.parse(settings["homepage.partners"]);
      activePartners = parsed.map((name) => ({ name, logo: null }));
    }
  } catch {}

  // Products — load from settings (JSON) or fall back to hardcoded
  type ActiveProduct = { name: string; desc: string; tag: string; Icon: React.ElementType };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let activeProducts: ActiveProduct[] = products.map(p => ({ name: p.name, desc: p.desc, tag: p.tag, Icon: p.icon as any }));
  try {
    if (settings["homepage.products"]) {
      const parsed: { name: string; desc: string; tag: string; icon: string }[] =
        JSON.parse(settings["homepage.products"]);
      activeProducts = parsed.map(p => ({
        name: p.name,
        desc: p.desc,
        tag: p.tag,
        Icon: ICON_MAP[p.icon] ?? Package,
      }));
    }
  } catch {}

  // Success stories — load from settings or fall back to hardcoded
  let activeStories = successStories;
  try {
    if (settings["homepage.success_stories"]) {
      activeStories = JSON.parse(settings["homepage.success_stories"]);
    }
  } catch {}

  // Testimonials — use DB records if any, else fall back to hardcoded
  const activeTestimonialsList = dbTestimonials.length > 0
    ? dbTestimonials.map((t, i) => ({
        name: t.authorName,
        title: `${t.authorTitle}${t.company ? `, ${t.company}` : ""}`,
        rating: t.rating,
        text: t.content,
        avatar: t.authorName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase(),
        color: TESTIMONIAL_COLORS[i % TESTIMONIAL_COLORS.length],
      }))
    : testimonials;

  const totalTestimonialPages = Math.ceil(activeTestimonialsList.length / testimonialsPerPage);
  const visibleTestimonials = activeTestimonialsList.slice(
    activeTestimonial * testimonialsPerPage,
    (activeTestimonial + 1) * testimonialsPerPage
  );

  return (
    <div className="overflow-clip bg-white">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 px-4 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFF 40%, #F0F4FF 100%)",
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #DBEAFE, transparent 70%)" }} />
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #EDE9FE, transparent 70%)" }} />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="container-xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Eyebrow badge */}
              <motion.div {...fadeIn(0)} className="mb-6">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                  {heroBadge}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div {...fadeUp(0.1)}>
                <h1 className="text-6xl md:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight mb-6">
                  <span className="text-gray-900">Build.</span>
                  <br />
                  <span className="text-gray-900">Connect.</span>
                  <br />
                  <span style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Scale.
                  </span>
                </h1>
              </motion.div>

              <motion.p {...fadeUp(0.2)} className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
                {heroDesc}
              </motion.p>

              {/* CTA buttons */}
              <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href={cta1Href}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                  style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)", boxShadow: "0 4px 20px rgba(245,158,11,0.35)" }}
                >
                  {cta1Text} <ArrowRight size={16} />
                </Link>
                <Link
                  href={cta2Href}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-gray-700 text-sm bg-white border border-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-gray-300"
                >
                  {cta2Text} <ChevronRight size={16} />
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div {...fadeUp(0.4)} className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-100">
                {activeStats.map((s) => (
                  <AnimatedStat key={s.label} {...s} />
                ))}
              </motion.div>
            </div>

            {/* Right — Dashboard Mockup */}
            <motion.div {...scaleIn(0.3)} className="relative hidden lg:block">
              {/* Main dashboard card */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)] bg-white border border-gray-100">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] p-4 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                    <div className="w-3 h-3 rounded-full bg-white/30" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-white/80 text-xs font-semibold">Akronix Dashboard</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#F59E0B] flex items-center justify-center text-[8px] font-black text-white">A</div>
                </div>

                <div className="p-6 bg-gray-50">
                  {/* Revenue metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                      <p className="text-xs text-gray-400 font-medium mb-1">Total Revenue</p>
                      <p className="text-2xl font-black text-gray-900">$250,000</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp size={10} className="text-green-500" />
                        <span className="text-[10px] text-green-500 font-semibold">+18.2%</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                      <p className="text-xs text-gray-400 font-medium mb-1">New Clients</p>
                      <p className="text-2xl font-black text-gray-900">1,420</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp size={10} className="text-blue-500" />
                        <span className="text-[10px] text-blue-500 font-semibold">+12.4%</span>
                      </div>
                    </div>
                  </div>

                  {/* Mini chart area */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                    <p className="text-xs text-gray-400 font-medium mb-3">Growth Overview</p>
                    <div className="h-16 flex items-end gap-1.5">
                      {[40, 55, 45, 70, 60, 85, 75, 90, 80, 95, 88, 100].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm transition-all duration-300"
                          style={{
                            height: `${h}%`,
                            background: i >= 9 ? "linear-gradient(135deg, #F59E0B, #EA580C)" : "#DBEAFE",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Services grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Software", pct: 40, color: "#2563EB" },
                      { label: "Marketing", pct: 25, color: "#16A34A" },
                      { label: "Networking", pct: 20, color: "#9333EA" },
                      { label: "Academy", pct: 15, color: "#EA580C" },
                    ].map((s) => (
                      <div key={s.label} className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-semibold text-gray-500">{s.label}</span>
                          <span className="text-[10px] font-black" style={{ color: s.color }}>{s.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <BarChart3 size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900">Digital Marketing</p>
                  <p className="text-[10px] text-gray-400">Grow Your Brand</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Users size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900">Business Networking</p>
                  <p className="text-[10px] text-gray-400">Connect & Grow</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -right-8 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 border border-gray-100"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                  <GraduationCap size={14} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-900">Academy</p>
                  <p className="text-[9px] text-gray-400">Learn & Grow</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ──────────────────────────────────────────── */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="container-xl">
          <motion.p {...fadeIn(0)} className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
            Trusted by 100+ Businesses &amp; Institutions
          </motion.p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
              className="flex gap-12 w-max items-center"
            >
              {[...activePartners, ...activePartners].map((p, i) => (
                <div key={i} className="flex items-center justify-center px-4">
                  <span className="text-lg font-black text-gray-400 tracking-tight whitespace-nowrap hover:text-gray-700 transition-colors duration-200">
                    {p.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── AKRONIX ECOSYSTEM ───────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Our Platform</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              The <span style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Akronix</span> Ecosystem
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">One Platform. Four Pillars of Growth.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystem.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
                className="group relative rounded-3xl p-6 border border-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col cursor-pointer overflow-hidden"
              >
                {/* Background tint on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                  style={{ background: item.bgColor }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: item.accentColor }}
                  >
                    <item.icon size={24} style={{ color: item.color }} />
                  </div>

                  {/* Eyebrow */}
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: item.color }}>{item.tagline}</p>

                  {/* Title */}
                  <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>

                  {/* Desc */}
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{item.desc}</p>

                  {/* Features list */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 size={13} style={{ color: item.color }} className="flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: item.accentColor,
                      color: item.color,
                    }}
                  >
                    {item.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIUM PRODUCTS ────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container-xl">
          <motion.div {...fadeUp()} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">White-Label SaaS</p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">Our Premium Products</h2>
              <p className="text-gray-500 mt-2">White-Label SaaS Products to Simplify Your Business Operations</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap">
              View All Products <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {activeProducts.map((product, i) => (
              <motion.div
                key={`${product.name}-${i}`}
                {...fadeUp(i * 0.08)}
                whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.12)" }}
                className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col items-start gap-3 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                  <product.Icon size={18} className="text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1 block">{product.tag}</span>
                  <h3 className="text-sm font-black text-gray-900 leading-tight">{product.name}</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-snug">{product.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE AKRONIX ──────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - feature grid */}
            <div>
              <motion.div {...fadeUp()}>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Our Advantage</p>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                  Why Businesses Choose Akronix
                </h2>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {whyChoose.map((item, i) => (
                  <motion.div
                    key={item.title}
                    {...fadeUp(i * 0.08)}
                    className="flex items-start gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors duration-300">
                      <item.icon size={16} className="text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gray-900 mb-0.5">{item.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right - quote card */}
            <motion.div {...scaleIn(0.2)} className="relative">
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)" }}
              >
                <div className="p-10 md:p-12">
                  <Quote size={40} className="text-white/20 mb-6" />
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-6">
                    We don&apos;t just build software. We build relationships, solutions and futures.
                  </h3>
                  <button className="inline-flex items-center gap-3 text-sm font-bold text-white">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play size={12} className="text-white fill-white ml-0.5" />
                    </div>
                    Play Video
                  </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
              </div>

              {/* Stats floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { v: "500+", l: "Clients" },
                    { v: "98%", l: "Retention" },
                    { v: "15+", l: "Partners" },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <p className="text-base font-black text-gray-900">{s.v}</p>
                      <p className="text-[10px] text-gray-400">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES ─────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container-xl">
          <motion.div {...fadeUp()} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Case Studies</p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">Success Stories</h2>
              <p className="text-gray-500 mt-2">Real Results. Real Impact.</p>
            </div>
            <Link href="/pricing/testimonials#success-stories" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 whitespace-nowrap">
              View All Stories <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {activeStories.map((story, i) => (
              <motion.div
                key={`${story.title}-${i}`}
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col"
              >
                {/* Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: story.bg, color: story.color }}
                  >
                    {story.category}
                  </span>
                  <ExternalLink size={14} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
                </div>

                {/* Metric */}
                <div className="mb-6 flex-1">
                  <div className="text-5xl font-black mb-2" style={{ color: story.color }}>
                    {story.highlight}
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">{story.highlightLabel}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{story.desc}</p>
                </div>

                {/* CTA */}
                <Link
                  href={`/pricing/testimonials#story-${generateSlug(story.title)}`}
                  className="inline-flex items-center gap-2 text-sm font-bold transition-colors duration-200"
                  style={{ color: story.color }}
                >
                  Read Story <ChevronRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Client Reviews</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">What Our Clients Say</h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-[#F59E0B] text-[#F59E0B]" />
              ))}
              <span className="ml-2 text-sm font-semibold text-gray-600">{testimonialsLabel}</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <AnimatePresence mode="wait">
              {visibleTestimonials.map((t, i) => (
                <motion.div
                  key={`${activeTestimonial}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <TestimonialCard testimonial={t} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveTestimonial((p) => Math.max(0, p - 1))}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-40"
              disabled={activeTestimonial === 0}
            >
              <ChevronLeft size={14} className="text-gray-600" />
            </button>
            {Array.from({ length: totalTestimonialPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${activeTestimonial === i ? "bg-blue-600 w-6" : "bg-gray-300"}`}
              />
            ))}
            <button
              onClick={() => setActiveTestimonial((p) => Math.min(totalTestimonialPages - 1, p + 1))}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-40"
              disabled={activeTestimonial === totalTestimonialPages - 1}
            >
              <ChevronRight size={14} className="text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* ── TRUSTED PARTNERS ────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="container-xl">
          <motion.p {...fadeIn(0)} className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
            Our Trusted Partners
          </motion.p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="flex gap-6 overflow-hidden">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                className="flex gap-6 w-max"
              >
                {[...activePartners, ...activePartners].map((p, i) => (
                  <div key={i} className="flex-shrink-0 bg-white rounded-xl px-8 py-4 border border-gray-100 shadow-sm flex items-center justify-center min-w-[120px]">
                    <span className="text-sm font-black text-gray-400 tracking-tight">{p.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <motion.div
            {...fadeUp()}
            className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center"
            style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #7c3aed 100%)" }}
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

            <div className="relative z-10">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-4">Get Started Today</p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                {ctaHeadline}
              </h2>
              <p className="text-blue-100 text-base max-w-xl mx-auto mb-10 leading-relaxed">
                {ctaDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={cta1Href}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-gray-900 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #F59E0B, #FBBF24)", boxShadow: "0 8px 30px rgba(245,158,11,0.4)" }}
                >
                  Get Started Today <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm bg-white/10 border border-white/20 transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5"
                >
                  Book a Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
