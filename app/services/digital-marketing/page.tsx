"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ServicePageTemplate from "@/components/ui/service-page-template";
import { Search, Megaphone, BarChart2, Share2, TrendingUp, Target, Users } from "lucide-react";

const offerings = [
  { icon: Search,    title: "SEO & SEM",         desc: "Dominate search rankings with technical SEO and precision paid campaigns." },
  { icon: Share2,    title: "Social Media",       desc: "Content strategy and community management across all major platforms." },
  { icon: Megaphone, title: "Google & Meta Ads",  desc: "High-ROAS ad campaigns engineered for maximum conversion at scale." },
  { icon: BarChart2, title: "Content & Growth",   desc: "Long-form content, email sequences and growth loops that compound." },
];

const steps = [
  { title: "Capture Lead", desc: "Zero-friction sign-up workflows that convert visitors at the entry point." },
  { title: "Analyze",      desc: "Data feeds directly into our analytics suite for deep behavioral insights." },
  { title: "Target",       desc: "Automated campaigns based on specific user behavior and lifecycle triggers." },
  { title: "ROI Track",    desc: "Full visibility into campaign success through integrated reporting." },
];

const features = [
  { title: "Conversion Optimization",   desc: "Built-in tools for landing page performance tracking and A/B testing to maximize user action." },
  { title: "Multi-Channel Integration", desc: "API-first design allows seamless connection to CRM and email marketing tools." },
  { title: "User Lifecycle Tracking",   desc: "Detailed mapping of the user journey from initial sign-up to premium upgrade." },
  { title: "Growth Ecosystem",          desc: "A full suite of tools designed to convert visitors into long-term, loyal subscribers." },
];

export default function DigitalMarketingPage() {
  return (
    <>
      <Navigation />
      <ServicePageTemplate
        badge="Digital Marketing"
        titlePre="Growth"
        titleHighlight="Marketing"
        titlePost="Engines"
        subtitle="Data-driven marketing strategies that increase visibility, generate qualified leads and compound growth over time."
        heroImage="/blog-marketing.png"
        heroImageAlt="Digital Marketing"
        color="#16A34A"
        colorDark="#15803D"
        colorSoft="#F0FDF4"
        colorBorder="#DCFCE7"
        featureBadges={[
          { icon: Target,     label: "Precision Targeting", sub: "Reach the right audience, every time." },
          { icon: TrendingUp, label: "Proven ROI",           sub: "Data-backed growth strategies." },
          { icon: Users,      label: "Full-Funnel",          sub: "From awareness to conversion." },
        ]}
        offerings={offerings}
        steps={steps}
        featuresTitlePre="More Than Ads."
        featuresTitleHighlight="It's Compounding"
        featuresTitlePost="Growth."
        featuresIntro="We build marketing systems that get smarter and more efficient with every campaign."
        features={features}
        ctaTitlePre="Ready to Accelerate Your"
        ctaTitleHighlight="Growth?"
        ctaHref="/contact?service=digital-marketing"
        ctaLabel="Start Your Campaign"
      />
      <Footer />
    </>
  );
}
