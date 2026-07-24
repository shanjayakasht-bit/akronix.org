"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ServicePageTemplate from "@/components/ui/service-page-template";
import { Bot, Workflow, TrendingUp, Plug, Brain, Zap } from "lucide-react";

const offerings = [
  { icon: Bot,        title: "AI Chatbots",           desc: "Custom-trained conversational AI for support, sales and onboarding." },
  { icon: Workflow,   title: "Workflow Automation",   desc: "End-to-end process automation that eliminates repetitive manual tasks." },
  { icon: TrendingUp, title: "Business Intelligence", desc: "AI-powered dashboards and predictive analytics for smarter decisions." },
  { icon: Plug,       title: "AI Integrations",       desc: "Plug OpenAI, Gemini, Claude and custom models into your existing stack." },
];

const steps = [
  { title: "Ingest Data",    desc: "Process raw information in real-time as it flows through your systems." },
  { title: "Interpret",      desc: "Our AI engine translates data into actionable insights." },
  { title: "Analyze",        desc: "Identify patterns and predict outcomes before they happen." },
  { title: "Executive Dash", desc: "Deliver high-level visual summaries for strategic decision-making." },
];

const features = [
  { title: "Actionable Insights", desc: "Converts raw data into visual summaries and trend predictions with high precision." },
  { title: "Predictive Scaling",  desc: "Analyzes patterns to anticipate spikes before they happen, ensuring zero downtime." },
  { title: "Anomaly Detection",   desc: "Real-time monitoring to identify irregularities or inconsistencies as they arise." },
  { title: "Intelligent Layer",   desc: "Core AI integration within your architecture for seamless data processing." },
];

export default function AiAutomationPage() {
  return (
    <>
      <Navigation />
      <ServicePageTemplate
        badge="AI & Automation"
        titlePre="Intelligent"
        titleHighlight="AI"
        titlePost="Layers"
        subtitle="Automate operations and enhance productivity with AI-powered solutions built into the core of your business."
        heroImage="/blog-ai.png"
        heroImageAlt="AI & Automation"
        color="#E11D48"
        colorDark="#BE123C"
        colorSoft="#FFF1F2"
        colorBorder="#FFE4E6"
        featureBadges={[
          { icon: Brain, label: "Custom-Trained AI", sub: "Models built for your data." },
          { icon: Zap,   label: "Zero Manual Work",   sub: "Automate the repetitive stuff." },
          { icon: Plug,  label: "Plug & Play",        sub: "Integrates with your stack." },
        ]}
        offerings={offerings}
        steps={steps}
        featuresTitlePre="More Than Automation."
        featuresTitleHighlight="It's an Intelligence"
        featuresTitlePost="Layer."
        featuresIntro="We embed AI directly into your operations so every decision is faster and smarter."
        features={features}
        ctaTitlePre="Ready to Automate Your"
        ctaTitleHighlight="Business?"
        ctaHref="/contact?service=ai-automation"
        ctaLabel="Start Automating"
      />
      <Footer />
    </>
  );
}
