"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Globe, Package, Wrench, Network, GraduationCap,
  DollarSign, Handshake, Info, Mail, Quote, BookOpen, UserCog,
  BarChart3, Users, Image, FileText, Bell, Settings, ChevronDown,
  Menu, X, LogOut, ShieldCheck, Star, Briefcase, Megaphone,
  LayoutList, Newspaper, FileImage,
} from "lucide-react";
import { signOut } from "next-auth/react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const NAV: NavSection[] = [
  {
    title: "",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "WEBSITE CMS",
    items: [
      { label: "Homepage", href: "/admin/homepage", icon: Globe },
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Services", href: "/admin/services", icon: Wrench },
      { label: "Networking", href: "/admin/networking", icon: Network },
      { label: "Academy", href: "/admin/academy", icon: GraduationCap },
      { label: "Pricing", href: "/admin/pricing", icon: DollarSign },
      { label: "Partners", href: "/admin/partners", icon: Handshake },
      { label: "About Us", href: "/admin/about", icon: Info },
      { label: "Contact Us", href: "/admin/contact", icon: Mail },
    ],
  },
  {
    title: "MANAGE CONTENT",
    items: [
      { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
      { label: "Success Stories", href: "/admin/success-stories", icon: Star },
      { label: "Leadership", href: "/admin/leadership", icon: Users },
      { label: "Blog Management", href: "/admin/blog", icon: Newspaper },
      { label: "Careers", href: "/admin/careers", icon: Briefcase },
      { label: "Media Library", href: "/admin/media", icon: FileImage },
    ],
  },
  {
    title: "MANAGE FORMS",
    items: [
      { label: "All Forms", href: "/admin/leads", icon: FileText },
      { label: "Subscribers", href: "/admin/subscribers", icon: Megaphone },
    ],
  },
  {
    title: "SETTINGS & USERS",
    items: [
      { label: "Website Settings", href: "/admin/settings", icon: Settings },
      { label: "Users & Roles", href: "/admin/users", icon: UserCog },
      { label: "System Settings", href: "/admin/system", icon: ShieldCheck },
    ],
  },
];

interface Props {
  user: { name?: string | null; email?: string | null; role: string };
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({ user, mobileOpen, onMobileClose }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col
          bg-[#111318] border-r border-white/5 transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-black text-black text-sm">A</div>
          <div>
            <p className="text-sm font-black text-white tracking-wider">AKRONIX</p>
            <p className="text-[10px] text-white/30 font-medium">Build. Connect. Scale.</p>
          </div>
          <button
            onClick={onMobileClose}
            className="ml-auto lg:hidden text-white/40 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin">
          {NAV.map((section) => (
            <div key={section.title} className="mb-2">
              {section.title && (
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/25 px-3 py-2 mt-3">
                  {section.title}
                </p>
              )}
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onMobileClose}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                      ${active
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "text-white/50 hover:text-white/90 hover:bg-white/5"
                      }
                    `}
                  >
                    <item.icon size={15} className={active ? "text-amber-400" : "text-white/30"} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs flex-shrink-0">
              {user.name?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user.name ?? "Admin"}</p>
              <p className="text-[10px] text-white/30 truncate">{user.role}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-white/25 hover:text-red-400 transition-colors"
              title="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
