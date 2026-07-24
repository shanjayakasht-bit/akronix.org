"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ServicePageTemplate from "@/components/ui/service-page-template";
import { Layers, Key, Globe, BarChart3 } from "lucide-react";

const offerings = [
  { icon: Layers,    title: "Custom SaaS Build",     desc: "End-to-end development of multi-tenant platforms from idea to production." },
  { icon: Key,       title: "White-Label Solutions", desc: "Rebrandable SaaS products ready to deploy under your brand." },
  { icon: Globe,     title: "API & Integrations",    desc: "REST/GraphQL APIs and third-party integrations that extend your ecosystem." },
  { icon: BarChart3, title: "Analytics & BI",        desc: "Embedded dashboards and business intelligence for you and your users." },
];

const steps = [
  { title: "Sign Up",           desc: "Create your account and onboard in minutes with zero friction." },
  { title: "Configure",         desc: "Tailor your workspace, integrations, and permissions to fit your needs." },
  { title: "Process",           desc: "Our engine handles scale, billing, and analytics in real time." },
  { title: "Deliver & Improve", desc: "Ship to users, track metrics, and iterate with confidence at any scale." },
];

const features = [
  { title: "Multi-tenant Architecture", desc: "Isolate customer data while sharing resources efficiently with advanced sharding." },
  { title: "Subscription Management",   desc: "Integrated Stripe/Paddle for tiered billing and seat-based pricing engines." },
  { title: "Advanced Analytics",        desc: "Real-time insights for your users and your business metrics via custom dashboards." },
  { title: "API-First Design",          desc: "Built with modern APIs for easy integration and third-party ecosystem growth." },
];

export default function SaasDevelopmentPage() {
  return (
    <>
      <Navigation />
      <ServicePageTemplate
        badge="SaaS Development"
        titlePre="Enterprise"
        titleHighlight="SaaS"
        titlePost="Systems"
        subtitle="We design, build and scale multi-tenant SaaS platforms engineered for growth, security and long-term reliability."
        heroImage="/blog-engineering.png"
        heroImageAlt="SaaS Platform Development"
        color="#2563EB"
        colorDark="#1D4ED8"
        colorSoft="#EFF6FF"
        colorBorder="#DBEAFE"
        featureBadges={[
          { icon: Layers, label: "Multi-Tenant Ready", sub: "Isolated, scalable architecture." },
          { icon: Key,    label: "White-Label",        sub: "Launch under your own brand." },
          { icon: Globe,  label: "API-First",          sub: "Built for integrations." },
        ]}
        offerings={offerings}
        steps={steps}
        featuresTitlePre="More Than Software."
        featuresTitleHighlight="It's Infrastructure"
        featuresTitlePost="You Can Trust."
        featuresIntro="We don't just ship features — we build resilient, secure systems that scale with your business."
        features={features}
        ctaTitlePre="Ready to Build Your"
        ctaTitleHighlight="SaaS Platform?"
        ctaHref="/contact?service=saas-development"
        ctaLabel="Start Your Project"
      />
      <Footer />
    </>
  );
}
