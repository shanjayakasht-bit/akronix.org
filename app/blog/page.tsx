"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram, Linkedin, Twitter, Mail, MapPin, Star,
  ChevronDown, Code2, Palette, Zap, Shield, BarChart3, Rocket, X, CheckCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { teamMembers } from "@/lib/team-data";
import type { TeamMember } from "@/lib/team-data";

const iconMap: Record<string, React.ElementType> = {
  shanjay: Code2,
  vishal: Palette,
  bharath: Zap,
  vijay: Shield,
  arjun: BarChart3,
  priya: Rocket,
};

/* ── HELPERS ────────────────────────────────────────────────── */
const playBlip = () => {
  try {
    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // High pitch blip
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // browser might block audio if no interaction
  }
};

/* ── COMPONENTS ──────────────────────────────────────────────── */

function TypewriterText({ text, delay = 15 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(prev => prev + text[index]);
        setIndex(prev => prev + 1);
        // Play very subtle tick every 3 chars
        if (index % 4 === 0) playBlip();
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [index, text, delay]);

  return <span>{displayed}{index < text.length && <span className="animate-pulse inline-block w-1.5 h-4 bg-white/40 ml-0.5" />}</span>;
}

/* ── MODAL ───────────────────────────────────────────────────── */
function ProfileModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    playBlip(); // Open sound
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998] flex items-center justify-center p-4 lg:p-10"
        onClick={onClose}
        style={{ background: "rgba(2,2,5,0.92)", backdropFilter: "blur(24px)" }}
      >
        <motion.div
          key="modal"
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-[40px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row bg-[#020205]"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 active:scale-95"
          >
            <X size={20} className="text-white/60" />
          </button>

          {/* Left Column: Visual */}
          <div className="relative w-full lg:w-[40%] h-64 lg:h-auto overflow-hidden">
            <Image
              src={member.image}
              alt={member.fullName}
              fill
              className="object-cover object-top opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#020205]/20 to-[#020205]" />
            
            {/* Status Info Overlay */}
            <div className="absolute bottom-8 left-8 z-20">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Active Expertise</span>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex-1 flex flex-col p-10 lg:p-14 overflow-y-auto custom-scrollbar">
             {/* Header */}
             <div className="mb-10">
                <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 }}
                   className="flex items-center gap-3 mb-3"
                >
                   <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em]"
                     style={{ background: `${member.color}20`, color: member.color, border: `1px solid ${member.color}30` }}>
                     {member.department}
                   </span>
                   <div className="w-1 h-1 rounded-full bg-white/20" />
                   <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest truncate">{member.location}</span>
                </motion.div>
                
                <motion.h2 
                   initial={{ opacity: 0, y: 15 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.6 }}
                   className="text-4xl lg:text-5xl font-black mb-3 leading-none"
                >
                   {member.fullName}
                </motion.h2>
                <motion.p 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.7 }}
                   className="text-lg lg:text-xl font-semibold mb-6" 
                   style={{ color: member.color }}
                >
                   {member.role}
                </motion.p>
                
                <motion.div 
                   initial={{ opacity: 0, scaleX: 0 }}
                   animate={{ opacity: 1, scaleX: 1 }}
                   transition={{ delay: 0.8, duration: 0.8 }}
                   className="w-20 h-[3px] rounded-full"
                   style={{ background: member.color }}
                />
             </div>

             {/* Typewriter Bio & Core Details */}
             <div className="grid gap-10 mb-12">
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">Strategic Profile</p>
                   <div className="text-base lg:text-lg text-white/70 leading-relaxed font-medium">
                      <TypewriterText text={member.tagline + " " + member.bio.split('.').slice(0, 2).join('.') + "."} delay={20} />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   {member.stats.slice(0, 4).map((stat, i) => (
                      <motion.div 
                         key={stat.label}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: i * 0.1 + 1 }}
                         className="p-5 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col gap-1"
                      >
                         <span className="text-2xl font-black tracking-tighter" style={{ color: member.color }}>{stat.value}</span>
                         <span className="text-[9px] font-black uppercase tracking-widest text-white/30">{stat.label}</span>
                      </motion.div>
                   ))}
                </div>
             </div>

             {/* Functional Highlights */}
             <div className="mb-12">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-6">Execution Pillars</p>
                <div className="space-y-4">
                   {member.highlights.slice(0, 3).map((h, i) => (
                      <motion.div 
                         key={h.title}
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: i * 0.1 + 1.5 }}
                         className="flex items-start gap-4 p-5 rounded-[24px] border border-white/5 hover:border-white/10 transition-colors"
                      >
                         <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${member.color}15` }}>
                            <CheckCircle size={16} style={{ color: member.color }} />
                         </div>
                         <div>
                            <p className="text-sm font-black mb-1">{h.title}</p>
                            <p className="text-xs text-white/40 leading-relaxed">{h.desc}</p>
                         </div>
                      </motion.div>
                   ))}
                </div>
             </div>

             {/* CTA */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 2 }}
               className="mt-auto flex flex-wrap items-center gap-6 pt-10 border-t border-white/5"
             >
                <div className="flex gap-3">
                   {[
                      { href: member.socials.instagram, Icon: Instagram },
                      { href: member.socials.linkedin, Icon: Linkedin },
                   ].map(({ href, Icon }) => (
                      <Link key={href} href={href} target="_blank" className="w-11 h-11 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all">
                         <Icon size={18} style={{ color: member.color }} />
                      </Link>
                   ))}
                </div>
                <Link href={`mailto:${member.socials.email}`} className="flex-1 min-w-[200px] h-14 rounded-2xl flex items-center justify-center gap-3 text-sm font-black transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ background: member.color, color: "#000" }}>
                   Initiate Contact <Mail size={18} />
                </Link>
             </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── CARD ────────────────────────────────────────────────────── */
function MemberCard({ member, index, onView }: { member: TeamMember; index: number; onView: () => void }) {
  const Icon = iconMap[member.id] ?? Star;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      <div 
        onClick={onView}
        className="cursor-pointer h-full relative rounded-[40px] border border-white/5 bg-white/[0.01] overflow-hidden hover:border-white/15 hover:bg-white/[0.02] transition-all duration-700 flex flex-col"
      >
        {/* Profile Image + Overlay */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={member.image}
            alt={member.fullName}
            fill
            className="object-cover object-top transition-all duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent" />
          
          {/* Badge Overlay */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <span
              className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] w-fit"
              style={{ background: `${member.color}30`, color: '#fff', backdropFilter: 'blur(10px)', border: `1px solid ${member.color}50` }}
            >
              {member.department}
            </span>
          </div>

          <div 
            className="absolute bottom-6 right-6 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-2xl"
            style={{ background: `${member.color}20`, border: `1px solid ${member.color}40`, backdropFilter: 'blur(8px)' }}
          >
            <Icon size={20} style={{ color: member.color }} />
          </div>
        </div>

        {/* Info Area */}
        <div className="p-8 flex-1 flex flex-col">
          <h3 className="text-2xl font-black text-white mb-1 group-hover:text-white/90 transition-colors uppercase tracking-tight">{member.name}</h3>
          <p className="text-sm font-bold opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: member.color }}>{member.role}</p>
          
          <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
            <div className="flex items-center gap-1.5 opacity-30 group-hover:opacity-60 transition-opacity">
               <MapPin size={12} />
               <span className="text-[10px] font-black uppercase tracking-widest">{member.location.split(',')[0]}</span>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-[#5B4DFF] group-hover:text-white transition-colors flex items-center gap-2">
               Blueprint <ChevronDown size={14} className="-rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── PAGE ────────────────────────────────────────────────────── */
export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <Navigation />

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <ProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>

      <main className="bg-black text-white min-h-screen">
        {/* Subtle Background Elements */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
           <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-indigo-500/10 blur-[180px] rounded-full" />
           <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full" />
        </div>

        {/* Hero */}
        <section className="pt-48 pb-20 relative z-10">
          <div className="container-xl text-center">
            <motion.div 
               initial="initial"
               animate="animate"
               variants={{
                 initial: { opacity: 0 },
                 animate: { 
                   opacity: 1, 
                   transition: { staggerChildren: 0.2 } 
                 }
               }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-7xl font-black mb-10 leading-none tracking-tighter"
                variants={{
                  initial: { opacity: 0 },
                  animate: { opacity: 1, transition: { staggerChildren: 0.15 } }
                }}
              >
                {/* MEET */}
                <motion.span 
                  className="inline-block mr-4 text-white"
                  variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
                >
                  MEET
                </motion.span>

                {/* THE */}
                <motion.span 
                  className="inline-block mr-4 text-white"
                  variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
                >
                  THE
                </motion.span>

                {/* ARCHITECTS */}
                <motion.span 
                  className="inline-block gradient-text-primary"
                  variants={{ initial: { opacity: 0, y: 20, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 } }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  ARCHITECTS
                </motion.span>
              </motion.h1>
              <motion.p 
                variants={{
                  initial: { opacity: 0, y: 15 },
                  animate: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl text-white/40 leading-relaxed max-w-2xl mx-auto font-medium"
              >
                We are a distributed task force of high-performance engineers and strategy-pure designers.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Interaction Hint */}
        <div className="container-xl relative z-10 mb-16 flex justify-center">
           <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="px-6 py-3 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl flex items-center gap-4 group cursor-default"
           >
              <div className="flex -space-x-3">
                 {teamMembers.slice(0, 3).map((m, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black overflow-hidden bg-white/10 relative">
                       <Image src={m.image} alt="" fill className="object-cover" />
                    </div>
                 ))}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Select an architect to view <span className="text-white">Technical Blueprint</span></p>
           </motion.div>
        </div>

        {/* Grid */}
        <section className="pb-32 relative z-10">
          <div className="container-xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {teamMembers.map((member, i) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  index={i}
                  onView={() => setSelectedMember(member)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Recruitment Section */}
        <section className="py-32 relative z-10 border-t border-white/5">
          <div className="container-xl">
             <div className="max-w-4xl mx-auto text-center">
                <motion.div
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="p-16 md:p-24 rounded-[50px] border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden"
                >
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#5B4DFF] to-transparent" />
                   <h2 className="text-5xl md:text-6xl font-black mb-8">HAVE THE <span className="gradient-text-primary">EDGE?</span></h2>
                   <p className="text-lg text-white/50 mb-12 max-w-lg mx-auto leading-relaxed">
                      We are always scanning for outliers. If you build at the limit of what's possible, let's talk.
                   </p>
                   <Link href="/contact" className="px-12 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm transition-all hover:bg-white/90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      Apply to the Taskforce
                   </Link>
                </motion.div>
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
