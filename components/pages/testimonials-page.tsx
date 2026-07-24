"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { generateSlug } from "@/lib/utils";

/* ─── Animation helpers ───────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─── Gradient pool ───────────────────────────────────────── */
const accentPool = [
  { light: "#EFF6FF", text: "#2563EB", border: "#BFDBFE" },
  { light: "#F0FDF4", text: "#16A34A", border: "#BBF7D0" },
  { light: "#FFF7ED", text: "#EA580C", border: "#FED7AA" },
  { light: "#FDF4FF", text: "#9333EA", border: "#E9D5FF" },
  { light: "#FFF1F2", text: "#E11D48", border: "#FECDD3" },
  { light: "#F5F3FF", text: "#7C3AED", border: "#DDD6FE" },
];

export default function TestimonialsPage({
  testimonialsData = [],
  successStories = [],
}: {
  testimonialsData?: { id: string | number; content: string; authorName: string; authorTitle: string; rating: number; company: string }[];
  successStories?: { category: string; title: string; highlight: string; highlightLabel: string; desc: string; color: string; bg: string }[];
}) {
  const [activeFeatured, setActiveFeatured] = useState(0);
  const stories = successStories;

  const all = testimonialsData.map((t, idx) => ({
    id: t.id,
    content: t.content,
    author: t.authorName,
    role: t.authorTitle,
    company: t.company,
    rating: t.rating,
    accent: accentPool[idx % accentPool.length],
  }));

  const featuredList = all.slice(0, 3);

  return (
    <div className="bg-white min-h-screen">

      {/* ════════ HERO ════════ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[400px] bg-yellow-50/60 rounded-full blur-[80px] pointer-events-none" />

        <div className="container-xl relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-600 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full mb-7">
              <Star size={11} fill="#F59E0B" className="text-amber-500" />
              Client Success Stories
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.8rem] md:text-[3.5rem] font-black tracking-tight leading-tight text-gray-900 mb-5"
          >
            Don&apos;t just take{" "}
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
              our word
            </motion.span>{" "}
            for it.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-base leading-relaxed"
          >
            We partner with ambitious startups, enterprises and learners to build category-defining solutions.
            Here&apos;s what they say about working with Akronix.
          </motion.p>
        </div>
      </section>

      {/* ════════ SUCCESS STORIES ════════ */}
      {stories.length > 0 && (
      <section id="success-stories" className="pb-20 scroll-mt-24">
        <div className="container-xl">
          <motion.div {...fadeUp(0)} className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Case Studies</p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Real Results. Real Impact.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {stories.map((story, i) => (
              <motion.div
                key={story.title}
                id={`story-${generateSlug(story.title)}`}
                {...fadeUp(i * 0.1)}
                className="scroll-mt-24 bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300 flex flex-col hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: story.bg, color: story.color }}
                  >
                    {story.category}
                  </span>
                  <ExternalLink size={14} className="text-gray-300" />
                </div>

                <div className="flex-1">
                  <div className="text-5xl font-black mb-2" style={{ color: story.color }}>
                    {story.highlight}
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">{story.highlightLabel}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{story.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ════════ FEATURED CAROUSEL ════════ */}
      {featuredList.length > 0 && (
      <section className="pb-16">
        <div className="container-xl max-w-3xl">
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-100 p-8 md:p-10 overflow-hidden shadow-sm">
            <span className="absolute top-4 left-6 text-[90px] font-serif text-amber-200 leading-none select-none">&ldquo;</span>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeatured}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative z-10 pt-8"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: featuredList[activeFeatured]?.rating ?? 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="#F59E0B" className="text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-7 font-medium">
                  {featuredList[activeFeatured]?.content}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-base flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)" }}>
                    {(featuredList[activeFeatured]?.author ?? "A")[0]}
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-sm">{featuredList[activeFeatured]?.author}</p>
                    <p className="text-xs text-gray-400">
                      {featuredList[activeFeatured]?.role} · {featuredList[activeFeatured]?.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center gap-3 mt-7">
              <div className="flex gap-1.5 flex-1">
                {featuredList.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveFeatured(i)}
                    animate={{ width: i === activeFeatured ? 24 : 10 }}
                    className={`h-1.5 rounded-full transition-colors ${i === activeFeatured ? "bg-amber-500" : "bg-amber-200 hover:bg-amber-300"}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {[ChevronLeft, ChevronRight].map((Ic, d) => (
                  <motion.button
                    key={d}
                    whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveFeatured(p => (p + (d === 0 ? -1 : 1) + featuredList.length) % featuredList.length)}
                    className="w-8 h-8 rounded-full border border-amber-200 bg-white flex items-center justify-center hover:border-amber-400 hover:bg-amber-50 transition-all"
                  >
                    <Ic size={14} />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ════════ ALL TESTIMONIALS GRID ════════ */}
      {all.length > 0 && (
      <section className="pb-24 bg-gray-50 pt-16">
        <div className="container-xl">
          <motion.h2 {...fadeUp(0)} className="text-2xl font-black text-gray-900 mb-10 text-center">
            What Our Clients &amp; Students Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {all.map((t, i) => (
              <motion.div
                key={t.id}
                {...fadeUp(i * 0.06)}
                whileHover={{ y: -5, boxShadow: `0 16px 40px ${t.accent.text}18` }}
                className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col transition-shadow duration-300 cursor-default"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: t.accent.light }}
                  >
                    <Quote size={15} style={{ color: t.accent.text }} />
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={12} fill="#F59E0B" className="text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5">
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{ background: t.accent.light, color: t.accent.text }}
                  >
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">{t.author}</p>
                    <p className="text-xs" style={{ color: t.accent.text }}>
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {stories.length === 0 && all.length === 0 && (
        <section className="pb-24">
          <div className="container-xl text-center max-w-lg mx-auto">
            <p className="text-gray-400 text-sm">
              We&apos;re building our library of client stories and reviews here. Check back soon, or ask us directly for references.
            </p>
          </div>
        </section>
      )}

      {/* ════════ CTA ════════ */}
      <section className="py-20 bg-amber-50 border-t border-amber-100">
        <div className="container-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
              Ready to build something amazing?
            </h2>
            <p className="text-gray-500 text-sm max-w-md">
              Join the growing list of successful companies and learners that trust Akronix.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-4 flex-shrink-0 flex-wrap">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="relative inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-full overflow-hidden group"
                style={{ background: "linear-gradient(135deg,#F59E0B,#EA580C)", boxShadow: "0 6px 20px rgba(245,158,11,0.38)" }}
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                Start Your Project
                <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-800 border-2 border-gray-300 px-7 py-3.5 rounded-full hover:border-gray-500 transition-colors"
              >
                View Pricing
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
