"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  GraduationCap, Code2, Rocket, Monitor, Users, Briefcase,
  ArrowRight, Play, Check, Star, ChevronRight, ChevronLeft,
  UserCheck, BookOpen, Award, TrendingUp, Zap, Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ─── CMS content type (matches admin/academy editor) ─────────── */
type AcademySiteContent = {
  hero_line1?: string;
  hero_highlight?: string;
  hero_line2?: string;
  hero_subtext?: string;
  hero_stats?: { value: string; suffix: string; label: string }[];
  programs?: { title: string; desc: string; features: string }[];
  why_headline?: string;
  why_reasons?: { title: string; desc: string }[];
  numbers?: { value: string; suffix: string; label: string }[];
  cta_headline?: string;
  cta_desc?: string;
  testimonials?: { name: string; role: string; img: string; text: string; stars: number }[];
};

/* ─── Animation helpers ───────────────────────────────────────── */
const fadeUp = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});
const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -36 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});
const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 36 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});
const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─── Count-up hook ────────────────────────────────────────────── */
function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = target / (1800 / 16);
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [inView, target]);
  return count;
}

/* ─── CountStat ────────────────────────────────────────────────── */
function CountStat({ value, suffix, label, icon: Icon, delay = 0 }: {
  value: number; suffix: string; label: string; icon: React.ElementType; delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(value, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3 group"
    >
      <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors duration-200">
        <Icon size={18} className="text-amber-500" />
      </div>
      <div>
        <p className="text-xl font-black text-gray-900 leading-none">{count.toLocaleString()}{suffix}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

/* ─── 3-D tilt card ────────────────────────────────────────────── */
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
  function onLeave() { x.set(0); y.set(0); }
  return (
    <motion.div
      ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 800 }}
      className={className}
    >{children}</motion.div>
  );
}

