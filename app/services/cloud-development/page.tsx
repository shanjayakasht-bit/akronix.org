"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ServicePageTemplate from "@/components/ui/service-page-template";
import { CloudCog, GitBranch, Repeat, Activity, ShieldCheck, Gauge } from "lucide-react";

const offerings = [
  { icon: CloudCog,  title: "Cloud Migration",    desc: "Move legacy systems to AWS, Azure or GCP with zero-downtime cutovers." },
  { icon: GitBranch, title: "DevOps Automation",   desc: "Infrastructure as Code and automated environments that eliminate manual ops." },
  { icon: Repeat,    title: "CI/CD Pipelines",     desc: "Automated build, test and deploy pipelines that ship safely, every time." },
  { icon: Activity,  title: "Monitoring & Security", desc: "24/7 observability, alerting and hardening across your entire stack." },
];

const steps = [
  { title: "Assess",   desc: "We audit your current infrastructure, costs and reliability gaps." },
  { title: "Architect", desc: "Design a cloud-native architecture built for scale and resilience." },
  { title: "Migrate",  desc: "Execute the move with zero-downtime cutovers and rigorous testing." },
  { title: "Operate",  desc: "Ongoing monitoring, cost optimisation and 24/7 support post-launch." },
];

const features = [
  { title: "Infrastructure as Code",     desc: "Reproducible, version-controlled environments provisioned in minutes, not days." },
  { title: "Auto-Scaling Architecture",  desc: "Systems that scale up and down automatically with real traffic demand." },
  { title: "Zero-Downtime Deployments",  desc: "Blue-green and canary release strategies that ship without breaking production." },
  { title: "24/7 Monitoring & Alerts",   desc: "Full-stack observability with proactive alerting before issues reach users." },
];

const stats = [
  { value: "99.99%", label: "Uptime Delivered" },
  { value: "40%",     label: "Avg Cost Reduction" },
  { value: "50+",     label: "Cloud Migrations" },
  { value: "24/7",    label: "Monitoring & Support" },
];

export default function CloudDevelopmentPage() {
  return (
    <>
      <Navigation />
      <ServicePageTemplate
        badge="Cloud Development"
        titlePre="Scalable"
        titleHighlight="Cloud"
        titlePost="Infrastructure"
        subtitle="Reliable cloud infrastructure and DevOps engineering built for performance, security and scale."
        heroImage="/blog-cloud.png"
        heroImageAlt="Cloud Development"
        color="#0D9488"
        colorDark="#0F766E"
        colorSoft="#F0FDFA"
        colorBorder="#CCFBF1"
        featureBadges={[
          { icon: CloudCog,    label: "Cloud-Native", sub: "Built for AWS, Azure & GCP." },
          { icon: Repeat,      label: "Automated CI/CD", sub: "Ship faster, break less." },
          { icon: ShieldCheck, label: "Secure by Default", sub: "Hardened at every layer." },
        ]}
        floatingStats={[
          { icon: Gauge,       value: "99.99%", label: "Uptime Delivered" },
          { icon: Activity,    value: "40%",    label: "Avg Cost Reduction" },
          { icon: CloudCog,    value: "50+",    label: "Cloud Migrations" },
          { icon: ShieldCheck, value: "24/7",   label: "Monitoring & Support" },
        ]}
        offerings={offerings}
        steps={steps}
        featuresTitlePre="More Than Hosting."
        featuresTitleHighlight="It's Infrastructure"
        featuresTitlePost="That Scales."
        featuresIntro="We build cloud foundations that grow with your traffic instead of breaking under it."
        features={features}
        stats={stats}
        ctaTitlePre="Ready to Modernise Your"
        ctaTitleHighlight="Infrastructure?"
        ctaHref="/contact?service=cloud-development"
        ctaLabel="Get a Free Cloud Audit"
      />
      <Footer />
    </>
  );
}
