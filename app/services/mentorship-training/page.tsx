"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ServicePageTemplate from "@/components/ui/service-page-template";
import { GraduationCap, Users, Zap, Briefcase, Award, Target } from "lucide-react";

const offerings = [
  { icon: GraduationCap, title: "Startup Mentorship", desc: "1:1 guidance from successful founders to validate ideas and grow your venture." },
  { icon: Users,          title: "Career Guidance",    desc: "Personalized roadmaps and coaching to accelerate your professional journey." },
  { icon: Zap,            title: "Workshops & Bootcamps", desc: "Intensive hands-on sessions covering AI, development, marketing and leadership." },
  { icon: Briefcase,      title: "Corporate Training", desc: "Customized programs to upskill your teams and drive organisational growth." },
];

const steps = [
  { title: "Apply", desc: "Submit your profile and goals for an initial screening." },
  { title: "Match",  desc: "Get paired with the perfect mentor or training cohort." },
  { title: "Learn",  desc: "Engage in structured sessions, projects and workshops." },
  { title: "Grow",   desc: "Launch your career, startup, or skill with confidence." },
];

const features = [
  { title: "Industry Expert Network",     desc: "Access a curated network of 50+ mentors from startups, MNCs and academia." },
  { title: "Personalised Learning Paths", desc: "Tailored programs built around your unique goals, experience and timeline." },
  { title: "Real-World Projects",         desc: "Work on live projects and case studies that build your portfolio." },
  { title: "Career Placement Support",    desc: "Resume reviews, interview prep and connections to hiring partners." },
];

const stats = [
  { value: "500+", label: "Students Mentored" },
  { value: "50+",  label: "Expert Mentors" },
  { value: "95%",  label: "Success Rate" },
  { value: "30+",  label: "Workshops" },
];

export default function MentorshipTrainingPage() {
  return (
    <>
      <Navigation />
      <ServicePageTemplate
        badge="Mentorship & Training"
        titlePre="Grow. Learn."
        titleHighlight="Lead."
        subtitle="Empowering individuals, startups and students to learn, grow and succeed through expert-led mentorship and training."
        heroImage="/blog-networking.png"
        heroImageAlt="Mentorship & Training"
        color="#EA580C"
        colorDark="#C2410C"
        colorSoft="#FFF7ED"
        colorBorder="#FFEDD5"
        featureBadges={[
          { icon: Award,  label: "Expert Mentors", sub: "Learn from proven industry leaders." },
          { icon: Target, label: "Structured Paths", sub: "Clear roadmaps, real outcomes." },
          { icon: Users,  label: "Community",       sub: "A network that grows with you." },
        ]}
        floatingStats={[
          { icon: GraduationCap, value: "500+", label: "Students Mentored" },
          { icon: Award,         value: "50+",  label: "Expert Mentors" },
          { icon: Target,        value: "95%",  label: "Success Rate" },
          { icon: Zap,           value: "30+",  label: "Workshops" },
        ]}
        offerings={offerings}
        steps={steps}
        featuresTitlePre="More Than Advice."
        featuresTitleHighlight="It's a Roadmap"
        featuresTitlePost="to Success."
        featuresIntro="We pair you with the right people and the right structure to turn ambition into results."
        features={features}
        stats={stats}
        ctaTitlePre="Ready to Start Your"
        ctaTitleHighlight="Growth Journey?"
        ctaHref="/contact?service=mentorship-training"
        ctaLabel="Book a Free Session"
      />
      <Footer />
    </>
  );
}
