"use client";
 
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
 
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  serviceType: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
 
type FormData = z.infer<typeof formSchema>;
 
export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceType: "saas-development",
    }
  });
 
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
 
      const result = await response.json();
      console.log("API RESPONSE:", response.status, result);
 
      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        reset();
      } else {
        toast({
          title: "Error",
          description: result?.error || result?.detail || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
      toast({
        title: "Error",
        description: String(err),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-950/10 blur-[120px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-950/10 blur-[120px] rounded-full -z-10 -translate-x-1/2 translate-y-1/2" />
 
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-cyan-700 mb-6 font-mono">
              <MessageSquare size={14} />
              <span>Contact Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Let&apos;s build something <span className="gradient-text-primary">extraordinary</span>.
            </h1>
            <p className="text-lg text-white/60 mb-12 max-w-lg leading-relaxed">
              Have a visionary project in mind? Our team of experts is ready to help you architect, build, and scale your next big idea.
            </p>
 
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-700 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/40 mb-1">Email us</p>
                    <a href="mailto:hello@akronix.io" className="text-white hover:text-cyan-700 transition-colors">hello@akronix.io</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-700 shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/40 mb-1">Call us</p>
                    <a href="tel:+1234567890" className="text-white hover:text-cyan-700 transition-colors">+1 (234) 567-890</a>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-700 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/40 mb-1">Visit us</p>
                    <p className="text-white">Silicon Valley, CA<br />Digital Nomad Team</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-700 shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/40 mb-1">Response time</p>
                    <p className="text-white">&lt; 24 Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
 
          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 md:p-10 rounded-2xl border-white/10"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 ml-1">First Name</label>
                  <input
                    {...register("firstName")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-900/50 transition-all"
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-xs text-red-400 mt-1 ml-1">{errors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 ml-1">Last Name</label>
                  <input
                    {...register("lastName")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-900/50 transition-all"
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-xs text-red-400 mt-1 ml-1">{errors.lastName.message}</p>}
                </div>
              </div>
 
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1">Email Address</label>
                <input
                  {...register("email")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-900/50 transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1 ml-1">{errors.email.message}</p>}
              </div>
 
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1">Service Required</label>
                <select
                  {...register("serviceType")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-900/50 transition-all appearance-none"
                >
                  <option value="saas-development" className="bg-neutral-900">SaaS Development</option>
                  <option value="mvp-development" className="bg-neutral-900">MVP Development</option>
                  <option value="landing-pages" className="bg-neutral-900">Landing Pages</option>
                  <option value="custom-web-app" className="bg-neutral-900">Custom Web App</option>
                  <option value="ai-automation" className="bg-neutral-900">AI & Automation</option>
                </select>
              </div>
 
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1">How can we help?</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-900/50 transition-all resize-none"
                  placeholder="Tell us about your project goals..."
                />
                {errors.message && <p className="text-xs text-red-400 mt-1 ml-1">{errors.message.message}</p>}
              </div>
 
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-sm font-bold flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
