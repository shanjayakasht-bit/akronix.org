"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Terminal, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ── Variants ─────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function CustomWebAppsPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black text-white pt-32 pb-24">
        <div className="container-xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
              Bespoke <span className="gradient-text-primary">Web Applications</span> for complex needs.
            </h1>
            <p className="text-xl text-white/50 mb-12 max-w-2xl leading-relaxed">
              When off-the-shelf solutions aren&apos;t enough. We build powerful, tailored web applications that automate your workflows and solve your unique business challenges.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
             <div className="space-y-8">
                {[
                  { title: "Custom Logic & Workflows", desc: "Software that adapts to your business, not the other way around." },
                  { title: "Enterprise Integrations", desc: "Seamlessly connect with your existing tools, APIs, and legacy systems." },
                  { title: "Real-time Dashboards", desc: "Monitor your critical business metrics with live data visualizations." },
                  { title: "Automated Reporting", desc: "Generate complex insights and documents with a single click." },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                     <div className="w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle size={14} className="text-indigo-400" />
                     </div>
                     <div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-white/40">{item.desc}</p>
                     </div>
                  </motion.div>
                ))}
             </div>
             <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group">
                <Image 
                  src="/blog-engineering.png" 
                  alt="Custom Web Apps"
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 mix-blend-screen"
                  style={{ maskImage: 'radial-gradient(circle at center, black 40%, transparent 95%)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent/20 to-transparent pointer-events-none" />
             </div>
          </div>
          
          <section className="relative py-32 overflow-hidden">
             {/* Nebula Backdrop */}
             <div className="absolute inset-0 pointer-events-none -z-10">
                <motion.div 
                   animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0], rotate: [0, 360], scale: [1, 1.2, 1] }}
                   transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                   className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 bg-indigo-500/20"
                />
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
             </div>

             <div className="max-w-5xl mx-auto px-4">
                <motion.div 
                   {...fadeUp()}
                   className="p-16 md:p-24 rounded-[50px] border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden group text-center"
                >
                   {/* Top Glowing Edge */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-700 group-hover:w-64" />
                   
                   <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">Need a <span className="gradient-text-primary">custom engine</span>?</h2>
                   <p className="text-xl mb-12 max-w-lg mx-auto font-medium leading-relaxed text-white/50">
                      We specialize in high-stakes engineering for products that demand precision and reliability.
                   </p>
                   <Link href="/contact?service=custom" className="px-12 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm transition-all hover:bg-white/90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] inline-flex items-center gap-2">
                      Request Feature Audit <ArrowRight size={18} />
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
