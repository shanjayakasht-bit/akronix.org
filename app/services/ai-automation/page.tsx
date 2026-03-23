"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ── Variants ─────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function AIAutomationPage() {
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
              Next-gen <span className="gradient-text-primary">AI & Automation</span> for the modern enterprise.
            </h1>
            <p className="text-xl text-white/50 mb-12 max-w-2xl leading-relaxed">
              We integrate cutting-edge LLMs and automation engines into your products to reduce manual labor and unlock exponential productivity.
            </p>
          </motion.div>

          {/* Core Features */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
             <div className="space-y-8">
                {[
                  { title: "LLM & RAG Integration", desc: "Build custom AI agents that talk to your data with precision and zero hallucination." },
                  { title: "Workflow Automation", desc: "Automate repetitive business processes with intelligent, self-repairing pipelines." },
                  { title: "Predictive Analytics", desc: "Turn raw data into actionable foresight with custom machine learning models." },
                  { title: "AI-Powered UI/UX", desc: "Interfaces that learn from user behavior to provide personalized experiences." },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                     <div className="w-6 h-6 rounded-full bg-cyan-600/20 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle size={14} className="text-cyan-400" />
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
                  src="/blog-ai.png" 
                  alt="AI Automation"
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
                   animate={{ x: [-60, 60, -60], y: [40, -40, 40], rotate: [360, 0], scale: [1, 1.3, 1] }}
                   transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                   className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[180px] opacity-20 bg-cyan-500/10"
                />
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
             </div>

             <div className="max-w-5xl mx-auto px-4">
                <motion.div 
                   {...fadeUp()}
                   className="p-16 md:p-24 rounded-[50px] border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden group text-center"
                >
                   {/* Top Glowing Edge */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-700 group-hover:w-64" />
                   
                   <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">Future-proof your <span className="gradient-text-primary">Business</span>.</h2>
                   <p className="text-xl mb-12 max-w-lg mx-auto font-medium leading-relaxed text-white/50">
                      We help you navigate the AI landscape and build practical, ROI-focused solutions.
                   </p>
                   <Link href="/contact?service=ai" className="px-12 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm transition-all hover:bg-white/90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] inline-flex items-center gap-2">
                       Explore AI Workflows <Sparkles size={18} />
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
