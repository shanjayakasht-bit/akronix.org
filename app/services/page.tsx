"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import {
  Code, Megaphone, Users, GraduationCap, Monitor, Zap, Cloud,
  ShieldAlert, ShieldCheck, ArrowRight, Play, CheckCircle2, TrendingUp,
  Award, HeartHandshake, Eye, Map, FileText, ClipboardList
} from "lucide-react";
import Link from "next/link";

/* ── Animation Variants ──────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

/* ── Services Data ──────────────────────────────────────────── */
const mainServices = [
  {
    title: "SaaS Development",
    desc: "Scalable, secure and future-ready SaaS solutions tailored to your business.",
    icon: Code,
    features: ["Custom SaaS Development", "White-Label Solutions", "API Development", "Cloud Integration"],
    color: "#2563EB",
    bgColor: "#EFF6FF",
    accentColor: "#DBEAFE",
    href: "/services/saas-development",
  },
  {
    title: "Digital Marketing",
    desc: "Data-driven marketing strategies that increase visibility and generate leads.",
    icon: Megaphone,
    features: ["SEO & SEM", "Social Media Marketing", "Google & Meta Ads", "Content & Growth Marketing"],
    color: "#16A34A",
    bgColor: "#F0FDF4",
    accentColor: "#DCFCE7",
    href: "/services/digital-marketing",
  },
  {
    title: "Business Networking",
    desc: "Build meaningful relationships and unlock new business opportunities.",
    icon: Users,
    features: ["Referral Networking", "Founder Communities", "Monthly Networking Events", "Strategic Partnerships"],
    color: "#9333EA",
    bgColor: "#FDF4FF",
    accentColor: "#F3E8FF",
    href: "/networking",
  },
  {
    title: "Mentorship & Training",
    desc: "Empowering individuals, startups and students to learn, grow and succeed.",
    icon: GraduationCap,
    features: ["Startup Mentorship", "Career Guidance", "Workshops & Bootcamps", "Corporate Training"],
    color: "#EA580C",
    bgColor: "#FFF7ED",
    accentColor: "#FFEDD5",
    href: "/contact?type=mentorship",
  },
  {
    title: "Web & Mobile Development",
    desc: "High-performance websites and mobile apps that drive results.",
    icon: Monitor,
    features: ["Web Applications", "Mobile Applications", "E-Commerce Solutions", "UI/UX Design"],
    color: "#D97706",
    bgColor: "#FEF3C7",
    accentColor: "#FDE68A",
    href: "/services/landing-pages",
  },
  {
    title: "AI & Automation",
    desc: "Automate operations and enhance productivity with AI-powered solutions.",
    icon: Zap,
    features: ["AI Chatbots", "Workflow Automation", "Business Intelligence", "AI Integrations"],
    color: "#E11D48",
    bgColor: "#FFF1F2",
    accentColor: "#FFE4E6",
    href: "/services/ai-automation",
  },
  {
    title: "Cloud & DevOps",
    desc: "Reliable cloud infrastructure and DevOps services for performance and scale.",
    icon: Cloud,
    features: ["Cloud Migration", "DevOps Automation", "CI/CD Pipelines", "Monitoring & Security"],
    color: "#0D9488",
    bgColor: "#F0FDFA",
    accentColor: "#CCFBF1",
    href: "/services/saas-development",
  },
  {
    title: "IT Consulting",
    desc: "Strategic technology consulting to help you make the right decisions.",
    icon: ShieldCheck,
    features: ["IT Strategy & Roadmap", "Technology Consulting", "Security & Compliance", "System Architecture"],
    color: "#4F46E5",
    bgColor: "#EEF2F6",
    accentColor: "#E0E7FF",
    href: "/contact",
  },
];

const approachSteps = [
  { step: "01", title: "Discover", desc: "We understand your business, challenges and goals.", icon: Eye, color: "#2563EB" },
  { step: "02", title: "Plan", desc: "We create a strategic plan tailored to your needs.", icon: Map, color: "#EA580C" },
  { step: "03", title: "Build", desc: "Our expert team builds powerful solutions with precision.", icon: Code, color: "#16A34A" },
  { step: "04", title: "Launch", desc: "We deliver and launch your solution for real-world impact.", icon: Zap, color: "#E11D48" },
  { step: "05", title: "Grow", desc: "We provide ongoing support to help you scale.", icon: TrendingUp, color: "#9333EA" },
];