/* ─── Partner logo components ──────────────────────────────────── */
function LogoSRM() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-blue-700 flex-shrink-0">
        <span className="text-[9px] font-black text-blue-700 leading-none">SRM</span>
      </div>
      <div className="leading-tight">
        <p className="text-[11px] font-black text-blue-800 tracking-tight">SRM</p>
        <p className="text-[8px] text-blue-600 font-semibold uppercase tracking-wider">University</p>
      </div>
    </div>
  );
}
function LogoVIT() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-sm flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg,#1e3a8a,#1d4ed8)" }}>
        <span className="text-[10px] font-black text-white">VIT</span>
      </div>
      <div className="leading-tight">
        <p className="text-[11px] font-black text-blue-900 tracking-tight">VIT</p>
        <p className="text-[8px] text-blue-500 font-semibold">University</p>
      </div>
    </div>
  );
}
function LogoGoogle() {
  return (
    <div className="flex items-center gap-2">
      {/* Coloured G */}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M27.6 14.32c0-.96-.08-1.89-.24-2.77H14v5.24h7.62a6.5 6.5 0 01-2.83 4.27v3.55h4.58c2.68-2.47 4.23-6.1 4.23-10.29z" fill="#4285F4"/>
        <path d="M14 28c3.83 0 7.04-1.27 9.38-3.43l-4.58-3.55c-1.27.85-2.89 1.36-4.8 1.36-3.69 0-6.82-2.49-7.93-5.84H1.4v3.67A14 14 0 0014 28z" fill="#34A853"/>
        <path d="M6.07 16.54A8.4 8.4 0 015.64 14c0-.88.15-1.73.43-2.54V7.79H1.4A14 14 0 000 14c0 2.26.54 4.4 1.4 6.21l4.67-3.67z" fill="#FBBC05"/>
        <path d="M14 5.58c2.08 0 3.94.71 5.41 2.12l4.05-4.05C21.03 1.4 17.82 0 14 0A14 14 0 001.4 7.79l4.67 3.67C7.18 8.07 10.31 5.58 14 5.58z" fill="#EA4335"/>
      </svg>
      <div className="leading-tight">
        <p className="text-[11px] font-bold text-gray-800">Google</p>
        <p className="text-[8px] text-gray-500 font-medium">for Developers</p>
      </div>
    </div>
  );
}
function LogoAWS() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-shrink-0">
        <svg width="36" height="22" viewBox="0 0 54 32" fill="none">
          <path d="M15.3 11.6c0 .7.1 1.2.2 1.6.2.4.4.8.8 1.2.1.1.2.3.2.4 0 .2-.1.3-.4.5l-1.3.9c-.2.1-.3.2-.5.2-.2 0-.3-.1-.5-.2-.2-.2-.4-.5-.6-.7-.2-.3-.4-.6-.6-.9-1.5 1.8-3.4 2.7-5.7 2.7-1.6 0-2.9-.5-3.8-1.4-.9-.9-1.4-2.2-1.4-3.7 0-1.6.6-3 1.7-4 1.1-1 2.6-1.5 4.5-1.5.6 0 1.2.1 1.9.2.7.1 1.4.3 2.1.5V6c0-1.4-.3-2.4-.9-3-.6-.6-1.6-.9-3-.9-.6 0-1.3.1-2 .3-.7.2-1.3.4-2 .7-.3.1-.5.2-.6.2h-.2c-.2 0-.3-.2-.3-.5V1.9c0-.3 0-.4.1-.5.1-.1.3-.2.5-.3.7-.4 1.5-.6 2.5-.9C7 0 8.1 0 9.2 0c2.3 0 4 .5 5.1 1.6 1.1 1 1.6 2.6 1.6 4.7v6.3h-.6zm-7.9 3c.6 0 1.2-.1 1.9-.4.7-.3 1.3-.7 1.8-1.3.3-.4.5-.8.6-1.2.1-.4.2-1 .2-1.6v-.8c-.5-.1-1.1-.2-1.6-.3-.5-.1-1.1-.1-1.6-.1-1.1 0-2 .2-2.5.7-.6.5-.9 1.1-.9 2 0 .8.2 1.4.6 1.8.4.3 1 .5 1.5.5v-.3zM22.5 17c-.3 0-.5 0-.6-.1-.1-.1-.3-.3-.4-.6l-4.3-14.2c-.1-.3-.2-.5-.2-.7 0-.3.1-.4.4-.4h1.7c.3 0 .5 0 .6.1.1.1.3.3.4.6l3.1 12.1 2.8-12.1c.1-.3.2-.5.4-.6.1-.1.4-.1.6-.1h1.4c.3 0 .5 0 .7.1.1.1.3.3.3.6l2.9 12.2 3.1-12.2c.1-.3.2-.5.4-.6.1-.1.4-.1.6-.1h1.6c.3 0 .4.1.4.4 0 .1 0 .2-.1.4 0 .1-.1.2-.1.4L34.1 16.3c-.1.3-.2.5-.4.6-.1.1-.4.1-.6.1h-1.5c-.3 0-.5 0-.7-.1-.1-.1-.3-.3-.3-.6l-2.8-11.8L25.1 16.3c-.1.3-.2.5-.4.6-.1.1-.4.1-.6.1h-1.6zM40.7 17.3c-1 0-1.9-.1-2.8-.4-.9-.3-1.6-.6-2.1-1-.3-.2-.5-.4-.5-.6v-.9c0-.3.1-.5.4-.5.1 0 .2 0 .4.1l.5.3c.7.4 1.4.6 2.1.8.7.2 1.5.3 2.2.3 1.1 0 2-.2 2.6-.6.6-.4.9-1 .9-1.7 0-.5-.2-.9-.5-1.3-.3-.3-.9-.6-1.8-.9l-2.5-.8c-1.3-.4-2.2-1-2.8-1.8-.6-.8-.9-1.6-.9-2.6 0-.7.2-1.4.5-2 .3-.6.8-1.1 1.3-1.5.6-.4 1.2-.7 1.9-.9.7-.2 1.5-.3 2.3-.3.4 0 .8 0 1.2.1.4.1.8.1 1.1.2.4.1.7.2 1 .3.3.1.6.3.7.4.2.1.4.3.4.4.1.1.1.3.1.5v.9c0 .3-.1.5-.4.5-.2 0-.4-.1-.7-.2-.9-.4-1.9-.6-3-.6-1 0-1.8.2-2.4.5-.6.3-.8.8-.8 1.5 0 .5.2.9.5 1.2.3.3 1 .6 1.9.9l2.4.8c1.3.4 2.2 1 2.7 1.7.5.7.8 1.5.8 2.4 0 .7-.2 1.4-.5 2-.3.6-.8 1.1-1.4 1.6-.6.4-1.2.7-2 1-.8.2-1.7.3-2.6.3z" fill="#FF9900"/>
          <text x="0" y="28" fontSize="8" fill="#FF9900" fontWeight="bold" fontFamily="Arial">educate</text>
        </svg>
      </div>
    </div>
  );
}
function LogoMicrosoft() {
  return (
    <div className="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 21 21" fill="none">
        <rect x="0"  y="0"  width="10" height="10" fill="#F25022"/>
        <rect x="11" y="0"  width="10" height="10" fill="#7FBA00"/>
        <rect x="0"  y="11" width="10" height="10" fill="#00A4EF"/>
        <rect x="11" y="11" width="10" height="10" fill="#FFB900"/>
      </svg>
      <div className="leading-tight">
        <p className="text-[11px] font-semibold text-gray-800">Microsoft</p>
        <p className="text-[9px] font-bold text-blue-600">Learn</p>
      </div>
    </div>
  );
}
function LogoNasscom() {
  return (
    <div className="leading-tight">
      <p className="text-[12px] font-black text-blue-800 tracking-tight">NASSCOM</p>
      <p className="text-[8px] font-bold text-blue-500 tracking-widest uppercase">Foundation</p>
    </div>
  );
}
function LogoICT() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,#6d28d9,#4c1d95)" }}>
        <span className="text-[8px] font-black text-white leading-none">ICT</span>
      </div>
      <div className="leading-tight">
        <p className="text-[10px] font-black text-purple-800">ICT</p>
        <p className="text-[8px] font-bold text-purple-500 uppercase tracking-wide">Academy</p>
      </div>
    </div>
  );
}

