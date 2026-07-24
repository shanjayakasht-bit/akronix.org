"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ServicePageTemplate from "@/components/ui/service-page-template";
import { Monitor, Smartphone, ShoppingBag, Palette, Zap, Star } from "lucide-react";

const offerings = [
  { icon: Monitor,     title: "Web Applications", desc: "Scalable, performant web apps built with modern full-stack frameworks." },
  { icon: Smartphone,  title: "Mobile Apps",      desc: "Cross-platform iOS & Android apps with native-level performance." },
  { icon: ShoppingBag, title: "E-Commerce",        desc: "Conversion-optimised storefronts and headless commerce solutions." },
  { icon: Palette,     title: "UI/UX Design",     desc: "Beautiful, user-tested interfaces that delight and convert." },
];

const steps = [
  { title: "Hook",    desc: "Grab attention with high-impact visuals and powerful headlines." },
  { title: "Explain", desc: "Clarify value and solve user pain points with precise copy." },
  { title: "Trust",   desc: "Establish authority with social proof and technical reliability." },
  { title: "Convert", desc: "Drive action with friction-less forms and persuasive CTAs." },
];

const features = [
  { title: "Psychology-Led Design",    desc: "Advanced visual cues and cognitive hierarchy that guide users to action with zero friction." },
  { title: "Blazing Fast Performance", desc: "Sub-second load times engineered to capture every single visitor without drop-off." },
  { title: "A/B Testing Ready",        desc: "Built with a technical framework to easily test headlines, CTAs, and layouts." },
  { title: "Fully Responsive",         desc: "A flawless, high-contrast experience across desktop, ultra-wide, and mobile devices." },
];

export default function LandingPagesPage() {
  return (
    <>
      <Navigation />
      <ServicePageTemplate
        badge="Web & Mobile Development"
        titlePre="Web & Mobile"
        titleHighlight="Mastery"
        subtitle="High-performance websites and mobile apps engineered to load fast, look stunning and drive real results."
        heroImage="/blog-landing.png"
        heroImageAlt="Web & Mobile Development"
        color="#D97706"
        colorDark="#B45309"
        colorSoft="#FFFBEB"
        colorBorder="#FDE68A"
        featureBadges={[
          { icon: Zap,      label: "Blazing Fast",  sub: "Sub-second load times, every page." },
          { icon: Palette,  label: "Pixel Perfect",  sub: "Design that converts visitors." },
          { icon: Star,     label: "5-Star Rated",   sub: "Loved by clients and users alike." },
        ]}
        offerings={offerings}
        steps={steps}
        featuresTitlePre="More Than a Website."
        featuresTitleHighlight="It's a Conversion"
        featuresTitlePost="Machine."
        featuresIntro="Every pixel is engineered with performance and persuasion in mind — not just looks."
        features={features}
        ctaTitlePre="Ready to Launch Your"
        ctaTitleHighlight="Next Project?"
        ctaHref="/contact?service=web-mobile-development"
        ctaLabel="Start Building"
      />
      <Footer />
    </>
  );
}
