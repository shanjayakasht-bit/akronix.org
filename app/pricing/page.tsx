"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Check, Zap, Rocket, Building2 } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Foundation",
    price: "₹49,000",
    billing: "per month",
    desc: "Perfect for founders seeking strategic guidance and high-intent networking.",
    icon: Zap,
    features: [
      "Expert Mentorship (Weekly)",
      "BNI-style Networking (Referrals)",
      "Technical Roadmap Planning",
      "Architecture Auditing",
      "Ecosystem Access",
      "Priority Startup Support",
    ],
    cta: "Start Your Journey",
    href: "/contact?plan=foundation",
    variant: "secondary",
  },
  {
    name: "Growth",
    price: "₹1,49,999",
    billing: "per campaign/project",
    desc: "Dominant digital marketing and high-performance execution for scaling.",
    icon: Rocket,
    features: [
      "Full Performance Marketing",
      "Conversion Rate Optimization (CRO)",
      "Rapid Landing Page Builds",
      "4x ROI-Focused Strategy",
      "SEO & Social Dominance",
      "Custom Ad Creative Systems",
      "Monthly Data Analytics",
    ],
    cta: "Accelerate Growth",
    href: "/contact?plan=growth",
    variant: "primary",
    popular: true,
  },
  {
    name: "Scale (SaaS)",
    price: "Custom",
    billing: "on demand",
    desc: "End-to-end SaaS platform engineering and enterprise systems.",
    icon: Building2,
    features: [
      "Full SaaS Development",
      "Multi-tenant Architecture",
      "6-week Core Delivery",
      "Enterprise-grade Security",
      "Advanced Billing Systems",
      "Custom Microservices",
      "24/7 Platform Maintenance",
    ],
    cta: "Contact Architecture Team",
    href: "/contact?plan=scale",
    variant: "secondary",
  },
];

export default function PricingPage() {
  const animations = {
    fadeUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
    stagger: {
      animate: {
        transition: {
          staggerChildren: 0.1
        }
      }
    }
  };

  return (
    <>
      <Navigation />
      <main className="bg-black text-white min-h-screen">
        <div className="pt-48 pb-32 relative overflow-hidden">
          {/* Background Ambient Glows */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-fuchsia-900/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="container-xl relative z-10">
            <div className="text-center max-w-5xl mx-auto mb-20">
              <motion.h1 
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
                 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight mb-10"
              >
                Predictable pricing for <span className="gradient-text-primary">unstoppable</span> growth.
              </motion.h1>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2, duration: 0.8 }}
                 className="text-xl text-white/40 leading-relaxed max-w-2xl mx-auto"
              >
                Choose the plan that fits your current stage. No hidden fees, just world-class engineering delivered at speed.
              </motion.p>
            </div>

            <motion.div 
              variants={animations.stagger}
              initial="initial"
              animate="animate"
              className="grid md:grid-cols-3 gap-8"
            >
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  variants={{
                    initial: { opacity: 0, y: 40, scale: 0.95 },
                    animate: { opacity: 1, y: 0, scale: 1 }
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "glass-card p-10 md:p-12 rounded-[48px] border-white/5 relative flex flex-col h-full hover:border-white/10 transition-colors duration-500 overflow-hidden group",
                    plan.popular && "ring-1 ring-fuchsia-500/30 shadow-[0_40px_100px_rgba(217,70,239,0.05)]"
                  )}
                >
                  {/* Internal Glow Effect */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-colors" />

                  {plan.popular && (
                    <div className="absolute top-8 right-8 px-4 py-1.5 bg-fuchsia-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-fuchsia-500/20">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-10 relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/10 text-indigo-400">
                          <plan.icon size={28} />
                       </div>
                       <span className="text-xs font-black text-white/30 uppercase tracking-[0.3em]">{plan.name}</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                      <span className="text-sm text-white/30 font-medium">/{plan.billing.split(" ").pop()}</span>
                    </div>
                    <p className="text-base text-white/50 leading-relaxed">{plan.desc}</p>
                  </div>

                  <div className="space-y-5 mb-12 flex-1 relative z-10">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={14} className="text-white/60" />
                        </div>
                        <span className="text-sm text-white/70 font-medium tracking-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href={plan.href} 
                    className={cn(
                      "w-full py-5 text-sm font-black rounded-2xl text-center transition-all relative z-10 overflow-hidden group/btn",
                      plan.variant === "primary" ? "bg-white text-black hover:bg-white/90" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                    )}
                  >
                    <span className="relative z-10">{plan.cta}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(" ");
}
