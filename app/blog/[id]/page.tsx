"use client";

import { notFound, useParams } from "next/navigation";
import { teamMembers } from "@/lib/team-data";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram, Linkedin, Twitter, Mail, Globe, MapPin, ArrowLeft, ChevronRight, Star, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

/* ── Animation helpers ──────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: -32 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Floating particle component ────────────────────────────── */
function Particle({ color, index }: { color: string; index: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 3 + (index % 4),
        height: 3 + (index % 4),
        background: color,
        left: `${(index * 17 + 5) % 95}%`,
        top: `${(index * 23 + 10) % 90}%`,
        boxShadow: `0 0 12px ${color}`,
        opacity: 0.4,
      }}
      animate={{
        y: [0, -20 - index * 3, 0],
        opacity: [0.2, 0.7, 0.2],
        scale: [1, 1.4, 1],
      }}
      transition={{
        duration: 4 + index * 0.7,
        delay: index * 0.3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ── Main page ──────────────────────────────────────────────── */
export default function MemberProfilePage() {
  const params = useParams();
  const member = teamMembers.find(m => m.id === params.id);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  if (!member) notFound();

  const others = teamMembers.filter(m => m.id !== member.id).slice(0, 3);

  return (
    <>
      <Navigation />
      <main className="bg-black text-white min-h-screen overflow-x-hidden">

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative h-[85vh] flex items-end overflow-hidden">
          {/* Parallax cover image */}
          <motion.div style={{ y: parallaxY, scale: parallaxScale }} className="absolute inset-0 z-0">
            <Image
              src={member.coverImage}
              alt={member.fullName}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" style={{
              background: `linear-gradient(to bottom, rgba(2,2,5,0.3) 0%, rgba(2,2,5,0.6) 60%, rgba(2,2,5,1) 100%)`
            }} />
            <div className="absolute inset-0" style={{
              background: `radial-gradient(ellipse at 70% 50%, ${member.glow} 0%, transparent 60%)`
            }} />
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 z-[1] overflow-hidden">
            {Array.from({ length: 16 }).map((_, i) => (
              <Particle key={i} color={member.color} index={i} />
            ))}
          </div>

          {/* Back button */}
          <motion.div {...fadeRight(0)} className="absolute top-24 left-0 z-20 container-xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <ArrowLeft size={15} /> Back to Team
            </Link>
          </motion.div>

          {/* Hero content */}
          <motion.div style={{ opacity: parallaxOpacity }} className="relative z-10 container-xl pb-16 w-full">
            <div className="flex flex-col md:flex-row items-end gap-10">
              {/* Profile photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex-shrink-0"
              >
                {/* Rotating glow ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-[6px] rounded-full"
                  style={{
                    background: `conic-gradient(from 0deg, ${member.color}, transparent, ${member.color}66, transparent, ${member.color})`
                  }}
                />
                <div
                  className="absolute -inset-[3px] rounded-full"
                  style={{ background: "#020205" }}
                />
                <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-2"
                  style={{ borderColor: `${member.color}60` }}>
                  <Image src={member.image} alt={member.fullName} fill className="object-cover object-top" />
                </div>
                {/* Online indicator */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-green-400 border-2 border-black shadow-[0_0_10px_theme('colors.green.400')]"
                />
              </motion.div>

              {/* Name & role */}
              <div className="flex-1">
                <motion.div {...fadeUp(0.1)}>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
                    style={{ background: `${member.color}20`, color: member.color, border: `1px solid ${member.color}40` }}>
                    <Sparkles size={10} />
                    {member.department}
                  </span>
                </motion.div>
                <motion.h1 {...fadeUp(0.15)} className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-3">
                  {member.fullName}
                </motion.h1>
                <motion.p {...fadeUp(0.2)} className="text-xl font-semibold mb-4" style={{ color: member.color }}>
                  {member.role}
                </motion.p>
                <motion.div {...fadeUp(0.25)} className="flex items-center gap-2 mb-6">
                  <MapPin size={14} className="text-white/40" />
                  <span className="text-sm text-white/40">{member.location}</span>
                </motion.div>

                {/* Social links */}
                <motion.div {...fadeUp(0.3)} className="flex items-center gap-3 flex-wrap">
                  {[
                    { href: member.socials.instagram, Icon: Instagram, label: "Instagram" },
                    { href: member.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
                    { href: member.socials.twitter, Icon: Twitter, label: "Twitter" },
                    { href: `mailto:${member.socials.email}`, Icon: Mail, label: "Email" },
                    { href: member.socials.website, Icon: Globe, label: "Website" },
                  ].map(({ href, Icon, label }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 hover:brightness-110"
                      style={{ background: `${member.color}18`, color: member.color, border: `1px solid ${member.color}35` }}
                    >
                      <Icon size={14} />
                      {label}
                    </Link>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── STATS BAR ─────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="border-y border-white/5 py-8"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div className="container-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
              {member.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center py-4 px-4"
                >
                  <motion.p
                    className="text-3xl md:text-4xl font-black"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.12, type: "spring", bounce: 0.4 }}
                    style={{ color: member.color }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-[11px] text-white/40 font-bold uppercase tracking-widest mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── ABOUT + CONTENT ───────────────────────────────────── */}
        <section className="py-24 relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute left-0 top-1/4 w-[500px] h-[500px] blur-[150px] opacity-10 rounded-full pointer-events-none -z-10"
            style={{ background: member.color }} />

          <div className="container-xl">
            <div className="grid lg:grid-cols-3 gap-16">

              {/* Left: bio + highlights */}
              <div className="lg:col-span-2 space-y-16">

                {/* Tagline */}
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                    style={{ background: `linear-gradient(180deg, ${member.color}, transparent)` }}
                  />
                  <div className="pl-6">
                    <p className="text-2xl md:text-3xl font-black italic text-white/80 leading-relaxed">
                      {member.tagline}
                    </p>
                  </div>
                </motion.div>

                {/* Bio */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-sm font-black uppercase tracking-widest mb-5" style={{ color: member.color }}>
                    About {member.name}
                  </h2>
                  <p className="text-lg text-white/70 leading-relaxed mb-6">{member.bio}</p>
                  <p className="text-base text-white/50 leading-relaxed">{member.longBio}</p>
                </motion.div>

                {/* Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-sm font-black uppercase tracking-widest mb-8" style={{ color: member.color }}>
                    Career Highlights
                  </h2>
                  <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
                    className="space-y-5">
                    {member.highlights.map((h, i) => (
                      <motion.div
                        key={h.title}
                        variants={staggerItem}
                        className="flex gap-5 p-5 rounded-2xl border border-white/5 bg-white/[0.02] group hover:border-white/10 transition-all duration-300 hover:bg-white/[0.04]"
                      >
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black mt-0.5 transition-transform group-hover:scale-110"
                          style={{ background: `${member.color}20`, color: member.color, border: `1px solid ${member.color}40` }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-bold text-white mb-1">{h.title}</p>
                          <p className="text-sm text-white/50">{h.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-sm font-black uppercase tracking-widest mb-6" style={{ color: member.color }}>
                    Skills & Expertise
                  </h2>
                  <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}
                    className="flex flex-wrap gap-3">
                    {member.skills.map(skill => (
                      <motion.span
                        key={skill}
                        variants={staggerItem}
                        className="px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 cursor-default"
                        style={{ background: `${member.color}12`, color: member.color, border: `1px solid ${member.color}30` }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              {/* Right: sticky sidebar */}
              <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">

                {/* Connect card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                  className="rounded-3xl border border-white/8 overflow-hidden"
                  style={{ background: "rgba(12,12,20,0.9)" }}
                >
                  {/* Card header glow */}
                  <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${member.color}, ${member.color}50)` }} />
                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10">
                        <Image src={member.image} alt={member.fullName} fill className="object-cover object-top" />
                      </div>
                      <div>
                        <p className="font-black text-white">{member.name}</p>
                        <p className="text-xs" style={{ color: member.color }}>{member.role}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href={member.socials.instagram}
                        target="_blank"
                        className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5 group"
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ background: `${member.color}20`, border: `1px solid ${member.color}30` }}>
                          <Instagram size={16} style={{ color: member.color }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">Instagram</p>
                          <p className="text-[11px] text-white/30">@{member.id}</p>
                        </div>
                        <ChevronRight size={14} className="text-white/20 group-hover:text-white/60 transition-colors" />
                      </Link>

                      <Link
                        href={member.socials.linkedin}
                        target="_blank"
                        className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5 group"
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ background: `${member.color}20`, border: `1px solid ${member.color}30` }}>
                          <Linkedin size={16} style={{ color: member.color }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">LinkedIn</p>
                          <p className="text-[11px] text-white/30">in/{member.id}</p>
                        </div>
                        <ChevronRight size={14} className="text-white/20 group-hover:text-white/60 transition-colors" />
                      </Link>

                      <Link
                        href={member.socials.twitter}
                        target="_blank"
                        className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5 group"
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ background: `${member.color}20`, border: `1px solid ${member.color}30` }}>
                          <Twitter size={16} style={{ color: member.color }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">Twitter / X</p>
                          <p className="text-[11px] text-white/30">@{member.id}</p>
                        </div>
                        <ChevronRight size={14} className="text-white/20 group-hover:text-white/60 transition-colors" />
                      </Link>
                    </div>

                    <Link
                      href={`mailto:${member.socials.email}`}
                      className="mt-5 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-black transition-all hover:opacity-90 hover:scale-[1.02]"
                      style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}80)` }}
                    >
                      <Mail size={15} />
                      Email {member.name}
                    </Link>
                  </div>
                </motion.div>

                {/* Star quote card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="rounded-3xl p-6 border border-white/5"
                  style={{ background: `${member.color}08` }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} style={{ fill: member.color, color: member.color }} />
                    ))}
                  </div>
                  <p className="text-sm text-white/70 italic leading-relaxed">{member.tagline}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image src={member.image} alt={member.name} width={32} height={32} className="object-cover object-top" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">{member.name}</p>
                      <p className="text-[10px] text-white/30">{member.role}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OTHER MEMBERS ─────────────────────────────────────── */}
        <section className="py-20 border-t border-white/5">
          <div className="container-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-12"
            >
              <div>
                <p className="text-sm font-black uppercase tracking-widest mb-2" style={{ color: member.color }}>The Team</p>
                <h2 className="text-3xl font-black">Meet the others</h2>
              </div>
              <Link href="/blog" className="btn-secondary text-sm hidden md:inline-flex">
                View all →
              </Link>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid sm:grid-cols-3 gap-6"
            >
              {others.map(other => (
                <motion.div key={other.id} variants={staggerItem}>
                  <Link
                    href={`/blog/${other.id}`}
                    className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] group hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Image src={other.image} alt={other.fullName} fill className="object-cover object-top" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-white truncate">{other.fullName}</p>
                      <p className="text-xs truncate" style={{ color: other.color }}>{other.role}</p>
                    </div>
                    <ChevronRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
