"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DEFAULT_LEADERSHIP, type LeadershipMember } from "@/lib/leadership-defaults";

/* ─── Social icons (match About page style) ────────────────── */
function IconLinkedin() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>;
}
function IconX() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.2-9.3L1 2h7.2l5 6.6L18.9 2zm-1.2 18h1.7L7.4 4h-1.8l12.1 16z"/></svg>;
}
function IconInstagram() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.7 0 3.05.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.07.06 1.42.06 4.13s-.01 3.06-.06 4.13c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.76c-.5.5-1.1.9-1.76 1.15-.64.25-1.37.42-2.43.47-1.07.05-1.42.06-4.12.06s-3.06-.01-4.13-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.7 2 12s.01-3.06.06-4.13c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 0 1 5.44 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.3 2 12 2zm0 1.8c-2.67 0-2.99 0-4.04.06-.87.04-1.34.18-1.66.3-.4.16-.7.35-1 .65-.3.3-.5.6-.65 1-.12.32-.26.79-.3 1.66C4.31 8.7 4.3 9.02 4.3 12s.01 3.3.05 4.35c.04.87.18 1.34.3 1.66.16.4.35.7.65 1 .3.3.6.5 1 .65.32.12.79.26 1.66.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.66-.3.4-.16.7-.35 1-.65.3-.3.5-.6.65-1 .12-.32.26-.79.3-1.66.05-1.05.06-1.37.06-4.35s-.01-3.3-.06-4.35c-.04-.87-.18-1.34-.3-1.66-.16-.4-.35-.7-.65-1-.3-.3-.6-.5-1-.65-.32-.12-.79-.26-1.66-.3C14.99 3.81 14.67 3.8 12 3.8zm0 3.05a5.15 5.15 0 1 1 0 10.3 5.15 5.15 0 0 1 0-10.3zm0 1.8a3.35 3.35 0 1 0 0 6.7 3.35 3.35 0 0 0 0-6.7zm5.35-1.98a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/></svg>;
}

type TeamMember = LeadershipMember;

const DEFAULT_TEAM: TeamMember[] = DEFAULT_LEADERSHIP;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(DEFAULT_TEAM);

  useEffect(() => {
    fetch("/api/site-settings?prefix=site.")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["site.leadership"]) {
          try { setTeam(JSON.parse(data["site.leadership"])); } catch {}
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Navigation />
      <main className="bg-white text-gray-900 overflow-x-hidden min-h-screen">

        {/* ═══ HERO ═══ */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-[110px] pointer-events-none" />
          <div className="container-xl relative z-10 text-center max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-600 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full mb-7">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Our Team
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[2.6rem] md:text-[3.2rem] font-black tracking-tight leading-tight text-gray-900 mb-5"
            >
              The People Behind Akronix
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-500 text-base leading-relaxed"
            >
              A team of builders, strategists and creatives working together to help businesses grow.
            </motion.p>
          </div>
        </section>

        {/* ═══ TEAM GRID ═══ */}
        <section className="pb-24">
          <div className="container-xl">
            {team.length === 0 ? (
              <p className="text-center text-gray-400 py-20">No team members yet.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {team.map((m, i) => {
                  const socials = [
                    { key: "linkedin", icon: <IconLinkedin />, href: m.linkedin || "#" },
                    { key: "twitter", icon: <IconX />, href: m.twitter || "#" },
                    { key: "instagram", icon: <IconInstagram />, href: m.instagram || "#" },
                  ];
                  return (
                    <motion.div
                      key={m.name + i}
                      {...fadeUp((i % 8) * 0.06)}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)] transition-shadow duration-300"
                    >
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        {m.photo ? (
                          <>
                            <Image src={m.photo} alt={m.name} fill className="object-cover object-top" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: (m.color || "#F59E0B") + "22" }}>
                            <span className="text-4xl font-black" style={{ color: m.color || "#F59E0B" }}>
                              {m.avatar || m.name?.[0] || "?"}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-[13px] font-black text-gray-900">{m.name || "Unnamed"}</p>
                        <p className="text-[11px] text-amber-600 font-semibold mb-2">{m.title}</p>
                        {m.bio && <p className="text-[10px] text-gray-400 leading-relaxed mb-3">{m.bio}</p>}
                        <div className="flex items-center gap-2">
                          {socials.map(s => (
                            <a
                              key={s.key}
                              href={s.href}
                              target={s.href !== "#" ? "_blank" : undefined}
                              rel="noopener noreferrer"
                              className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-amber-50 hover:text-amber-500 transition-colors"
                            >
                              {s.icon}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
