"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, Send, Clock, MessageSquare,
  Twitter, Linkedin, Instagram, ChevronDown, ChevronUp,
  CheckCircle2, ArrowRight,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  serviceType: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const SERVICES = [
  { value: "saas-development", label: "SaaS Development" },
  { value: "ai-solutions", label: "AI Solutions" },
  { value: "mvp-development", label: "MVP Development" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "business-networking", label: "Business Networking" },
  { value: "automation-systems", label: "Automation Systems" },
  { value: "landing-pages", label: "Landing Pages" },
  { value: "product-early-access", label: "Product Early Access" },
];

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@akronix.org",
    sub: "We reply within 24 hours",
    href: "mailto:hello@akronix.org",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 93607 45895",
    sub: "Mon–Sat, 9 AM – 7 PM IST",
    href: "tel:+919360745895",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Chennai, India",
    sub: "Tamil Nadu, IN 600001",
    href: "#",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "< 24 Hours",
    sub: "Guaranteed response",
    href: "#",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

const SOCIALS = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/akronix" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/akronix" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/akronix" },
];

const PROCESS = [
  { step: "01", title: "Submit Your Request", desc: "Fill the form with your project details and requirements." },
  { step: "02", title: "We Review & Respond", desc: "Our team reviews your request and gets back within 24 hours." },
  { step: "03", title: "Discovery Call", desc: "We schedule a free 30-min call to understand your vision." },
  { step: "04", title: "Proposal & Kickoff", desc: "Receive a tailored proposal and start building together." },
];

const FAQS = [
  {
    q: "How long does it take to start a project?",
    a: "Most projects kick off within 1–2 weeks after the initial discovery call and proposal approval.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes! We work with clients across 15+ countries. All communication happens over Zoom, email and Slack.",
  },
  {
    q: "What is the minimum project budget?",
    a: "Our projects start from ₹30,000 for landing pages. Custom SaaS and enterprise solutions are priced based on scope.",
  },
  {
    q: "Can I request changes after the project starts?",
    a: "Absolutely. We follow an agile process with regular check-ins and allow scope adjustments within reasonable bounds.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left border border-white/8 rounded-xl overflow-hidden transition-all"
    >
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-sm font-semibold text-white/80">{q}</span>
        {open ? <ChevronUp size={16} className="text-amber-400 shrink-0" /> : <ChevronDown size={16} className="text-white/30 shrink-0" />}
      </div>
      {open && (
        <div className="px-5 pb-4 text-sm text-white/50 leading-relaxed border-t border-white/5">
          {a}
        </div>
      )}
    </button>
  );
}

export default function ContactPage() {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { serviceType: requestedService || "" },
  });

  useEffect(() => {
    if (requestedService) setValue("serviceType", requestedService);
  }, [requestedService, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setSubmitted(true);
        reset();
        toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
      } else {
        toast({ title: "Error", description: result?.error || "Something went wrong.", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: String(err), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)" }}>
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container-xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold uppercase tracking-widest text-amber-400 mb-6">
              <MessageSquare size={12} />
              Contact Us
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] mb-6">
              Let&apos;s build something{" "}
              <span style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                extraordinary.
              </span>
            </h1>
            <p className="text-lg text-white/50 max-w-xl leading-relaxed">
              Have a visionary project in mind? Our team of experts is ready to help you architect, build, and scale your next big idea.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ── */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="container-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTACT_INFO.map((info, i) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${info.bg}`}>
                  <info.icon size={18} className={info.color} />
                </div>
                <p className="text-xs text-gray-400 font-medium mb-1">{info.label}</p>
                <p className="text-sm font-bold text-gray-900 mb-0.5">{info.value}</p>
                <p className="text-xs text-gray-400">{info.sub}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20 bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              {/* Process */}
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-6">What Happens Next?</h2>
                <div className="space-y-4">
                  {PROCESS.map((step, i) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                          {step.step}
                        </div>
                        {i < PROCESS.length - 1 && <div className="w-px flex-1 bg-gray-100 my-2" />}
                      </div>
                      <div className="pb-6">
                        <h4 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Connect With Us</h3>
                <div className="flex gap-3">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-900 hover:text-white transition-all"
                      aria-label={s.label}
                    >
                      <s.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-2">
                  {FAQS.map((faq) => (
                    <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right column: Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {submitted ? (
                <div className="bg-green-50 border border-green-100 rounded-3xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800"
                  >
                    Send another message <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <div className="bg-gray-900 rounded-3xl p-8 md:p-10">
                  <div className="mb-7">
                    <h2 className="text-xl font-black text-white mb-1">Start a Conversation</h2>
                    <p className="text-sm text-white/40">Fill out the form below and we&apos;ll be in touch shortly.</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-white/50">First Name *</label>
                        <input
                          {...register("firstName")}
                          placeholder="John"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                        {errors.firstName && <p className="text-xs text-red-400">{errors.firstName.message}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-white/50">Last Name *</label>
                        <input
                          {...register("lastName")}
                          placeholder="Doe"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                        {errors.lastName && <p className="text-xs text-red-400">{errors.lastName.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/50">Email Address *</label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="john@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                      {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/50">Company (optional)</label>
                      <input
                        {...register("company")}
                        placeholder="Your company name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/50">Service Required *</label>
                      <select
                        {...register("serviceType")}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
                      >
                        <option value="" className="bg-gray-900">Select a service…</option>
                        {SERVICES.map((s) => (
                          <option key={s.value} value={s.value} className="bg-gray-900">{s.label}</option>
                        ))}
                      </select>
                      {errors.serviceType && <p className="text-xs text-red-400">{errors.serviceType.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/50">How can we help? *</label>
                      <textarea
                        {...register("message")}
                        rows={4}
                        placeholder="Tell us about your project goals, timeline, and budget…"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                      />
                      {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)", boxShadow: "0 4px 20px rgba(245,158,11,0.3)" }}
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Message <Send size={14} />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-white/25">
                      By submitting, you agree to our{" "}
                      <a href="/policies" className="underline hover:text-white/50">Privacy Policy</a>.
                      We&apos;ll never share your data.
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
