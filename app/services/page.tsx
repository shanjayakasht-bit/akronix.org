"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    title: "SaaS Development",
    desc: "Multi-tenant platforms with enterprise-grade auth, billing, and analytics built for 1M+ users.",
    href: "/services/saas-development",
    bg: "/blog-cloud.png",
    color: "#00F0FF",
  },
  {
    title: "AI Solutions",
    desc: "Custom AI chatbots, automation workflows, and intelligent business assistants that 10x operations.",
    href: "/services/ai-automation",
    bg: "/blog-ai.png",
    color: "#00F0FF",
  },
  {
    title: "MVP Development",
    desc: "Investor-grade products from idea to production in under 30 days. Rapid. Reliable. Revenue-ready.",
    href: "/services/mvp-development",
    bg: "/blog-engineering.png",
    color: "#9D5BFF",
  },
  {
    title: "Digital Marketing",
    desc: "SEO, performance marketing, funnel optimization, and branding that drives real revenue growth.",
    href: "/services/digital-marketing",
    bg: "/blog-marketing.png",
    color: "#FF3366",
  },
  {
    title: "Business Networking",
    desc: "BNI-style strategic ecosystem helping businesses connect, generate referrals, and scale together.",
    href: "/services/business-networking",
    bg: "/blog-networking.png",
    color: "#3399FF",
  },
  {
    title: "Automation Systems",
    desc: "HRMS, CRM, school ERP, clinic management, restaurant systems built to replace manual chaos.",
    href: "/services/automation",
    bg: "/blog-automation.png",
    color: "#9D5BFF",
  },
  {
    title: "Landing Pages",
    desc: "High-converting, psychological-led digital experiences designed to maximize your ROI.",
    href: "/services/landing-pages",
    bg: "/blog-landing.png",
    color: "#A5B4FC",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black text-white min-h-screen pt-24 pb-16 relative overflow-hidden">
        {/* Deep ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[100px] pointer-events-none" />

        <div className="container-xl relative z-10">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-black mb-6 leading-tight tracking-tight"
            >
              Building the <span className="gradient-text-primary">Next Generation</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              We don&apos;t just build apps. We architect scalable ecosystems that dominate their category.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, i) => {
              return (
                <Link key={i} href={service.href} className="group h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="relative h-[480px] rounded-[32px] overflow-hidden border border-white/5 group-hover:border-cyan-500/30 transition-all duration-700 bg-white/[0.01] hover:bg-white/[0.02]"
                  >
                    {/* Background Visual Layer */}
                    <div className="absolute inset-x-0 top-0 h-2/3 z-0">
                       <Image 
                         src={service.bg} 
                         alt={service.title}
                         fill
                         className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                       
                       {/* Animated Scan Line */}
                       <motion.div 
                          animate={{ y: ["0%", "200%"] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-cyan-400/0 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100"
                       />
                    </div>

                    {/* Content Section */}
                    <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                      <div className="mt-auto">
                        <div className="flex items-center gap-2 mb-3">
                           <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors tracking-tight">{service.title}</h3>
                        </div>
                        <p className="text-sm text-white/30 group-hover:text-white/50 transition-colors duration-500 mb-6 leading-relaxed font-medium">
                          {service.desc}
                        </p>
                        
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: service.color }}>
                               Explore Path <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                           </div>
                           
                           {/* Micro-spark visual */}
                           <div className="w-8 h-px bg-white/5 rounded-full group-hover:w-16 group-hover:bg-cyan-500/50 transition-all duration-700" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
