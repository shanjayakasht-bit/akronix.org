"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Code2, Rocket, Globe, Terminal, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    icon: Code2,
    title: "SaaS Development",
    desc: "Complete SaaS ecosystem with auth, billing, and scalable backend.",
    href: "/services/saas-development",
    bg: "/blog-cloud.png",
    color: "#5B4DFF",
  },
  {
    icon: Rocket,
    title: "MVP Development",
    desc: "Fast-track your product to market with a high-fidelity MVP.",
    href: "/services/mvp-development",
    bg: "/blog-engineering.png",
    color: "#F08A8A",
  },
  {
    icon: Globe,
    title: "Landing Pages",
    desc: "Conversion-optimized landing pages that turn visitors into fans.",
    href: "/services/landing-pages",
    bg: "/blog-design.png",
    color: "#7DD3FC",
  },
  {
    icon: Terminal,
    title: "Custom Web Apps",
    desc: "Tailor-made web applications for your specific business needs.",
    href: "/services/custom-web-app",
    bg: "/blog-strategy.png",
    color: "#9B8FFF",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black text-white min-h-screen pt-32 pb-24">
        <div className="container-xl">
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black mb-6"
            >
              Our <span className="gradient-text-primary">Expertise</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/50 text-lg max-w-2xl mx-auto"
            >
              We offer a range of premium digital services to help your business grow.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Link key={i} href={service.href} className="group h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative h-[450px] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image 
                      src={service.bg} 
                      alt={service.title}
                      fill
                      className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-50 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                      style={{ background: `${service.color}20`, border: `1px solid ${service.color}40`, color: service.color }}>
                      <service.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-6">{service.desc}</p>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors"
                      style={{ color: service.color }}>
                      Learn More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