const partnerLogos = [
  { id: "srm",       Component: LogoSRM },
  { id: "vit",       Component: LogoVIT },
  { id: "google",    Component: LogoGoogle },
  { id: "aws",       Component: LogoAWS },
  { id: "microsoft", Component: LogoMicrosoft },
  { id: "nasscom",   Component: LogoNasscom },
  { id: "ict",       Component: LogoICT },
];

/* ─── Static design config (icons / colours — not CMS-editable) ── */
const HERO_STAT_ICONS = [Users, BookOpen, Award, Star];
const WHY_REASON_ICONS = [UserCheck, BookOpen, Award, TrendingUp, Zap, Heart];
const NUMBER_ICONS = [Users, BookOpen, Award, UserCheck, Star, GraduationCap];

const PROGRAM_CONFIG = [
  { icon: UserCheck, color: "#10B981", bg: "#ECFDF5", href: "/contact?type=mentorship" },
  { icon: Code2,     color: "#6366F1", bg: "#EEF2FF", href: "/contact?type=projects"   },
  { icon: Rocket,    color: "#8B5CF6", bg: "#F5F3FF", href: "/contact?type=startup"    },
  { icon: Monitor,   color: "#2563EB", bg: "#EFF6FF", href: "/contact?type=courses"    },
  { icon: Users,     color: "#EC4899", bg: "#FDF2F8", href: "/contact?type=workshops"  },
  { icon: Briefcase, color: "#EA580C", bg: "#FFF7ED", href: "/contact?type=internship" },
];

