"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Layers, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ── Variants ─────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function SaaSDevelopmentPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#020205] text-white pt-40 pb-24 relative overflow-hidden">
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div 
            animate={{ opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ 
              backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", 
              backgroundSize: "60px 60px" 
            }} 
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-cyan-500/10 blur-[160px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fuchsia-500/5 blur-[140px]" />
        </div>

        <div className="container-xl relative z-10 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mb-32"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "160px" }}
              className="h-px bg-cyan-500/50 mb-10"
            />
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-10 leading-[0.85] tracking-tighter uppercase italic text-white/90">
              Enterprise <span className="gradient-text-primary">SaaS Systems</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/40 max-w-2xl leading-relaxed font-medium uppercase tracking-widest">
              Architecting scalable multi-tenant ecosystems for global performance.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
             <div className="space-y-12 order-2 lg:order-1">
                {[
                  { title: "Multi-tenant Architecture", desc: "Isolate customer data while sharing resources efficiently with advanced sharding." },
                  { title: "Subscription Management", desc: "Integrated Stripe/Paddle for tiered billing and seat-based pricing engines." },
                  { title: "Advanced Analytics", desc: "Real-time insights for your users and your business metrics via custom dashboards." },
                  { title: "API-First Design", desc: "Built with modern APIs for easy integration and third-party ecosystem growth." },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    {...fadeUp(i * 0.1)}
                    className="group relative flex gap-6 p-6 rounded-3xl transition-all duration-500 hover:bg-white/[0.02] border border-transparent hover:border-white/[0.05]"
                  >
                     <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-500 shadow-2xl">
                        <CheckCircle size={20} className="text-cyan-400" />
                     </div>
                     <div>
                        <h3 className="font-black text-xl mb-2 text-white/90 group-hover:text-white transition-colors">{item.title}</h3>
                        <p className="text-sm md:text-base text-white/30 group-hover:text-white/50 leading-relaxed transition-colors">{item.desc}</p>
                     </div>
                     <div className="absolute right-6 top-6 text-[8px] font-black text-white/5 group-hover:text-white/10 opacity-0 group-hover:opacity-100 uppercase tracking-widest">
                        Node_0{i+1}
                     </div>
                  </motion.div>
                ))}
             </div>
             <div className="relative aspect-square lg:order-2">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full relative rounded-[3rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-3xl group shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                >
                   <Image 
                     src="/blog-cloud.png" 
                     alt="SaaS Platform"
                     fill
                     className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2000ms] mix-blend-screen"
                   />
                   
                   {/* Scanline HUD Overlay */}
                   <motion.div 
                      animate={{ top: ["-100%", "200%"] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-cyan-400/0 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100"
                   />
                   
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent/20 to-transparent" />
                   
                   {/* Decorative HUD corners */}
                   <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-white/20 group-hover:border-cyan-500/50 transition-colors" />
                   <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-white/20 group-hover:border-cyan-500/50 transition-colors" />
                </motion.div>
             </div>
          </div>
          
          <section className="relative py-40">
             <div className="max-w-6xl mx-auto px-4">
                <motion.div 
                   {...fadeUp()}
                   className="p-16 md:p-32 rounded-[5rem] border border-white/[0.04] bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-3xl relative overflow-hidden group text-center"
                >
                   {/* Kinetic Edge Glow */}
                   <motion.div 
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 left-0 w-80 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" 
                   />
                   
                   <h2 className="text-4xl md:text-7xl lg:text-8xl font-black mb-12 leading-[0.9] tracking-tighter italic uppercase text-white/90">
                     Launch your <span className="gradient-text-primary">Ecosystem</span>
                   </h2>
                   <p className="text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed text-white/30 uppercase tracking-widest">
                      Our architecture handles user scaling from 1 to 1M+ without a sweat.
                   </p>
                   <Link href="/contact?service=saas" className="px-14 py-6 rounded-full bg-white text-black font-black uppercase tracking-[0.2em] text-sm transition-all hover:bg-cyan-400 hover:text-black hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)] inline-flex items-center gap-3">
                      Execute Vision <ArrowRight size={20} />
                   </Link>
                </motion.div>
             </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
