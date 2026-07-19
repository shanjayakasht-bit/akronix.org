"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ServicePageTemplate from "@/components/ui/service-page-template";
import { ShieldCheck, Cloud, Shield, Settings2, Award, Map } from "lucide-react";

const offerings = [
  { icon: ShieldCheck, title: "IT Strategy & Roadmap", desc: "Align your technology stack with long-term business vision and goals." },
  { icon: Cloud,        title: "Cloud Architecture",    desc: "Design and migrate to scalable, secure cloud infrastructure on AWS, Azure or GCP." },
  { icon: Shield,       title: "Security & Compliance", desc: "Audit, harden and maintain your systems to meet modern security standards." },
  { icon: Settings2,    title: "System Architecture",   desc: "Design robust, maintainable technical blueprints for complex business systems." },
];

const steps = [
  { title: "Assess",     desc: "We audit your current systems, infrastructure and processes in detail." },
  { title: "Strategise", desc: "Build a prioritised, phased technology roadmap for your organisation." },
  { title: "Implement",  desc: "Our engineers execute the plan with rigorous QA and zero-downtime delivery." },
  { title: "Optimise",   desc: "Continuous monitoring, cost reviews and iterative improvements post-launch." },
];

const features = [
  { title: "Technology Audit",           desc: "Deep analysis of your existing stack to identify gaps, risks and improvement areas." },
  { title: "Digital Transformation",     desc: "Guided migration from legacy systems to modern, cloud-native architectures." },
  { title: "Security Hardening",         desc: "Comprehensive security reviews, penetration testing and compliance frameworks." },
  { title: "Vendor & Cost Optimisation", desc: "Reduce cloud spend and vendor lock-in with smarter procurement strategy." },
];

const stats = [
  { value: "50+",  label: "Consulting Projects" },
  { value: "100%", label: "On-Time Delivery" },
  { value: "40%",  label: "Average Cost Savings" },
  { value: "15+",  label: "Tech Stacks" },
];

export default function ITConsultingPage() {
  return (
    <>
      <Navigation />
      <ServicePageTemplate
        badge="IT Consulting"
        titlePre="Strategy. Systems."
        titleHighlight="Scale."
        subtitle="End-to-end technology consulting to align your IT with business growth — from audit to execution."
        heroImage="/blog-strategy.png"
        heroImageAlt="IT Consulting"
        color="#4F46E5"
        colorDark="#4338CA"
        colorSoft="#EEF2FF"
        colorBorder="#E0E7FF"
        featureBadges={[
          { icon: ShieldCheck, label: "Trusted Advisors", sub: "Strategy grounded in experience." },
          { icon: Map,         label: "Clear Roadmaps",    sub: "No guesswork, just a plan." },
          { icon: Award,       label: "Proven Delivery",   sub: "100% on-time track record." },
        ]}
        floatingStats={[
          { icon: Award,       value: "50+",  label: "Consulting Projects" },
          { icon: ShieldCheck, value: "100%", label: "On-Time Delivery" },
          { icon: Map,         value: "40%",  label: "Average Cost Savings" },
          { icon: Settings2,   value: "15+",  label: "Tech Stacks" },
        ]}
        offerings={offerings}
        steps={steps}
        featuresTitlePre="More Than Advice."
        featuresTitleHighlight="It's a Technical"
        featuresTitlePost="Foundation."
        featuresIntro="We partner with your team to build resilient, secure and cost-efficient technology from the ground up."
        features={features}
        stats={stats}
        ctaTitlePre="Ready to Transform Your"
        ctaTitleHighlight="Technology?"
        ctaHref="/contact?service=it-consulting"
        ctaLabel="Get a Free Audit"
      />
      <Footer />
    </>
  );
}
