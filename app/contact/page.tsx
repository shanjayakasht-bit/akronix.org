import ContactPage from "@/components/pages/contact-page";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Suspense } from "react";

export const metadata = {
  title: "Contact Us — Akronix",
  description: "Get in touch with Akronix. We build SaaS, AI solutions, digital marketing, and business networking — let's talk about your project.",
};

export default function Page() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div className="min-h-screen bg-[#0f172a]" />}>
        <ContactPage />
      </Suspense>
      <Footer />
    </>
  );
}