/* ─── Default content (shown until CMS data loads) ────────────── */
const DEFAULT_HERO_STATS = [
  { value: 500, suffix: "+", label: "Students Mentored"   },
  { value: 100, suffix: "+", label: "Projects Guided"     },
  { value: 50,  suffix: "+", label: "Workshops Conducted" },
  { value: 95,  suffix: "%", label: "Student Satisfaction"},
];

const DEFAULT_PROGRAMS = [
  { title: "Mentorship Programs",     desc: "Learn from industry experts and successful founders.",            features: ["Startup Mentorship","Career Mentorship","Personal Branding","1:1 Guidance"] },
  { title: "Academic Projects",       desc: "Guiding students in building real-world academic projects.",     features: ["Mini Projects","Final Year Projects","Research Projects","Project Documentation"] },
  { title: "Startup Incubation",      desc: "From idea to launch — we support your startup journey.",        features: ["Idea Validation","MVP Development","Business Strategy","Fundraising Support"] },
  { title: "Technical Courses",       desc: "Build in-demand technical skills from scratch.",                features: ["Web Development","Data Science & AI","Cloud & DevOps","Cybersecurity"] },
  { title: "Workshops & Bootcamps",   desc: "Hands-on learning through intensive workshops.",                features: ["AI & ML Bootcamps","Hackathons","Coding Workshops","Industry Sessions"] },
  { title: "Internships & Placements",desc: "Gain real-world experience and career opportunities.",          features: ["Industry Internships","Resume Building","Interview Prep","Placement Support"] },
];

const DEFAULT_WHY_REASONS = [
  { title: "Industry Experts",      desc: "Learn from professionals with real-world experience." },
  { title: "Practical Learning",    desc: "Hands-on projects and real-world case studies."       },
  { title: "Personalized Guidance", desc: "1:1 mentorship tailored to your goals."               },
  { title: "Career Growth",         desc: "Build skills that help you get hired."                },
  { title: "Innovation Focus",      desc: "Work on cutting-edge technologies."                   },
  { title: "Supportive Community",  desc: "Collaborate, network and grow together."              },
];

const DEFAULT_TESTIMONIALS = [
  { name: "Karthik M.",  role: "Final Year Student",   img: "/bharath pic.jpeg",  text: "Akronix Academy helped me build my final year project and secure a great placement opportunity.", stars: 5 },
  { name: "Sneha R.",    role: "AI/ML Intern",         img: "/Sarvika pic.jpeg",  text: "The mentorship program gave me clarity and confidence to build my own startup.", stars: 5 },
  { name: "Rohan P.",    role: "Full Stack Developer", img: "/pranav pic.jpeg",   text: "The workshops and bootcamps improved my skills and helped me land my dream job.", stars: 5 },
];

const DEFAULT_BY_NUMBERS = [
  { value: 500, suffix: "+", label: "Students Mentored"    },
  { value: 100, suffix: "+", label: "Projects Guided"      },
  { value: 50,  suffix: "+", label: "Workshops"            },
  { value: 25,  suffix: "+", label: "Industry Experts"     },
  { value: 95,  suffix: "%", label: "Student Satisfaction" },
  { value: 10,  suffix: "+", label: "Partner Institutions" },
];