const metrics = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+", label: "Business Partners" },
  { value: "500+", label: "Students Mentored" },
  { value: "100+", label: "Networking Connections" },
  { value: "95%", label: "Client Satisfaction" },
];

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="bg-white text-gray-900 min-h-screen pt-24 pb-20 overflow-clip">
        
        {/* ── HERO SECTION ────────────────────────────────────────── */}
        <section className="relative py-16 px-4 bg-gradient-to-b from-[#F8FAFF] via-white to-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }} />
            <div className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: "linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <div className="container-xl relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Our Services</p>
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[0.95] mb-6">
                  Solutions Designed <br />
                  to Accelerate <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Your Growth</span>
                </h1>
                
                <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl mb-8">
                  At Akronix, we offer end-to-end services that help businesses build powerful products, grow their brand, connect with the right people, and build the future.
                </p>

                {/* Features grid */}
                <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                  {[
                    { title: "Expert Team", desc: "Industry experts delivering high-quality solutions", color: "#2563EB", icon: Award },
                    { title: "Proven Results", desc: "Data-driven strategies that deliver measurable growth", color: "#16A34A", icon: CheckCircle2 },
                    { title: "End-to-End Support", desc: "From planning to execution and beyond", color: "#EA580C", icon: HeartHandshake },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 flex-shrink-0">
                        <item.icon size={16} style={{ color: item.color }} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                        <p className="text-[10px] text-gray-400 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Growth Mockup Card */}
              <div className="lg:col-span-5 hidden lg:block">
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-2xl relative">
                  
                  {/* Chart section */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-gray-400">Growth Overview</h4>
                      <span className="text-xs font-black text-green-500 flex items-center gap-1">
                        <TrendingUp size={12} /> +24.5%
                      </span>
                    </div>
                    {/* Tiny visual curve */}
                    <div className="h-16 flex items-end gap-1.5 pt-2">
                      {[30, 45, 38, 55, 62, 50, 75, 90, 85, 100].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm bg-blue-50 hover:bg-blue-600 transition-colors duration-300" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>

                  {/* Top Services chart representation */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-xs font-bold text-gray-400">Top Services</h4>
                    {[
                      { name: "SaaS Development", pct: 72, color: "#2563EB" },
                      { name: "Digital Marketing", pct: 64, color: "#16A34A" },
                      { name: "Business Networking", pct: 58, color: "#9333EA" },
                      { name: "Mentorship & Training", pct: 48, color: "#EA580C" },
                    ].map((s) => (
                      <div key={s.name} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-gray-700">
                          <span>{s.name}</span>
                          <span>{s.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Activities grid */}
                  <div className="border-t border-gray-50 pt-4 space-y-3">
                    <h4 className="text-xs font-bold text-gray-400">Activities</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { title: "New Leads", val: "1,450", pct: "+18.5%", color: "#9333EA" },
                        { title: "Projects Delivered", val: "320", pct: "+22.1%", color: "#16A34A" },
                        { title: "Client Satisfaction", val: "95%", pct: "+8.3%", color: "#10B981" },
                      ].map((act) => (
                        <div key={act.title} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tight mb-1">{act.title}</p>
                          <p className="text-sm font-black text-gray-900 mb-0.5">{act.val}</p>
                          <p className="text-[8px] font-bold" style={{ color: act.color }}>{act.pct}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating Action CTA Card */}
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100">
                    <div>
                      <p className="text-xs font-black text-gray-900">Let&apos;s Build</p>
                      <p className="text-[10px] text-gray-400">Something Amazing</p>
                    </div>
                    <button
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                      style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)" }}
                      aria-label="Build"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── WHAT WE DO SECTION ──────────────────────────────────── */}
        <section className="container-xl py-20 px-4 bg-white">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">What We Do</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Comprehensive services to help your business build, grow and scale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainServices.map((service, i) => (
              <motion.div
                key={service.title}
                {...fadeUp(i * 0.08)}
                whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.06)" }}
                className="group relative bg-white border border-gray-100 rounded-3xl p-6 shadow-sm transition-all duration-300 flex flex-col cursor-pointer overflow-hidden"
              >
                {/* Background Tint on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: service.bgColor }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors"
                    style={{ backgroundColor: service.accentColor }}
                  >
                    <service.icon size={20} style={{ color: service.color }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-gray-900 mb-2">{service.title}</h3>
                  
                  {/* Desc */}
                  <p className="text-xs text-gray-500 leading-relaxed mb-6 flex-grow">
                    {service.desc}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-xs text-gray-600">
                        <CheckCircle2 size={12} style={{ color: service.color }} className="flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More link */}
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-xs font-bold transition-colors duration-200 mt-auto"
                    style={{ color: service.color }}
                  >
                    Learn More <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── OUR APPROACH SECTION ────────────────────────────────── */}
        <section className="py-24 bg-gray-50 border-y border-gray-100 px-4">
          <div className="container-xl">
            <motion.div {...fadeUp()} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Our Approach</h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">
                A structured and transparent process designed to ensure successful delivery.
              </p>
            </motion.div>

            {/* Approach Steps Timeline */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
              {approachSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  {...fadeUp(i * 0.1)}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative group flex flex-col items-center text-center"
                >
                  {/* Timeline connectors (horizontal on lg screen, ignored on mobile) */}
                  {i < 4 && (
                    <div className="hidden lg:block absolute top-1/2 left-[90%] w-1/3 h-0.5 bg-gray-100 z-0 transform -translate-y-1/2" />
                  )}

                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white mb-4 relative z-10"
                    style={{ background: step.color }}
                  >
                    {step.step}
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 text-gray-400 group-hover:bg-gray-100 transition-colors">
                    <step.icon size={20} style={{ color: step.color }} />
                  </div>

                  <h3 className="text-sm font-black text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Metric counters band */}
            <div className="mt-16 bg-gray-900 text-white rounded-3xl p-8 shadow-xl">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center items-center justify-center">
                {metrics.map((m) => (
                  <div key={m.label} className="space-y-1">
                    <p className="text-3xl font-black text-yellow-400">{m.value}</p>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── CTA BANNER ──────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-white">
          <div className="container-xl">
            <div
              className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #EEF2F6 100%)", border: "1px solid #DBEAFE" }}
            >
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                  Partner with Akronix and experience the power of innovative solutions, strategic growth and meaningful connections.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white text-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)" }}
                  >
                    Book a Free Consultation <ArrowRight size={14} />
                  </Link>
                  <button
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-gray-700 text-xs bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Play size={12} className="fill-gray-600 text-gray-600" />
                    Watch Our Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
