"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Users, 
  Rocket, 
  Lightbulb,
  ChevronRight,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const policySections = [
  {
    id: "overview",
    label: "Overview",
    icon: Shield,
    title: "Akronix Legal & Operational Overview",
    content: (
      <div className="space-y-6">
        <p className="text-white/70 leading-relaxed">
          Welcome to the official legal and operational framework of <span className="text-white font-bold">Akronix</span>. These policies govern our professional relationship and ensure absolute transparency in how we design, build, and scale digital products for our clients worldwide.
        </p>
        <p className="text-white/70 leading-relaxed">
          Located in Chennai, India, Akronix operates as a premium Digital Nomad Team specializing in SaaS Platform Development, MVP Development, AI & Automation, and comprehensive Digital Marketing. Our commitment is to provide enterprise-grade quality while maintaining the high velocity and agility of a startup.
        </p>
        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl mt-6">
          <h4 className="text-white font-bold mb-3">Our Core Commitments</h4>
          <ul className="space-y-3 text-white/70">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
              <span><strong>Excellence:</strong> Delivering cutting-edge, scalable solutions tailored to specific business goals.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
              <span><strong>Transparency:</strong> Maintaining clear communication regarding project timelines, budgets, and technical debt.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
              <span><strong>Security:</strong> Safeguarding client intellectual property, data, and sensitive configurations at all times.</span>
            </li>
          </ul>
        </div>
        <p className="text-white/70 leading-relaxed">
          By partnering with us, utilizing our services, or engaging in our ecosystem, you agree to the standards explicitly outlined in these policy documents. For direct inquiries, you can always reach us at <a href="mailto:admin@akronix.org" className="text-indigo-400 hover:text-indigo-300 transition-colors">admin@akronix.org</a> or via phone at +91 9360745895.
        </p>
      </div>
    )
  },
  {
    id: "referral",
    label: "Referral Network",
    icon: Users,
    title: "Referral Network Policy",
    content: (
      <div className="space-y-6">
        <p className="text-white/70 leading-relaxed">
          Our referral network is a cornerstone of the Akronix community, built on trust, mutual growth, and high-quality business introductions. We operate a structured, BNI-style networking model designed to systematically reward partners who help expand the Akronix ecosystem.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
            <h4 className="text-white font-bold mb-3">Reward Structure</h4>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Referral credits or financial compensations are officially processed only after a successful project kickoff and receipt of the initial milestone payment from the referred client.
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              Compensation tiers are generally based on the total estimated budget of the project (e.g., ₹2L to ₹15L+ ranges) and the level of involvement required to close the deal.
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
            <h4 className="text-white font-bold mb-3">Partner Obligations</h4>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Partners must maintain strict professional conduct. Misrepresentation of Akronix’s services, capabilities, or pricing will result in immediate removal from the network.
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              We highly value warm, well-contextualized introductions over cold leads. Ensure the referred party is aware of Akronix's expertise before connecting us.
            </p>
          </div>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-2xl mt-6">
          <h4 className="text-white font-bold mb-2">Network Audits</h4>
          <p className="text-white/70 leading-relaxed text-sm">
            Akronix reserves the right to audit referral quality regularly. Inactive partners or those consistently providing poor-fit leads may have their referral agreements re-evaluated. If you're interested in formalizing a partnership, contact our alliance team at <a href="mailto:admin@akronix.org" className="text-indigo-400">admin@akronix.org</a>.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "execution",
    label: "Akronix Startup Execution",
    icon: Rocket,
    title: "Startup Execution Dynamics",
    content: (
      <div className="space-y-6">
        <p className="text-white/70 leading-relaxed">
          We execute with relentless velocity. Our standard engagement contracts are crafted to define exact boundaries around sprint cycles, intellectual property (IP), deployment, and technical debt management to ensure your product gets to market rapidly and securely.
        </p>
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <h4 className="text-white font-bold mb-2 text-lg">1. Agile Development Sprints</h4>
            <p className="text-white/60 leading-relaxed">
              We operate in focused, iterative sprints (typically 1-2 weeks). Regular reviews and agile adjustments guarantee we remain perfectly aligned with your evolving market needs. Clients are expected to provide timely feedback within 48 hours of a sprint demo to avoid blocking development progress.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <h4 className="text-white font-bold mb-2 text-lg">2. IP Ownership & Handover</h4>
            <p className="text-white/60 leading-relaxed">
              We believe your product is yours. Full codebase, deployment configurations, and asset ownership are meticulously documented and legally transferred to the client upon the completion of agreed milestones and the clearance of final payments. Until final payment clears, Akronix retains a lien on the developed code.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <h4 className="text-white font-bold mb-2 text-lg">3. Maintenance & Retainers</h4>
            <p className="text-white/60 leading-relaxed">
              Post-launch, we offer dedicated maintenance retainers ranging from immediate bug-fixes to new feature development. Standard Service Level Agreements (SLAs) come with a response time guarantee of under 24 hours.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "innovation",
    label: "Innovation Events",
    icon: Lightbulb,
    title: "Innovation & Ecosystem Events",
    content: (
      <div className="space-y-6">
        <p className="text-white/70 leading-relaxed">
          As leaders in the tech ecosystem, Akronix regularly hosts and participates in internal hackathons, broader ecosystem meetups, and high-intensity design sprints. Active engagement in these events is governed by our strict community guidelines to prioritize inclusive, safe, and wildly collaborative environments.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
             <h4 className="text-white font-bold mb-2">Confidentiality</h4>
             <p className="text-sm text-white/60 leading-relaxed">
               Participants agree to openly share general insights and methodologies while fiercely respecting the confidential, proprietary data of our active partners and enterprise clients. Breaking NDA or sharing private code during hackathons leads to immediate expulsion.
             </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
             <h4 className="text-white font-bold mb-2">Open Source Contributions</h4>
             <p className="text-sm text-white/60 leading-relaxed">
               We strongly encourage contributing generic tools, libraries, or boilerplates generated during innovation events back to the open-source community, provided they do not contain specific client business logic or secrets.
             </p>
          </div>
        </div>
        <p className="text-white/70 leading-relaxed mt-4">
          Want to co-host an event, mentor at our next hackathon, or sponsor a tech-meetup in Chennai? Drop our community team a comprehensive plan at <a href="mailto:admin@akronix.org" className="text-indigo-400 hover:text-indigo-300 transition-colors">admin@akronix.org</a>.
        </p>
      </div>
    )
  }
];

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const animations = {
    fadeUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
    },
    stagger: {
      animate: {
        transition: {
          staggerChildren: 0.1
        }
      }
    }
  };

  const currentSection = policySections.find(s => s.id === activeTab) || policySections[0];

  return (
    <>
      <Navigation />
      <main 
        className="min-h-screen pt-40 pb-32 relative overflow-hidden"
        style={{ 
          background: "radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.08) 0%, rgba(0, 0, 0, 1) 70%)",
          backgroundColor: "#000"
        }}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container-xl text-center mb-28 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={animations.stagger}
            className="flex flex-col items-center gap-8"
          >
            <motion.div 
              variants={animations.fadeUp}
              className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400"
            >
              <Shield size={24} />
            </motion.div>
            
            <motion.h1 
              variants={animations.fadeUp}
              className="text-6xl md:text-8xl lg:text-7xl font-black tracking-tighter flex items-center justify-center gap-6"
            >
              <span className="text-white">Our</span>
              <span 
                className="inline-block bg-clip-text text-transparent leading-none py-4"
                style={{ 
                  backgroundImage: "linear-gradient(to right, #A855F7, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent"
                }}
              >
                Policies
              </span>
            </motion.h1>
            
            <motion.div 
              variants={animations.fadeUp}
              className="flex items-center gap-3 text-white/40 text-sm font-bold tracking-[0.1em]"
            >
               Last updated: March 22, 2026.
            </motion.div>
          </motion.div>
        </div>

        {/* Layout Grid */}
        <div className="container-xl relative z-10">
           <div className="grid lg:grid-cols-[320px_1fr] gap-12 items-start">
              
              {/* Sidebar Navigation */}
              <motion.div 
                variants={animations.stagger}
                initial="initial"
                animate="animate"
                className="flex flex-col gap-2"
              >
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/10 mb-4 px-6 uppercase">Navigation</p>
                 <div className="space-y-2">
                    {policySections.map((section) => (
                      <motion.button
                        key={section.id}
                        variants={{
                          initial: { opacity: 0, x: -20 },
                          animate: { opacity: 1, x: 0 }
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => setActiveTab(section.id)}
                        className={cn(
                          "w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-350 group text-left",
                          activeTab === section.id 
                            ? "bg-[#1A1A3A]/40 border border-indigo-500/30 text-white shadow-[0_0_30px_rgba(99,102,241,0.1)]" 
                            : "text-white/30 hover:text-white/50 hover:bg-white/[0.02] border border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-4">
                           <section.icon size={18} className={cn(
                              "transition-transform duration-300 group-hover:scale-110",
                              activeTab === section.id ? "text-indigo-400" : "text-white/15"
                           )} />
                           <span className={cn(
                              "text-sm font-bold tracking-tight",
                              activeTab === section.id ? "text-white" : "text-white/40"
                           )}>{section.label}</span>
                        </div>
                        {activeTab === section.id && (
                           <ChevronRight size={14} className="text-indigo-400/50" />
                        )}
                      </motion.button>
                    ))}
                 </div>
              </motion.div>

              {/* Content Card */}
              <AnimatePresence mode="wait">
                 <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, scale: 0.96, y: 15, rotateX: 5 }}
                   animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                   exit={{ opacity: 0, scale: 0.96, y: -15, rotateX: -5 }}
                   transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                   className="rounded-[40px] bg-[#0A0A1A] border border-white/[0.04] p-10 md:p-14 lg:p-20 relative overflow-hidden shadow-2xl"
                   style={{ perspective: "1000px" }}
                 >
                    {/* Background Detail */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/[0.03] blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    
                    <div className="relative z-10">
                       <h2 className="text-4xl font-black mb-12 text-white/90">
                          {currentSection.title}
                       </h2>
                       <div className="text-lg text-white/60">
                          {currentSection.content}
                       </div>
                    </div>
                 </motion.div>
              </AnimatePresence>

           </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
