"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

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

function parseValue(raw: string): { num: number; suffix: string } | null {
  const m = raw.match(/^([\d.]+)(.*)$/);
  if (!m) return null;
  return { num: parseFloat(m[1]), suffix: m[2] };
}

function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const parsed = parseValue(value);
  const count = useCountUp(parsed?.num ?? 0, inView && !!parsed);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <p className="text-3xl font-black text-white leading-none mb-1">
        {parsed ? `${Number.isInteger(parsed.num) ? count : count.toFixed(1)}${parsed.suffix}` : value}
      </p>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
    </motion.div>
  );
}

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
    x.set(((e.clientX - cx) / rect.width) * 10);
    y.set(-((e.clientY - cy) / rect.height) * 10);
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

/* ── Types ────────────────────────────────────────────────────── */
export interface ServicePageProps {
  badge: string;
  titlePre: string;
  titleHighlight: string;
  titlePost?: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt: string;
  featureBadges: { icon: LucideIcon; label: string; sub: string }[];
  floatingStats: { icon: LucideIcon; value: string; label: string }[];
  color: string;
  colorDark: string;
  colorSoft: string;
  colorBorder: string;
  offeringsLabel?: string;
  offerings: { icon: LucideIcon; title: string; desc: string }[];
  stepsLabel?: string;
  steps: { title: string; desc: string }[];
  featuresLabel?: string;
  featuresTitlePre: string;
  featuresTitleHighlight: string;
  featuresTitlePost?: string;
  featuresIntro: string;
  features: { title: string; desc: string }[];
  stats: { value: string; label: string }[];
  ctaTitlePre: string;
  ctaTitleHighlight: string;
  ctaHref: string;
  ctaLabel: string;
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function ServicePageTemplate(p: ServicePageProps) {
  const [hoverStep, setHoverStep] = useState<number | null>(null);
  const gradient = `linear-gradient(135deg,${p.color},${p.colorDark})`;
  const gradientText = { background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } as const;

  return (
    <main className="bg-white text-gray-900 overflow-x-hidden">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative pt-28 pb-24 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-[120px] opacity-40 pointer-events-none" style={{ background: p.colorSoft }} />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full blur-[100px] opacity-50 pointer-events-none" style={{ background: p.colorSoft }} />

        <div className="container-xl relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span
                className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full mb-7"
                style={{ color: p.colorDark, background: p.colorSoft, border: `1px solid ${p.colorBorder}` }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: p.color }} />
                {p.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[2.6rem] md:text-[3.2rem] font-black leading-[1.08] tracking-tight text-gray-900 mb-5"
            >
              {p.titlePre}{" "}
              <span style={gradientText}>{p.titleHighlight}</span>
              {p.titlePost ? <>{" "}{p.titlePost}</> : null}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-500 text-[1.05rem] leading-relaxed mb-9 max-w-[480px]"
            >
              {p.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {p.featureBadges.map(({ icon: Ic, label, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="flex items-start gap-2.5 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 cursor-default"
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: p.colorSoft }}>
                    <Ic size={13} style={{ color: p.colorDark }} />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-gray-800">{label}</p>
                    <p className="text-[11px] text-gray-400 leading-snug">{sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-5 flex-wrap"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={p.ctaHref}
                  className="relative inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-full overflow-hidden group"
                  style={{ background: gradient, boxShadow: `0 6px 20px ${p.color}55` }}
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  {p.ctaLabel}
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              <motion.a
                href="#offerings"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors group"
              >
                <span className="w-10 h-10 rounded-full border-2 border-gray-300 group-hover:bg-gray-50 flex items-center justify-center transition-all duration-300" style={{ borderColor: undefined }}>
                  <Play size={13} fill="currentColor" className="text-gray-600 ml-0.5" />
                </span>
                See What We Offer
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_32px_80px_rgba(0,0,0,0.18)]">
              <Image src={p.heroImage} alt={p.heroImageAlt} fill className="object-cover" priority />
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg,${p.colorDark}33,transparent,rgba(17,24,39,0.4))` }} />
            </div>

            {p.floatingStats.map(({ icon: Ic, value, label }, i) => {
              const positions = [
                { top: "-16px", right: "-16px" },
                { top: "-16px", right: "148px" },
                { bottom: "-16px", left: "16px" },
                { bottom: "-16px", right: "16px" },
              ];
              const pos = positions[i % positions.length];
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1, type: "spring", bounce: 0.4 }}
                  whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.16)" }}
                  className="absolute bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100"
                  style={pos}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: p.colorSoft }}>
                    <Ic size={16} style={{ color: p.colorDark }} />
                  </div>
                  <div>
                    <p className="text-[17px] font-black text-gray-900 leading-none">{value}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ WHAT WE OFFER ═══════════════════ */}
      <section id="offerings" className="py-20 bg-gray-50 relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 30% 50%, ${p.color}0A, transparent 60%)` }} />
        <div className="container-xl relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <p className="text-xs font-black uppercase tracking-[0.2em] mb-3" style={{ color: p.colorDark }}>{p.offeringsLabel ?? "What We Offer"}</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Everything You Need to <span style={gradientText}>Succeed</span>
            </h2>
            <div className="w-14 h-1 rounded-full mx-auto mt-4" style={{ background: gradient }} />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.offerings.map((o, i) => (
              <motion.div
                key={o.title}
                {...fadeUp(i * 0.08)}
                whileHover={{ y: -6, boxShadow: `0 16px 40px ${p.color}1A` }}
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: p.colorSoft }}>
                  <o.icon size={20} style={{ color: p.colorDark }} />
                </div>
                <h3 className="text-base font-black text-gray-900 mb-2">{o.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="container-xl relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              {p.stepsLabel ?? "How It"} <span style={gradientText}>Works</span>
            </h2>
            <div className="w-14 h-1 rounded-full mx-auto mt-4" style={{ background: gradient }} />
          </motion.div>

          <div className="relative flex flex-col md:flex-row items-start gap-0">
            <div className="hidden md:block absolute top-7 left-[12%] right-[12%] h-[2px] z-0" style={{ background: p.colorSoft }}>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                className="h-full origin-left rounded-full"
                style={{ background: gradient }}
              />
            </div>

            {p.steps.map((step, i) => (
              <motion.div
                key={step.title}
                {...fadeUp(0.1 + i * 0.1)}
                onMouseEnter={() => setHoverStep(i)}
                onMouseLeave={() => setHoverStep(null)}
                className="relative flex-1 flex flex-col items-center text-center px-3 group cursor-default"
              >
                <motion.div
                  animate={{ scale: hoverStep === i ? 1.18 : 1, backgroundColor: hoverStep === i ? p.color : "#fff" }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="w-14 h-14 rounded-full border-2 bg-white flex items-center justify-center mb-5 relative z-10 shadow-md font-black text-sm"
                  style={{ borderColor: p.colorBorder, color: hoverStep === i ? "#fff" : p.colorDark }}
                >
                  {i + 1}
                </motion.div>
                <p className="text-sm font-black mb-1.5" style={{ color: hoverStep === i ? p.colorDark : "#111827" }}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed max-w-[170px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CORE CAPABILITIES ═══════════════════ */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[500px] h-full pointer-events-none" style={{ background: `linear-gradient(to left, ${p.colorSoft}, transparent)` }} />
        <div className="container-xl relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeLeft(0)}>
            <p className="text-xs font-black uppercase tracking-[0.2em] mb-3" style={{ color: p.colorDark }}>{p.featuresLabel ?? "Core Capabilities"}</p>
            <h2 className="text-4xl md:text-[2.6rem] font-black leading-tight text-gray-900 mb-5">
              {p.featuresTitlePre}
              <br />
              <span style={gradientText}>{p.featuresTitleHighlight}</span>{p.featuresTitlePost ? <>{" "}{p.featuresTitlePost}</> : null}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-9 max-w-[400px]">{p.featuresIntro}</p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href={p.ctaHref} className="inline-flex items-center gap-2 text-sm font-black text-white bg-gray-900 px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
                {p.ctaLabel}
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            {p.features.map((f, i) => (
              <TiltCard key={f.title}>
                <motion.div
                  {...scaleIn(0.05 + i * 0.07)}
                  whileHover={{ y: -5, boxShadow: `0 16px 40px ${p.color}18` }}
                  className="flex items-start gap-3.5 p-5 rounded-2xl border border-gray-100 bg-white transition-shadow cursor-default"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: p.colorSoft }}>
                    <CheckCircle2 size={18} style={{ color: p.colorDark }} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-800 mb-1">{f.title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ STATS BAR ═══════════════════ */}
      <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#111827,#1f2937)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${p.color}18, transparent 70%)` }} />
        <div className="container-xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {p.stats.map((s, i) => (
              <StatItem key={s.label} {...s} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{ background: `linear-gradient(270deg,${p.colorSoft},#ffffff,${p.colorSoft})`, backgroundSize: "400%" }}
        />
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm pointer-events-none" />

        <div className="container-xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div {...fadeLeft(0)}>
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: gradient }}
              >
                <ArrowRight size={20} className="text-white" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                {p.ctaTitlePre} <span style={gradientText}>{p.ctaTitleHighlight}</span>
              </h2>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="flex items-center gap-4 flex-wrap flex-shrink-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={p.ctaHref}
                className="relative inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-full overflow-hidden group"
                style={{ background: gradient, boxShadow: `0 6px 20px ${p.color}55` }}
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                {p.ctaLabel}
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
  );
}
