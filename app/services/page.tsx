"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import {
  Code, Megaphone, Users, GraduationCap, Monitor, Zap, Cloud,
  ShieldCheck, ArrowRight, CheckCircle2, TrendingUp,
  Award, HeartHandshake, Eye, Map, LucideIcon
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ─── CMS content type (matches admin/services editor) ───────── */
type CmsService = {
  name: string;
  slug: string;
  shortDesc: string;
  description: string;
  features: string[];
  isActive: boolean;
};

type ServiceDesign = { icon: LucideIcon; color: string; bgColor: string; accentColor: string; href: string };

const FALLBACK_PALETTE: Omit<ServiceDesign, "href">[] = [
  { icon: Zap,          color: "#2563EB", bgColor: "#EFF6FF", accentColor: "#DBEAFE" },
  { icon: ShieldCheck,  color: "#16A34A", bgColor: "#F0FDF4", accentColor: "#DCFCE7" },
  { icon: Monitor,      color: "#9333EA", bgColor: "#FDF4FF", accentColor: "#F3E8FF" },
  { icon: Cloud,        color: "#EA580C", bgColor: "#FFF7ED", accentColor: "#FFEDD5" },
];

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

/* ── Services Data (design + fallback content until CMS loads) ── */
const mainServices = [
  {
    title: "SaaS Development",
    slug: "saas-development",
    desc: "Custom SaaS products — multi-tenant architecture, subscription billing and admin dashboards built around your workflow.",
    icon: Code,
    features: ["Custom SaaS Development", "White-Label Solutions", "API Development", "Cloud Integration"],
    color: "#2563EB",
    bgColor: "#EFF6FF",
    accentColor: "#DBEAFE",
    href: "/services/saas-development",
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    desc: "SEO, paid ads and content marketing for local and B2B brands that need qualified leads, not just traffic.",
    icon: Megaphone,
    features: ["SEO & SEM", "Social Media Marketing", "Google & Meta Ads", "Content & Growth Marketing"],
    color: "#16A34A",
    bgColor: "#F0FDF4",
    accentColor: "#DCFCE7",
    href: "/services/digital-marketing",
  },
  {
    title: "Business Networking",
    slug: "business-networking",
    desc: "Structured referral networking and community events connecting founders, freelancers and small business owners.",
    icon: Users,
    features: ["Referral Networking", "Founder Communities", "Monthly Networking Events", "Strategic Partnerships"],
    color: "#9333EA",
    bgColor: "#FDF4FF",
    accentColor: "#F3E8FF",
    href: "/networking",
  },
  {
    title: "Mentorship & Training",
    slug: "mentorship-training",
    desc: "1:1 mentorship and workshops for students and early founders on product, technical and career decisions.",
    icon: GraduationCap,
    features: ["Startup Mentorship", "Career Guidance", "Workshops & Bootcamps", "Corporate Training"],
    color: "#EA580C",
    bgColor: "#FFF7ED",
    accentColor: "#FFEDD5",
    href: "/services/mentorship-training",
  },
  {
    title: "Web & Mobile Development",
    slug: "landing-pages",
    desc: "Website redesigns for lead generation, e-commerce storefronts and mobile apps — built and maintained.",
    icon: Monitor,
    features: ["Web Applications", "Mobile Applications", "E-Commerce Solutions", "UI/UX Design"],
    color: "#D97706",
    bgColor: "#FEF3C7",
    accentColor: "#FDE68A",
    href: "/services/landing-pages",
  },
  {
    title: "AI & Automation",
    slug: "ai-automation",
    desc: "AI workflow automation, internal chatbots and process automation that removes manual busywork.",
    icon: Zap,
    features: ["AI Chatbots", "Workflow Automation", "Business Intelligence", "AI Integrations"],
    color: "#E11D48",
    bgColor: "#FFF1F2",
    accentColor: "#FFE4E6",
    href: "/services/ai-automation",
  },
  {
    title: "Cloud Development",
    slug: "cloud-development",
    desc: "Cloud migration, CI/CD pipelines and infrastructure setup on AWS or similar platforms.",
    icon: Cloud,
    features: ["Cloud Migration", "DevOps Automation", "CI/CD Pipelines", "Monitoring & Security"],
    color: "#0D9488",
    bgColor: "#F0FDFA",
    accentColor: "#CCFBF1",
    href: "/services/cloud-development",
  },
  {
    title: "IT Consulting",
    slug: "it-consulting",
    desc: "Technical audits, architecture reviews and roadmap planning before you commit budget to a build.",
    icon: ShieldCheck,
    features: ["IT Strategy & Roadmap", "Technology Consulting", "Security & Compliance", "System Architecture"],
    color: "#4F46E5",
    bgColor: "#EEF2F6",
    accentColor: "#E0E7FF",
    href: "/services/it-consulting",
  },
];

const approachSteps = [
  { step: "01", title: "Discover", desc: "We understand your business, challenges and goals.", icon: Eye, color: "#2563EB" },
  { step: "02", title: "Plan", desc: "We create a strategic plan tailored to your needs.", icon: Map, color: "#EA580C" },
  { step: "03", title: "Build", desc: "Our expert team builds powerful solutions with precision.", icon: Code, color: "#16A34A" },
  { step: "04", title: "Launch", desc: "We deliver and launch your solution for real-world impact.", icon: Zap, color: "#E11D48" },
  { step: "05", title: "Grow", desc: "We provide ongoing support to help you scale.", icon: TrendingUp, color: "#9333EA" },
];

/* Design (icon/color/href) keyed by slug — admin only manages text content */
const SERVICE_DESIGN: Record<string, ServiceDesign> = Object.fromEntries(
  mainServices.map((s) => [s.slug, { icon: s.icon, color: s.color, bgColor: s.bgColor, accentColor: s.accentColor, href: s.href }])
);

const DEFAULT_SERVICES: CmsService[] = mainServices.map((s) => ({
  name: s.title,
  slug: s.slug,
  shortDesc: s.desc,
  description: s.desc,
  features: s.features,
  isActive: true,
}));

function mergeServices(cms: CmsService[] | null) {
  const source = cms && cms.length > 0 ? cms : DEFAULT_SERVICES;
  return source
    .filter((s) => s.isActive)
    .map((s, i) => {
      const design = SERVICE_DESIGN[s.slug] ?? { ...FALLBACK_PALETTE[i % FALLBACK_PALETTE.length], href: `/contact?type=${s.slug}` };
      return {
        title: s.name,
        desc: s.shortDesc || s.description,
        features: s.features,
        ...design,
      };
    });
}

export default function ServicesPage() {
  const [cmsServices, setCmsServices] = useState<CmsService[] | null>(null);

  useEffect(() => {
    fetch("/api/site-settings?prefix=site.")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        if (data["site.services"]) {
          try { setCmsServices(JSON.parse(data["site.services"])); } catch {}
        }
      })
      .catch(() => {});
  }, []);

  const activeServices = mergeServices(cmsServices);

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
            <div className="max-w-3xl">
              <div>
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
            {activeServices.map((service, i) => (
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
                <div className="flex justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white text-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)" }}
                  >
                    Book a Free Consultation <ArrowRight size={14} />
                  </Link>
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
