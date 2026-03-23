import Link from "next/link";
import Image from "next/image";
import { Zap, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "SaaS Development", href: "/services/saas-development" },
    { label: "MVP Development", href: "/services/mvp-development" },
    { label: "Landing Pages", href: "/services/landing-pages" },
    { label: "Custom Web Apps", href: "/services/custom-web-apps" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Policies", href: "/policies" },
    { label: "Team", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  Resources: [
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Start a Project", href: "/contact?type=project" },
    { label: "Client Portal", href: "/portal" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socials = [
  { icon: Twitter, href: "https://twitter.com/akronix", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/akronix", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/akronix", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #000, rgba(15, 10, 60, 0.9))" }}>
      {/* Top Blend Gradient */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />

      {/* Main Footer Grid */}
      <div className="container-xl py-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-6 group">
              <Image
                src="/logo.jpeg"
                alt="Akronix Logo"
                width={120}
                height={40}
                className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-110 mix-blend-screen"
              />
              <span className="text-2xl font-black tracking-tighter uppercase transition-colors group-hover:text-cyan-400">
                Akron<span className="gradient-text-primary">ix</span>
              </span>
            </Link>
            <p className="text-sm text-white/45 leading-relaxed mb-5 max-w-xs">
              We help SMEs and startups build and scale premium digital products from idea to market.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-200 hover:bg-white/8 hover:border-white/20"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                >
                  <Icon size={14} className="text-white/50" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">
                {section}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Akronix Technologies Ltd. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            
          </p>
        </div>
      </div>
    </footer>
  );
}
