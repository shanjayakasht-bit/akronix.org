"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, Rocket, BarChart3, Briefcase, Building2,
  ArrowRight, Shield, Users, GraduationCap, Headphones, Gift,
  ChevronDown, Send, Zap, X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ─── Animations ──────────────────────────────────────────── */
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

/* ─── Data ─────────────────────────────────────────────────── */
const plans = [
  {
    key: "starter",
    name: "Starter",
    desc: "Perfect for students, individuals and early-stage startups.",
    icon: Rocket,
    iconColor: "#10B981",
    iconBg: "#ECFDF5",
    priceMonthly: 999,
    priceAnnual: 799,
    custom: false,
    popular: false,
    ctaLabel: "Get Started",
    href: "/contact?plan=starter",
    sectionLabel: "What's Included",
    features: [
      "1 On 1 Mentorship Session / Month",
      "Basic Digital Marketing Support",
      "Access to Networking Community",
      "Resource Library Access",
      "Email Support",
    ],
    checkColor: "#10B981",
  },
  {
    key: "growth",
    name: "Growth",
    desc: "Designed for growing businesses seeking more reach and results.",
    icon: BarChart3,
    iconColor: "#F59E0B",
    iconBg: "#FFFBEB",
    priceMonthly: 2499,
    priceAnnual: 1999,
    custom: false,
    popular: true,
    ctaLabel: "Get Started",
    href: "/contact?plan=growth",
    sectionLabel: "Everything in Starter, plus",
    features: [
      "Advanced Digital Marketing",
      "Priority Networking Access",
      "Monthly Networking Events",
      "Business Consultation (2/Month)",
      "Project Discounts",
      "Priority Email & Chat Support",
    ],
    checkColor: "#F59E0B",
  },
  {
    key: "business",
    name: "Business",
    desc: "For established businesses looking to scale operations.",
    icon: Briefcase,
    iconColor: "#8B5CF6",
    iconBg: "#F5F3FF",
    priceMonthly: 4999,
    priceAnnual: 3999,
    custom: false,
    popular: false,
    ctaLabel: "Get Started",
    href: "/contact?plan=business",
    sectionLabel: "Everything in Growth, plus",
    features: [
      "Custom SaaS / Software Discounts",
      "Dedicated Account Manager",
      "Advanced Analytics & Reporting",
      "More Exposure in Network",
      "Quarterly Business Review",
      "Priority Support (24/7)",
    ],
    checkColor: "#8B5CF6",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    desc: "Tailored solutions for large organizations and enterprises.",
    icon: Building2,
    iconColor: "#2563EB",
    iconBg: "#EFF6FF",
    priceMonthly: 0,
    priceAnnual: 0,
    custom: true,
    popular: false,
    ctaLabel: "Contact Sales",
    href: "/contact?plan=enterprise",
    sectionLabel: "Everything in Business, plus",
    features: [
      "Custom Solutions & Integrations",
      "Dedicated Team",
      "On-site / Virtual Workshops",
      "SLA & Priority Infrastructure",
      "Advanced Security & Compliance",
      "24/7 Dedicated Support",
    ],
    checkColor: "#2563EB",
  },
];

const perks = [
  { icon: Shield,       title: "Trusted & Secure",    desc: "Enterprise-grade security for your data." },
  { icon: Users,        title: "Networking Access",   desc: "Connect with entrepreneurs, founders & professionals." },
  { icon: GraduationCap,title: "Academy Access",      desc: "Access to resources, workshops & webinars." },
  { icon: Headphones,   title: "Expert Support",      desc: "We're here to help you succeed, always." },
  { icon: Gift,         title: "Exclusive Perks",     desc: "Special discounts and partner offers." },
];

const customFeatures = [
  ["Custom SaaS Development", "Private Networking Events"],
  ["Dedicated Marketing Team", "Individual Mentorship Programs"],
  ["Training & Workshops", "And Much More"],
];

const faqs = [
  { q: "Can I upgrade or downgrade my plan anytime?",    a: "Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the start of your next billing cycle." },
  { q: "What payment methods do you accept?",           a: "We accept all major credit/debit cards, UPI, net banking, and bank transfers for annual plans." },
  { q: "Do you offer refunds?",                         a: "We offer a 7-day money-back guarantee for monthly plans. Annual plan refunds are evaluated on a case-by-case basis." },
  { q: "Are there any long-term contracts?",            a: "No long-term contracts for monthly plans. Annual plans are prepaid for 12 months with a significant discount." },
  { q: "Is there a setup fee?",                         a: "No setup fees on any plan. You only pay what's listed — no surprises, ever." },
  { q: "Can I get a custom plan for my organization?",  a: "Absolutely! Reach out to our team and we'll design a package that perfectly fits your organization's unique needs." },
];

