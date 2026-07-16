"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowRight, ExternalLink, TrendingUp,
  MessageSquare, Mail, Quote, Users,
  Globe, Package, Wrench, Handshake, Star, FileText, BarChart3,
} from "lucide-react";

type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  serviceType?: string | null;
  status: string;
  createdAt: Date;
};

interface Props {
  today: string;
  leadCount: number;
  newLeadCount: number;
  subscriberCount: number;
  testimonialCount: number;
  userCount: number;
  recentLeads: Lead[];
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  CONTACTED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  QUALIFIED: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  CONVERTED: "bg-green-500/20 text-green-400 border-green-500/30",
  LOST: "bg-red-500/20 text-red-400 border-red-500/30",
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function AdminDashboardClient({
  today, leadCount, newLeadCount, subscriberCount, testimonialCount, userCount, recentLeads,
}: Props) {

  const stats = [
    { label: "Total Leads",    value: leadCount,        Icon: MessageSquare, color: "text-amber-400",  bg: "bg-amber-500/10",  change: `${newLeadCount} new`, href: "/admin/leads" },
    { label: "Newsletter Subs", value: subscriberCount, Icon: Mail,          color: "text-blue-400",   bg: "bg-blue-500/10",   href: "/admin/subscribers" },
    { label: "Testimonials",   value: testimonialCount, Icon: Quote,         color: "text-purple-400", bg: "bg-purple-500/10", href: "/admin/testimonials" },
    { label: "Active Users",   value: userCount,        Icon: Users,         color: "text-green-400",  bg: "bg-green-500/10",  href: "/admin/users" },
  ];

  const quickActions = [
    { label: "Edit Homepage",           href: "/admin/homepage",     Icon: Globe,        color: "text-amber-400 bg-amber-500/10"  },
    { label: "View All Leads",          href: "/admin/leads",        Icon: MessageSquare, color: "text-blue-400 bg-blue-500/10"    },
    { label: "Manage Testimonials",     href: "/admin/testimonials", Icon: Quote,         color: "text-purple-400 bg-purple-500/10" },
    { label: "Newsletter Subscribers",  href: "/admin/subscribers",  Icon: Mail,          color: "text-green-400 bg-green-500/10"  },
    { label: "Blog Management",         href: "/admin/blog",         Icon: FileText,      color: "text-cyan-400 bg-cyan-500/10"    },
    { label: "Website Settings",        href: "/admin/settings",     Icon: BarChart3,     color: "text-orange-400 bg-orange-500/10"},
  ];

  const contentSections = [
    { label: "Homepage",       count: 6, Icon: Globe,     href: "/admin/homepage",        color: "text-amber-400 bg-amber-500/10"  },
    { label: "Products",       count: 6, Icon: Package,   href: "/admin/products",        color: "text-blue-400 bg-blue-500/10"    },
    { label: "Services",       count: 8, Icon: Wrench,    href: "/admin/services",        color: "text-green-400 bg-green-500/10"  },
    { label: "Partners",       count: 9, Icon: Handshake, href: "/admin/partners",        color: "text-purple-400 bg-purple-500/10" },
    { label: "Success Stories",count: 3, Icon: Star,      href: "/admin/success-stories", color: "text-orange-400 bg-orange-500/10"},
    { label: "Blog Posts",     count: 0, Icon: FileText,  href: "/admin/blog",            color: "text-cyan-400 bg-cyan-500/10"    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-2xl font-black text-white">Dashboard Overview</h1>
          <p className="text-white/40 text-sm mt-0.5">Welcome back! Here&apos;s what&apos;s happening with your website.</p>
        </div>
        <div className="text-xs text-white/30 bg-white/5 border border-white/8 rounded-lg px-3 py-2 hidden sm:block">
          {today}
        </div>
      </motion.div>

      {/* Stat cards */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const inner = (
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.35 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
              className="relative bg-[#161A23] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors group overflow-hidden cursor-pointer"
            >
              <div className="absolute -top-3 -right-3 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                <stat.Icon size={72} />
              </div>
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.Icon size={16} className={stat.color} />
              </div>
              <div className="text-2xl font-black text-white mb-0.5">{stat.value}</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/35">{stat.label}</p>
                {stat.change && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-green-400">
                    <TrendingUp size={9} /> {stat.change}
                  </span>
                )}
              </div>
            </motion.div>
          );
          return stat.href
            ? <Link key={stat.label} href={stat.href}>{inner}</Link>
            : <div key={stat.label}>{inner}</div>;
        })}
      </motion.div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent leads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="lg:col-span-2 bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="text-sm font-bold text-white">Recent Form Submissions</h2>
            <Link href="/admin/leads" className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
              View All <ArrowRight size={11} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            {recentLeads.length === 0 ? (
              <div className="px-6 py-14 text-center text-white/20 text-sm">No form submissions yet.</div>
            ) : (
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-white/30 font-medium px-6 py-3">Name</th>
                    <th className="text-left text-white/30 font-medium px-4 py-3 hidden md:table-cell">Email</th>
                    <th className="text-left text-white/30 font-medium px-4 py-3 hidden lg:table-cell">Service</th>
                    <th className="text-left text-white/30 font-medium px-4 py-3">Status</th>
                    <th className="text-left text-white/30 font-medium px-4 py-3 hidden sm:table-cell">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead, i) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                      className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-3.5 font-medium text-white/80">{lead.firstName} {lead.lastName}</td>
                      <td className="px-4 py-3.5 text-white/40 hidden md:table-cell">{lead.email}</td>
                      <td className="px-4 py-3.5 text-white/40 hidden lg:table-cell">
                        {lead.serviceType?.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) ?? "—"}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${STATUS_COLORS[lead.status] ?? "bg-white/5 text-white/40 border-white/10"}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-white/30 hidden sm:table-cell">
                        {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="text-sm font-bold text-white">Quick Actions</h2>
          </div>
          <div className="p-3 space-y-0.5">
            {quickActions.map((action, i) => (
              <motion.div
                key={action.href}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.05, duration: 0.3 }}
              >
                <Link href={action.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${action.color}`}>
                    <action.Icon size={14} />
                  </div>
                  <span className="text-sm text-white/55 group-hover:text-white/90 transition-colors flex-1">{action.label}</span>
                  <ExternalLink size={11} className="text-white/10 group-hover:text-white/35 transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* New leads alert */}
      {newLeadCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.45 }}
          className="bg-amber-500/5 border border-amber-500/20 rounded-2xl px-6 py-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <p className="text-sm text-amber-300 font-medium">
              <span className="font-black">{newLeadCount}</span> new lead{newLeadCount > 1 ? "s" : ""} need{newLeadCount === 1 ? "s" : ""} follow-up
            </p>
          </div>
          <Link href="/admin/leads" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
            Review Now <ArrowRight size={12} />
          </Link>
        </motion.div>
      )}

      {/* Content summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white">Content Summary</h2>
          <Link href="/admin/homepage" className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
            Manage All <ArrowRight size={11} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5">
          {contentSections.map((section, i) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 + i * 0.06 }}
            >
              <Link href={section.href} className="bg-[#161A23] p-5 hover:bg-white/[0.03] transition-colors group block">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${section.color}`}>
                  <section.Icon size={18} />
                </div>
                <p className="text-xs text-white/40 mb-1">{section.label}</p>
                <p className="text-2xl font-black text-white">{section.count}</p>
                <p className="text-[10px] text-amber-400 mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Manage <ArrowRight size={9} />
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
