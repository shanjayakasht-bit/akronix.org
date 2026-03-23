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
      <main className="bg-black text-white pt-32 pb-24">
        <div className="container-xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
              Enterprise-grade <span className="gradient-text-primary">SaaS Systems</span> built for global scale.
            </h1>
            <p className="text-xl text-white/50 mb-12 max-w-2xl leading-relaxed">
              We build complete, multi-tenant SaaS platforms with secure authentication, automated billing, and high-performance infrastructure.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
             <div className="space-y-8">
                {[
                  { title: "Multi-tenant Architecture", desc: "Isolate customer data while sharing resources efficiently." },
                  { title: "Subscription Management", desc: "Integrated Stripe/Paddle for tiered billing and seat-based pricing." },
                  { title: "Advanced Analytics", desc: "Real-time insights for your users and your business metrics." },
                  { title: "API-First Design", desc: "Built with modern APIs for easy integration and ecosystem growth." },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                     <div className="w-6 h-6 rounded-full bg-fuchsia-900/20 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle size={14} className="text-cyan-700" />
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
                  src="/blog-cloud.png" 
                  alt="SaaS Platform"
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
                   animate={{ x: [0, -60, 60, 0], y: [0, 40, -40, 0], rotate: [360, 0], scale: [1, 1.3, 1] }}
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
                   
                   <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">Ready to launch your <span className="gradient-text-primary">platform</span>?</h2>
                   <p className="text-xl mb-12 max-w-lg mx-auto font-medium leading-relaxed text-white/50">
                      Our architecture is designed to handle users from 1 to 1 million without a sweat.
                   </p>
                   <Link href="/contact?service=saas" className="px-12 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm transition-all hover:bg-white/90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] inline-flex items-center gap-2">
                      Schedule a Deep Dive <ArrowRight size={18} />
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
