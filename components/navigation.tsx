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
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  {
    label: "Products",
    dropdown: [
      { label: "SaaS Platform", href: "/services/saas-development", desc: "Full-scale SaaS solutions" },
      { label: "MVP Development", href: "/services/mvp-development", desc: "Ship fast, validate faster" },
      { label: "Landing Pages", href: "/services/landing-pages", desc: "Convert visitors to clients" },
    ],
  },
  { label: "Policies", href: "/policies" },
  { label: "Pricing", href: "/pricing" 
   ,
    dropdown: [
    { label: "Pricing", href: "/pricing", desc: "See what our clients say" },
    { label: "Testimonials", href: "/pricing/testimonials", desc: "See what our clients say" },
  ],},
  { label: "Team", href: "/blog" },
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
        scrolled ? "nav-blur" : "bg-transparent"
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
                  <button className={cn("btn-ghost gap-1", openDropdown === link.label && "text-white")}>
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
                        className="absolute top-full left-0 mt-2 w-56 rounded-xl border p-1.5"
                        style={{
                          background: "rgba(15, 10, 60, 0.6)",
                          borderColor: "rgba(255,255,255,0.1)",
                          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
                        }}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col px-3 py-2.5 rounded-lg transition-all duration-150 hover:bg-white/5"
                          >
                            <span className="text-sm font-medium text-white/90">{item.label}</span>
                            <span className="text-xs text-white/40 mt-0.5">{item.desc}</span>
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
                  "btn-ghost",
                  pathname === link.href && "text-white bg-white/5"
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
              <Link href="/contact" className="btn-primary text-sm py-2 px-5">
                Start a Project
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
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(15, 10, 60, 0.6)" }}
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
                    className="px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 pt-3 mt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                {status === "authenticated" ? (
                  <>
                    <Link href="/portal" className="btn-secondary w-full text-center py-2.5">Dashboard</Link>
                    <button onClick={() => signOut()} className="btn-ghost w-full text-center py-2.5 text-red-400">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link href="/contact" className="btn-primary w-full text-center">Start a Project</Link>
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
