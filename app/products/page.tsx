"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Users, 
  Bot, 
  BarChart3, 
  Plane, 
  Rocket, 
  Check, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

const products = [
  {
    title: "Akronix CRM",
    desc: "AI-first CRM for modern sales teams. Pipeline management, deal intelligence, and automated follow-ups that close more deals.",
    icon: Briefcase,
    features: [
      "AI lead scoring & prioritization",
      "Pipeline automation",
      "WhatsApp & email integration",
      "Revenue forecasting",
      "Mobile-first design"
    ],
    color: "#9D5BFF"
  },
  {
    title: "Akronix HRMS",
    desc: "Complete HR management — payroll, attendance, leaves, appraisals, and compliance automation for growing teams.",
    icon: Users,
    features: [
      "Payroll automation & tax compliance",
      "Biometric attendance tracking",
      "Performance review cycles",
      "Leave management",
      "Compliance reports"
    ],
    color: "#9D5BFF"
  },
  {
    title: "Akronix AI Assistant",
    desc: "Your business's AI brain — trained on your data to answer queries, automate tasks, and surface actionable insights instantly.",
    icon: Bot,
    features: [
      "Custom knowledge base training",
      "Multi-channel (web, WhatsApp, Slack)",
      "API integrations with your stack",
      "Real-time analytics dashboard",
      "Escalation workflows"
    ],
    color: "#9D5BFF"
  },
  {
    title: "Akronix Analytics",
    desc: "Unified business intelligence connecting all your data sources into one powerful real-time dashboard with AI anomaly detection.",
    icon: BarChart3,
    features: [
      "Real-time dashboards",
      "50+ data source connectors",
      "AI anomaly detection",
      "Custom report builder",
      "Alerts and forecasting"
    ],
    color: "#9D5BFF"
  },
  {
    title: "Akronix Booking Engine",
    desc: "White-label travel and appointment booking with AI pricing, real-time inventory sync, and payment orchestration.",
    icon: Plane,
    features: [
      "White-label for any business",
      "AI dynamic pricing engine",
      "Multi-gateway payment support",
      "Real-time inventory sync",
      "B2B and B2C portals"
    ],
    color: "#9D5BFF"
  }
];

export default function ProductsPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#020205] text-white min-h-screen pt-32 pb-24 relative overflow-hidden">
        {/* Deep ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-purple-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[100px] pointer-events-none" />

        <div className="container-xl relative z-10 px-6">
          <div className="max-w-3xl mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-purple-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-400">Our Ecosystem</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black mb-8 leading-[0.95] tracking-tight italic uppercase"
            >
              The Next Era of <br />
              <span className="gradient-text-primary">Enterprise Software</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/40 max-w-2xl leading-relaxed"
            >
              We are building a suite of interconnected AI-first products designed to automate every facet of your business operations.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative p-8 rounded-[2.5rem] border border-white/[0.05] bg-white/[0.02] backdrop-blur-3xl hover:bg-white/[0.04] transition-all duration-500 flex flex-col h-full"
              >
                {/* Badge */}
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[9px] font-black uppercase tracking-widest text-purple-400 shadow-[0_0_15px_rgba(157,91,255,0.2)]">
                    Coming Soon
                  </span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-purple-500/50 transition-all duration-500">
                  <product.icon size={28} className="text-purple-400" />
                </div>

                <h3 className="text-2xl font-black mb-4 text-white/90 group-hover:text-white transition-colors tracking-tight">
                  {product.title}
                </h3>
                
                <p className="text-sm text-white/30 leading-relaxed mb-8 group-hover:text-white/50 transition-colors">
                  {product.desc}
                </p>

                <div className="space-y-3 mt-auto">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="shrink-0 w-4 h-4 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                        <Check size={10} className="text-cyan-400" />
                      </div>
                      <span className="text-[11px] font-medium text-white/40 group-hover:text-white/60 transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Subtle bottom glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            ))}

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative p-8 rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-br from-purple-600/10 to-cyan-600/10 backdrop-blur-3xl flex flex-col items-center justify-center text-center overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 relative shadow-2xl">
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Rocket size={36} className="text-white" />
                </motion.div>
                <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-pulse" />
              </div>

              <h3 className="text-2xl font-black mb-4 text-white">More Products Coming</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-8 max-w-[240px]">
                Join our early access waitlist to be the first to try new Akronix products.
              </p>

              <Link
                href="/contact?service=automation-systems"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(157,91,255,0.4)] active:scale-95 flex items-center gap-2"
              >
                Get Early Access <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
