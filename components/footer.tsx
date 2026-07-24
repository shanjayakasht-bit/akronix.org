"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Twitter, Instagram, Linkedin, Facebook, Youtube, ArrowRight, MapPin, PhoneCall, Mail } from "lucide-react";

const footerLinks = {
  Products: [
    { label: "Akronix CRM", href: "/products" },
    { label: "Akronix HRMS", href: "/products" },
    { label: "Akronix ERP", href: "/products" },
    { label: "Akronix POS", href: "/products" },
    { label: "Akronix AI", href: "/products" },
  ],
  Solutions: [
    { label: "SaaS Development", href: "/services" },
    { label: "Digital Marketing", href: "/services" },
    { label: "Business Networking", href: "/networking" },
    { label: "College Projects", href: "/contact" },
    { label: "AI Automation", href: "/services" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Careers", href: "/contact" },
    { label: "Partners", href: "/partners" },
    { label: "Policies", href: "/policies" },
  ],
  Resources: [
    { label: "Pricing", href: "/pricing" },
    { label: "Case Studies", href: "/contact" },
    { label: "Testimonials", href: "/pricing/testimonials" },
    { label: "Privacy Policy", href: "/policies" },
    { label: "Terms & Conditions", href: "/policies" },
  ],
};

const contact = {
  email: "akronix.in@gmail.com",
  phone: "+91 93607 45895",
  address: "Chennai, Tamil Nadu, India",
};

const DEFAULT_SOCIALS = {
  "site.social.twitter": "https://twitter.com/akronix",
  "site.social.instagram": "https://www.instagram.com/akronix_org?igsh=ZHVsZzg0dmxqZG1i",
  "site.social.linkedin": "https://linkedin.com/company/akronix",
  "site.social.facebook": "",
  "site.social.youtube": "",
};

const SOCIAL_ICONS = [
  { key: "site.social.twitter", icon: Twitter, label: "Twitter" },
  { key: "site.social.instagram", icon: Instagram, label: "Instagram" },
  { key: "site.social.linkedin", icon: Linkedin, label: "LinkedIn" },
  { key: "site.social.facebook", icon: Facebook, label: "Facebook" },
  { key: "site.social.youtube", icon: Youtube, label: "YouTube" },
] as const;

export default function Footer() {
  const [social, setSocial] = useState<Record<string, string>>(DEFAULT_SOCIALS);

  useEffect(() => {
    fetch("/api/site-settings?prefix=site.social.")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        if (Object.keys(data).length > 0) setSocial((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

  const socials = SOCIAL_ICONS
    .map(({ key, icon, label }) => ({ icon, label, href: social[key] }))
    .filter((s) => s.href);

  return (
    <footer className="relative overflow-hidden bg-gray-900">
      {/* Main Footer Grid */}
      <div className="container-xl py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-10">
          {/* Brand — spans 2 cols */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <Image
                src="/logo-new.png"
                alt="Akronix Logo"
                width={555}
                height={407}
                className="h-9 w-auto object-contain invert transition-all duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Your complete business growth ecosystem — software, marketing, networking and mentorship under one roof.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <Mail size={13} className="text-gray-500 flex-shrink-0" />
                <span>{contact.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <PhoneCall size={13} className="text-gray-500 flex-shrink-0" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <MapPin size={13} className="text-gray-500 flex-shrink-0" />
                <span>{contact.address}</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-gray-700 flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:border-gray-500"
                >
                  <Icon size={14} className="text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="md:col-span-1">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                {section}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="md:col-span-1 md:col-start-7">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Subscribe to Newsletter
            </p>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Get latest news and offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-500 outline-none focus:border-yellow-400 transition-colors"
              />
              <button
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)" }}
                aria-label="Subscribe"
              >
                <ArrowRight size={14} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Akronix. All Rights Reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built with ❤️ for businesses everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
