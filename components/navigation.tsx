"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/services" },
  { label: "Networking", href: "/networking" },
  { label: "Academy", href: "/academy" },
  {
    label: "Pricing",
    href: "/pricing",
    dropdown: [
      { label: "Pricing Plans", href: "/pricing", desc: "View all our pricing options" },
      { label: "Testimonials", href: "/pricing/testimonials", desc: "See what our clients say" },
    ],
  },
  { label: "Partners", href: "/partners" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setUserDropdown(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      )}
    >
      <nav className="container-xl flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.jpeg"
            alt="Akronix Logo"
            width={120}
            height={40}
            className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105 mix-blend-screen"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className={cn("px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 text-gray-600 hover:text-gray-900 hover:bg-gray-100 inline-flex items-center gap-1", openDropdown === link.label && "text-blue-700 bg-blue-50")}>
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn("transition-transform duration-200", openDropdown === link.label && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-56 rounded-xl border p-1.5 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] border-gray-100"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col px-3 py-2.5 rounded-lg transition-all duration-150 hover:bg-gray-50"
                          >
                            <span className="text-sm font-medium text-gray-800">{item.label}</span>
                            <span className="text-xs text-gray-400 mt-0.5">{item.desc}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href!}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  pathname === link.href && "text-blue-700 bg-blue-50 font-semibold"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {status === "authenticated" ? (
            <div className="relative">
              <button 
                onClick={() => setUserDropdown(!userDropdown)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-cyan-700"
              >
                {session.user?.image ? (
                  <Image 
                    src={session.user.image} 
                    alt="Avatar" 
                    width={40}
                    height={40}
                    className="w-full h-full rounded-full object-cover" 
                  />
                ) : (
                  <User size={18} />
                )}
              </button>
              
              <AnimatePresence>
                {userDropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-2 w-48 glass-card border-white/10 rounded-2xl p-1.5 z-50 shadow-2xl"
                  >
                    <div className="px-3 py-2 border-b border-white/5 mb-1">
                      <p className="text-sm font-bold truncate text-white">{session.user?.name}</p>
                      <p className="text-[10px] text-white/40 truncate">{session.user?.email}</p>
                    </div>
                    <Link href="/portal" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                      <LayoutDashboard size={14} />
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/contact"
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
              >
                Book a Consultation
              </Link>
              <Link
                href="/contact?type=project"
                className="inline-flex items-center gap-2 text-sm font-bold text-white px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)", boxShadow: "0 4px 16px rgba(245,158,11,0.3)" }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden btn-ghost p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t"
            style={{ borderColor: "rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.98)" }}
          >
            <div className="container-xl py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key={link.label}>
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white/30">
                        {link.label}
                      </p>
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className="px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-gray-100">
                {status === "authenticated" ? (
                  <>
                    <Link href="/portal" className="text-center py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">Dashboard</Link>
                    <button onClick={() => signOut()} className="w-full text-center py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/contact?type=project"
                      className="text-center py-3 rounded-full text-sm font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)" }}
                    >Get Started</Link>
                    <Link href="/contact" className="text-center py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Book a Consultation</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