/* ─── Page ─────────────────────────────────────────────────────── */
export default function AcademyPage() {
  const progRef = useRef<HTMLDivElement>(null);

  /* ── CMS data from admin ───────────────────────────────────── */
  const [cms, setCms] = useState<AcademySiteContent | null>(null);

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=academy.")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["academy.content"]) {
          try { setCms(JSON.parse(data["academy.content"])); } catch {}
        }
      })
      .catch(() => {});
  }, []);

  /* ── Derived content (cms overrides defaults) ──────────────── */
  const heroLine1    = cms?.hero_line1    ?? "Learn. Innovate.";
  const heroHighlight = cms?.hero_highlight ?? "Lead";
  const heroLine2    = cms?.hero_line2    ?? "the Future.";
  const heroSubtext  = cms?.hero_subtext  ??
    "Akronix Academy empowers students, entrepreneurs and professionals with the skills, mentorship and real-world experience to build innovative solutions and successful careers.";
  const whyHeadline  = cms?.why_headline  ?? "Why Join Akronix Academy?";
  const ctaHeadline  = cms?.cta_headline  ?? "Start Your Learning Journey Today";
  const ctaDesc      = cms?.cta_desc      ??
    "Join thousands of learners who are building skills, creating solutions and shaping their future with Akronix Academy.";

  const heroStats = cms?.hero_stats
    ? cms.hero_stats.map((s, i) => ({
        value:  parseInt(s.value)  || DEFAULT_HERO_STATS[i]?.value  || 0,
        suffix: s.suffix           || DEFAULT_HERO_STATS[i]?.suffix || "+",
        label:  s.label            || DEFAULT_HERO_STATS[i]?.label  || "",
        icon:   HERO_STAT_ICONS[i] || Users,
      }))
    : DEFAULT_HERO_STATS.map((s, i) => ({ ...s, icon: HERO_STAT_ICONS[i] }));

  const programs = cms?.programs
    ? cms.programs.map((p, i) => ({
        ...(PROGRAM_CONFIG[i] ?? PROGRAM_CONFIG[0]),
        title:    p.title || DEFAULT_PROGRAMS[i]?.title || "",
        desc:     p.desc  || DEFAULT_PROGRAMS[i]?.desc  || "",
        features: p.features.split(",").map(f => f.trim()).filter(Boolean).length > 0
          ? p.features.split(",").map(f => f.trim()).filter(Boolean)
          : (DEFAULT_PROGRAMS[i]?.features ?? []),
      }))
    : DEFAULT_PROGRAMS.map((p, i) => ({ ...PROGRAM_CONFIG[i], ...p }));

  const whyReasons = cms?.why_reasons
    ? cms.why_reasons.map((r, i) => ({
        icon:  WHY_REASON_ICONS[i] || UserCheck,
        title: r.title || DEFAULT_WHY_REASONS[i]?.title || "",
        desc:  r.desc  || DEFAULT_WHY_REASONS[i]?.desc  || "",
      }))
    : DEFAULT_WHY_REASONS.map((r, i) => ({ ...r, icon: WHY_REASON_ICONS[i] }));

  const byNumbers = cms?.numbers
    ? cms.numbers.map((n, i) => ({
        value:  parseInt(n.value)  || DEFAULT_BY_NUMBERS[i]?.value  || 0,
        suffix: n.suffix           || DEFAULT_BY_NUMBERS[i]?.suffix || "+",
        label:  n.label            || DEFAULT_BY_NUMBERS[i]?.label  || "",
        icon:   NUMBER_ICONS[i]    || Users,
      }))
    : DEFAULT_BY_NUMBERS.map((n, i) => ({ ...n, icon: NUMBER_ICONS[i] }));

  const activeTestimonials = cms?.testimonials ?? DEFAULT_TESTIMONIALS;

  function scrollPrograms(dir: "left" | "right") {
    progRef.current?.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  }

  return (
    <>
      <Navigation />
      <main className="bg-white text-gray-900 overflow-x-hidden">

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative pt-28 pb-20 overflow-hidden">
          {/* Ambient blobs */}
          <div className="absolute -top-32 -right-32 w-[650px] h-[650px] bg-amber-100/60 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 -left-40 w-[500px] h-[400px] bg-yellow-50 rounded-full blur-[80px] pointer-events-none" />
          {/* Dot grid */}
          <div className="absolute top-20 right-10 w-48 h-48 opacity-20 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle,#F59E0B 1px,transparent 1px)", backgroundSize: "16px 16px" }} />

          <div className="container-xl relative z-10 grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-600 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full mb-7">
                  <GraduationCap size={13} className="text-amber-500" />
                  Akronix Academy
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[2.9rem] md:text-[3.5rem] font-black leading-[1.08] tracking-tight text-gray-900 mb-5"
              >
                {heroLine1}{" "}
                <br />
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
                  {heroHighlight}
                </motion.span>{" "}
                {heroLine2}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="text-gray-500 text-[1rem] leading-relaxed mb-9 max-w-[480px]"
              >
                {heroSubtext}
              </motion.p>

              {/* 4 mini stats */}
              <div className="grid grid-cols-4 gap-4 mb-10">
                {heroStats.map(({ value, suffix, label, icon: Ic }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                    className="flex flex-col items-start"
                  >
                    <Ic size={18} className="text-amber-500 mb-1.5" />
                    <p className="text-xl font-black text-gray-900 leading-none">{value}{suffix}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{label}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.44 }}
                className="flex items-center gap-4 flex-wrap"
              >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact?type=academy"
                    className="relative inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-full overflow-hidden group"
                    style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)", boxShadow: "0 6px 20px rgba(245,158,11,0.38)" }}
                  >
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    Explore Programs
                    <ArrowRight size={15} />
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 text-sm font-semibold text-gray-700 group"
                >
                  <span className="w-10 h-10 rounded-full border-2 border-gray-300 group-hover:border-amber-400 flex items-center justify-center transition-all duration-300 group-hover:bg-amber-50">
                    <Play size={12} fill="currentColor" className="text-gray-600 group-hover:text-amber-500 transition-colors ml-0.5" />
                  </span>
                  How It Works
                </motion.button>
              </motion.div>
            </div>

            {/* Right — hero image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.16)]" style={{ aspectRatio: "4/3" }}>
                <Image src="/team.png" alt="Akronix Academy" fill className="object-cover object-top" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.96 }}
                    className="w-11 h-11 rounded-full bg-white/95 flex items-center justify-center shadow-lg cursor-pointer flex-shrink-0"
                  >
                    <Play size={14} fill="#F59E0B" className="ml-0.5" />
                  </motion.div>
                  <div>
                    <p className="text-white text-sm font-bold leading-tight">Shaping innovators, building leaders</p>
                    <p className="text-white/60 text-xs">Watch Academy Overview</p>
                  </div>
                </div>
              </div>
              {/* Dot grid decoration */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-25 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle,#F59E0B 1.5px,transparent 1.5px)", backgroundSize: "12px 12px" }} />
            </motion.div>
          </div>
        </section>

        {/* ════════════════ OUR PROGRAMS ════════════════ */}
        <section className="py-20 border-t border-gray-100">
          <div className="container-xl">
            <motion.div {...fadeUp(0)} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Our Programs</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm">Comprehensive learning and mentorship programs to accelerate your growth.</p>
            </motion.div>

            <div className="relative">
              <div
                ref={progRef}
                className="flex gap-5 overflow-x-auto pb-3"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {programs.map((p, i) => (
                  <TiltCard key={p.title}>
                    <motion.div
                      {...scaleIn(i * 0.07)}
                      whileHover={{ y: -6, boxShadow: `0 20px 48px ${p.color}22` }}
                      className="flex-shrink-0 w-[250px] bg-white border border-gray-100 rounded-2xl p-6 flex flex-col transition-shadow duration-300 h-full"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: p.bg }}>
                        <p.icon size={22} style={{ color: p.color }} />
                      </div>
                      <p className="text-[14px] font-black text-gray-900 mb-1.5">{p.title}</p>
                      <p className="text-xs text-gray-400 leading-relaxed mb-5">{p.desc}</p>
                      <ul className="space-y-2 flex-1 mb-5">
                        {p.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                            <Check size={11} style={{ color: p.color }} className="flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link href={p.href} className="flex items-center gap-1 text-xs font-bold group" style={{ color: p.color }}>
                        Learn More
                        <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </TiltCard>
                ))}
              </div>

              {/* Scroll buttons */}
              <motion.button
                onClick={() => scrollPrograms("left")}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
                className="hidden md:flex absolute -left-5 top-1/2 -translate-y-6 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:border-amber-400 transition-colors z-10"
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button
                onClick={() => scrollPrograms("right")}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
                className="hidden md:flex absolute -right-5 top-1/2 -translate-y-6 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:border-amber-400 transition-colors z-10"
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </div>
        </section>

        {/* ════════════════ WHY JOIN ════════════════ */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-[45%] bg-amber-50/40 pointer-events-none" />
          <div className="container-xl relative z-10 grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <motion.div {...fadeLeft(0)}>
              <h2 className="text-3xl md:text-[2.2rem] font-black text-gray-900 mb-2">{whyHeadline}</h2>
              <div className="w-14 h-1 rounded-full mb-8" style={{ background: "linear-gradient(90deg,#F59E0B,#EA580C)" }} />
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {whyReasons.map((r, i) => (
                  <motion.div
                    key={r.title}
                    {...fadeUp(0.06 + i * 0.07)}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <r.icon size={17} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-gray-800 mb-0.5">{r.title}</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{r.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — illustration */}
            <motion.div {...fadeRight(0.1)} className="flex justify-center">
              <div className="relative w-full max-w-[380px]">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100 shadow-xl relative overflow-visible"
                >
                  {/* Stacked books + cap */}
                  <div className="flex justify-center mb-6">
                    <div className="relative flex flex-col items-center">
                      {/* Cap */}
                      <motion.div
                        animate={{ rotate: [0, 3, -3, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="mb-1 relative"
                      >
                        <div className="w-16 h-3 bg-gray-800 rounded-sm mx-auto relative">
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-800"
                            style={{ clipPath: "polygon(10% 100%,90% 100%,100% 0%,0% 0%)" }} />
                          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-400 rounded-full" />
                          <motion.div
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute -right-3 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-amber-500 origin-top"
                          />
                        </div>
                      </motion.div>
                      {/* Books */}
                      <div className="w-36 h-5 rounded-sm mt-2" style={{ background: "linear-gradient(90deg,#d97706,#f59e0b)" }} />
                      <div className="w-40 h-4 rounded-sm" style={{ background: "linear-gradient(90deg,#0284c7,#38bdf8)" }} />
                      <div className="w-44 h-4 rounded-sm" style={{ background: "linear-gradient(90deg,#16a34a,#4ade80)" }} />
                      <div className="w-48 h-3 rounded-sm" style={{ background: "linear-gradient(90deg,#7c3aed,#a78bfa)" }} />
                    </div>
                  </div>

                  {/* Mini laptop */}
                  <div className="bg-gray-900 rounded-xl p-3 text-center shadow-lg">
                    <div className="bg-gray-800 rounded-lg p-2.5 mb-1.5">
                      <div className="flex gap-1 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full bg-amber-400/60 rounded" />
                        <div className="h-1.5 w-4/5 bg-blue-400/40 rounded" />
                        <div className="h-1.5 w-3/5 bg-green-400/40 rounded" />
                        <div className="h-1.5 w-2/5 bg-purple-400/40 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 py-0.5">
                      <Image src="/logo.jpeg" alt="Akronix" width={16} height={16} className="rounded mix-blend-screen" />
                      <span className="text-white text-[9px] font-black tracking-[0.15em]">AKRONIX ACADEMY</span>
                    </div>
                  </div>

                  {/* Floating badges */}
                  <motion.div
                    animate={{ x: [0, 7, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-3 py-2 border border-amber-100"
                  >
                    <p className="text-[10px] font-bold text-amber-600">AI & ML</p>
                    <p className="text-[8px] text-gray-400">Web Development</p>
                    <p className="text-[8px] text-gray-400">Data Science</p>
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, -6, 0] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-3 py-2 border border-green-100"
                  >
                    <p className="text-[10px] font-bold text-green-600">500+ Graduates</p>
                    <p className="text-[8px] text-gray-400">placed &amp; thriving</p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ STORIES + NUMBERS ════════════════ */}
        <section className="py-24 bg-gray-50">
          <div className="container-xl grid lg:grid-cols-2 gap-16">

            {/* Student Success Stories */}
            <div>
              <div className="flex items-center justify-between mb-7">
                <motion.h3 {...fadeUp(0)} className="text-xl font-black text-gray-900">Student Success Stories</motion.h3>
                <motion.div {...fadeUp(0.08)}>
                  <Link href="/pricing/testimonials" className="text-sm font-semibold text-amber-500 hover:text-amber-600 flex items-center gap-1 group">
                    View All Stories <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              <div className="space-y-4">
                {activeTestimonials.map((t, i) => (
                  <motion.div
                    key={t.name}
                    {...fadeLeft(0.07 + i * 0.09)}
                    whileHover={{ x: 5, boxShadow: "0 8px 28px rgba(245,158,11,0.1)" }}
                    className="bg-white rounded-2xl p-5 border border-gray-100 transition-all duration-200 cursor-default"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-amber-100">
                        <Image src={t.img} alt={t.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900">{t.name}</p>
                        <p className="text-xs text-gray-400">{t.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <Star key={j} size={12} fill="#F59E0B" className="text-amber-400" />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* By The Numbers */}
            <div>
              <div className="flex items-center justify-between mb-7">
                <motion.h3 {...fadeUp(0)} className="text-xl font-black text-gray-900">By The Numbers</motion.h3>
                <motion.div {...fadeUp(0.08)}>
                  <Link href="/contact?type=academy" className="text-sm font-semibold text-amber-500 hover:text-amber-600 flex items-center gap-1 group">
                    View All Stats <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 grid grid-cols-2 gap-8">
                {byNumbers.map((s, i) => (
                  <CountStat key={s.label} {...s} delay={i * 0.08} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ PARTNER LOGOS — infinite marquee ════════════════ */}
        <section className="py-12 border-t border-b border-gray-100 bg-white overflow-hidden">
          <style>{`
            @keyframes marquee-slide {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-track {
              display: flex;
              width: max-content;
              animation: marquee-slide 22s linear infinite;
            }
            .marquee-track:hover { animation-play-state: paused; }
          `}</style>

          <div className="relative overflow-hidden">
            <div className="marquee-track">
              {/* Render logos twice for seamless loop */}
              {[...partnerLogos, ...partnerLogos].map(({ id, Component }, i) => (
                <motion.div
                  key={`${id}-${i}`}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="flex-shrink-0 mx-5 px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-amber-50 hover:border-amber-200 transition-colors cursor-default shadow-sm"
                >
                  <Component />
                </motion.div>
              ))}
              {/* "and more" pill */}
              <div className="flex-shrink-0 mx-5 px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 flex items-center gap-1.5 text-sm text-gray-400 font-medium whitespace-nowrap">
                and more <ChevronRight size={13} />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ CTA ════════════════ */}
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
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)" }}
                >
                  <GraduationCap size={26} className="text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">{ctaHeadline}</h2>
                  <p className="text-gray-400 leading-relaxed max-w-lg">
                    {ctaDesc}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeRight(0.1)} className="flex items-center gap-4 flex-wrap flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact?type=academy"
                  className="relative inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-full overflow-hidden group"
                  style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)", boxShadow: "0 6px 20px rgba(245,158,11,0.4)" }}
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  Join the Academy
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white border-2 border-white/20 px-7 py-3.5 rounded-full hover:border-white/50 transition-colors"
                >
                  Book a Free Consultation
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
