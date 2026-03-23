"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Rocket, Heart, Users, Target, Shield, Zap, Activity } from "lucide-react";
import { LiveIndicator } from "@/components/ui/live-indicator";
import Image from "next/image";

export default function AboutPage() {
  const animations = {
    fadeUp: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
    },
    fadeRight: {
      initial: { opacity: 0, x: -30 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <>
      <Navigation />
      <main className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-fuchsia-900/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div {...animations.fadeRight}>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
                  Where <span className="gradient-text-primary">Dual Rays</span> Shape a Single Vision.
                </h1>
                <p className="text-xl text-white/50 leading-relaxed mb-10 max-w-xl">
                  Akronix is part of a high-performance ecosystem alongside <span className="text-white">Mediatrix</span> and <span className="text-white">Gritscape</span>. Together, we provide the full spectrum of startup growth — from engineering bedrock to global marketing scale.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { icon: Rocket, title: "Our Mission", desc: "To accelerate human progress through world-class engineering.", color: "#5B4DFF" },
                    { icon: Heart, title: "Our Passion", desc: "High-performance code that feels like magic to the user.", color: "#F08A8A" },
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="card p-6 border-white/5 bg-white/[0.02]"
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 animate-realtime-glow"
                        style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
                        <item.icon size={20} />
                      </div>
                      <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                      <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Team Image Section — Replacing "Vision" text */}
              <motion.div 
                {...animations.fadeUp}
                className="relative aspect-square rounded-3xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
                
                {/* Blended Team Image */}
                <Image 
                  src="/team.png"
                  alt="Our Team"
                  fill
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 opacity-80"
                />
                
                {/* Overlay Elements */}

                <div className="absolute bottom-8 left-8 z-20">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card px-6 py-4 rounded-2xl border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-3">
                        {[
                          { src: "/team-shanjay.png", alt: "Shanjay" },
                          { src: "/team-vishal.png", alt: "Vishal" },
                          { src: "/team-bharath.png", alt: "Bharath" }
                        ].map((img, i) => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-black relative overflow-hidden bg-white/10 ring-2 ring-black">
                             <Image src={img.src} alt={img.alt} fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                      <span className="text-sm font-bold text-white/80">60+ Global Engineers</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </>
  );
}