/* ─── FAQ Item ─────────────────────────────────────────────── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      {...fadeUp(index * 0.05)}
      className="border border-gray-100 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-800 pr-4">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <Navigation />
      <main className="bg-white text-gray-900 overflow-x-hidden">

        {/* ════════════ HERO ════════════ */}
        <section className="relative pt-28 pb-16 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 -left-40 w-[500px] h-[400px] bg-yellow-50/60 rounded-full blur-[80px] pointer-events-none" />

          <div className="container-xl relative z-10 grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-600 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full mb-7">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Pricing Plans
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[2.8rem] md:text-[3.4rem] font-black leading-[1.1] tracking-tight text-gray-900 mb-5"
              >
                Flexible Plans for<br />Every Stage of{" "}
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
                  Growth
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-500 text-base leading-relaxed mb-9 max-w-[440px]"
              >
                Choose the perfect plan that fits your business needs.<br />Upgrade anytime as you grow.
              </motion.p>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-5"
              >
                {[
                  { icon: Shield,     title: "No Hidden Fees",  sub: "Transparent pricing always." },
                  { icon: X,          title: "Cancel Anytime",  sub: "No long-term commitment." },
                  { icon: Headphones, title: "24/7 Support",    sub: "We're here when you need us." },
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
                      <p className="text-[11px] text-gray-400">{sub}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right — illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:flex justify-center items-center"
            >
              <div className="relative w-[420px] h-[340px]">
                {/* Main dashboard card */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-0 w-[280px] bg-white rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-gray-100 p-5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
                      <BarChart3 size={12} className="text-amber-500" />
                    </div>
                    <span className="text-xs font-bold text-gray-700">Business Analytics</span>
                  </div>
                  <div className="space-y-2 mb-3">
                    {[80, 60, 90, 45].map((w, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-2 rounded-full flex-1 bg-gray-100">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${w}%` }}
                            transition={{ duration: 1.2, delay: 0.5 + i * 0.1 }}
                            className="h-full rounded-full"
                            style={{ background: i === 0 ? "#F59E0B" : i === 1 ? "#10B981" : i === 2 ? "#8B5CF6" : "#2563EB" }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-400 w-6">{w}%</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400">Growth metrics — last 30 days</p>
                </motion.div>

                {/* Floating small cards */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="absolute top-0 left-0 bg-white rounded-2xl shadow-lg border border-gray-100 p-3.5 w-[130px]"
                >
                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center mb-2">
                    <div className="w-5 h-5 rounded-md bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                      <Zap size={10} className="text-white" />
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-gray-800">Startup Kit</p>
                  <p className="text-[9px] text-gray-400">3D Tools & More</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute bottom-10 left-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-3.5 w-[130px]"
                >
                  <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center mb-2">
                    <BarChart3 size={14} className="text-green-500" />
                  </div>
                  <p className="text-[10px] font-bold text-green-700">↑ 42% Growth</p>
                  <p className="text-[9px] text-gray-400">This quarter</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-0 right-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Users size={12} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-800">1,250+</p>
                    <p className="text-[9px] text-gray-400">Members</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════ BILLING TOGGLE ════════════ */}
        <div className="flex items-center justify-center gap-4 pb-10">
          <span className={`text-sm font-semibold ${!annual ? "text-gray-900" : "text-gray-400"}`}>Monthly Billing</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="relative w-12 h-6 rounded-full transition-colors duration-300"
            style={{ background: annual ? "linear-gradient(135deg,#F59E0B,#EA580C)" : "#E5E7EB" }}
          >
            <motion.div
              animate={{ x: annual ? 24 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
            />
          </button>
          <span className={`text-sm font-semibold ${annual ? "text-gray-900" : "text-gray-400"}`}>
            Annual Billing
            <span className="ml-2 text-[11px] font-black text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
              Save up to 20%
            </span>
          </span>
        </div>

        {/* ════════════ PLAN CARDS ════════════ */}
        <section className="pb-20">
          <div className="container-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.key}
                  {...fadeUp(i * 0.1, 36)}
                  whileHover={!plan.popular ? { y: -6, boxShadow: "0 20px 48px rgba(0,0,0,0.09)" } : { y: -6 }}
                  className={`relative flex flex-col rounded-3xl border overflow-hidden transition-all duration-300 ${
                    plan.popular
                      ? "border-amber-300 shadow-[0_20px_56px_rgba(245,158,11,0.2)]"
                      : "border-gray-200 bg-white shadow-sm"
                  }`}
                  style={plan.popular ? { background: "linear-gradient(180deg,#fff 0%,#FFFBEB 100%)" } : {}}
                >
                  {plan.popular && (
                    <>
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-3xl border-2 border-amber-300/50 pointer-events-none"
                      />
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0 text-[10px] font-black uppercase tracking-widest text-white px-4 py-1.5 rounded-b-xl z-10"
                        style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)" }}>
                        Most Popular
                      </div>
                    </>
                  )}

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Icon + name */}
                    <div className="flex items-center gap-3 mb-4 mt-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: plan.iconBg }}>
                        <plan.icon size={20} style={{ color: plan.iconColor }} />
                      </div>
                      <p className="text-lg font-black" style={{ color: plan.iconColor }}>{plan.name}</p>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed mb-5">{plan.desc}</p>

                    {/* Price */}
                    <div className="mb-2">
                      {plan.custom ? (
                        <div>
                          <p className="text-2xl font-black text-gray-900">Custom Pricing</p>
                          <p className="text-xs text-gray-400 mt-1">Let&apos;s build something great together.</p>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-gray-900">
                            ₹{(annual ? plan.priceAnnual : plan.priceMonthly).toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">/ month</span>
                        </div>
                      )}
                      {!plan.custom && (
                        <p className="text-[11px] text-gray-400 mt-0.5">Billed {annual ? "annually" : "monthly"}</p>
                      )}
                    </div>

                    {/* CTA */}
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mb-6">
                      <Link
                        href={plan.href}
                        className={`w-full block py-3 text-sm font-bold rounded-xl text-center transition-all duration-200 relative overflow-hidden group ${
                          plan.popular
                            ? "text-white"
                            : "border-2 text-gray-800 hover:opacity-90"
                        }`}
                        style={
                          plan.popular
                            ? { background: "linear-gradient(135deg,#F59E0B,#EA580C)", boxShadow: "0 4px 14px rgba(245,158,11,0.35)" }
                            : { borderColor: plan.iconColor, color: plan.iconColor }
                        }
                      >
                        {plan.popular && (
                          <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                        )}
                        <span className="relative z-10">{plan.ctaLabel}</span>
                      </Link>
                    </motion.div>

                    {/* Features */}
                    <p className="text-[11px] font-black uppercase tracking-wider text-gray-500 mb-3">{plan.sectionLabel}</p>
                    <ul className="space-y-2.5 flex-1">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-start gap-2.5 text-xs text-gray-600">
                          <Check size={12} className="mt-0.5 flex-shrink-0" style={{ color: plan.checkColor }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ WHAT EVERY PLAN INCLUDES ════════════ */}
        <section className="py-16 bg-gray-50 border-t border-b border-gray-100">
          <div className="container-xl">
            <motion.h2 {...fadeUp(0)} className="text-2xl font-black text-center text-gray-900 mb-10">
              What Every Plan Includes
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {perks.map((p, i) => (
                <motion.div
                  key={p.title}
                  {...fadeUp(i * 0.08)}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center text-center gap-3 cursor-default"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                    <p.icon size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 mb-1">{p.title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ CUSTOM SOLUTION (DARK) ════════════ */}
        <section className="py-0">
          <div className="container-xl py-0">
            <motion.div
              {...fadeUp(0)}
              className="relative rounded-3xl overflow-hidden"
              style={{ background: "linear-gradient(135deg,#111827 0%,#1e2d3d 100%)" }}
            >
              {/* BG pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #F59E0B 0%, transparent 50%)" }} />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(37,99,235,0.15),transparent_60%)] pointer-events-none" />

              <div className="relative z-10 grid lg:grid-cols-2 gap-10 p-10 md:p-14">
                {/* Left */}
                <motion.div {...fadeLeft(0.1)}>
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4">
                    Need a Custom Solution for<br />Your Organization?
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-7 max-w-md">
                    We offer tailored packages and enterprise solutions that fit your unique business needs.
                  </p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {customFeatures.map(([a, b], i) => (
                      <div key={i} className="contents">
                        <div className="flex items-center gap-2 text-sm text-white/80">
                          <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                            <Check size={9} className="text-white" />
                          </div>
                          {a}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/80">
                          <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                            <Check size={9} className="text-white" />
                          </div>
                          {b}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right — card */}
                <motion.div {...fadeRight(0.15)} className="flex items-center justify-center lg:justify-end">
                  <div className="bg-white rounded-3xl p-8 max-w-[300px] w-full shadow-2xl">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)" }}>
                      <Headphones size={22} className="text-white" />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">Talk to Our Experts</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                      Let&apos;s understand your requirements and build the perfect solution.
                    </p>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        href="/contact"
                        className="relative w-full flex items-center justify-center gap-2 text-sm font-bold text-white py-3 rounded-xl overflow-hidden group"
                        style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)", boxShadow: "0 4px 14px rgba(245,158,11,0.35)" }}
                      >
                        <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                        Book a Free Consultation
                        <ArrowRight size={14} />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════ FAQ ════════════ */}
        <section className="py-24">
          <div className="container-xl">
            <motion.h2 {...fadeUp(0)} className="text-3xl font-black text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {faqs.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════ FINAL CTA ════════════ */}
        <section className="py-20 bg-amber-50 border-t border-amber-100">
          <div className="container-xl flex flex-col md:flex-row items-center gap-10 justify-between">
            <motion.div {...fadeLeft(0)} className="flex items-center gap-5">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)" }}
              >
                <Send size={26} className="text-white" />
              </motion.div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">Ready to Grow with Akronix?</h2>
                <p className="text-gray-500 text-sm max-w-md">
                  Join thousands of businesses and professionals building, connecting and scaling together.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeRight(0.1)} className="flex items-center gap-4 flex-shrink-0 flex-wrap">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact?plan=growth"
                  className="relative inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-full overflow-hidden group"
                  style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)", boxShadow: "0 6px 20px rgba(245,158,11,0.38)" }}
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  Get Started Today
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-800 border-2 border-gray-300 px-7 py-3.5 rounded-full hover:border-gray-500 transition-colors"
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
