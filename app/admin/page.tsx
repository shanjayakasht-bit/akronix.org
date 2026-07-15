import { db } from "@/lib/db";
import {
  Users, FileText, Mail, TrendingUp, ArrowRight, Globe,
  Package, Wrench, Handshake, Quote, Star, MessageSquare,
  BarChart3, ExternalLink, PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

async function getDashboardData() {
  try {
    const [
      leadCount,
      newLeadCount,
      subscriberCount,
      testimonialCount,
      recentLeads,
    ] = await Promise.all([
      db.lead.count(),
      db.lead.count({ where: { status: "NEW" } }),
      db.newsletter.count({ where: { isActive: true } }),
      db.testimonial.count({ where: { isPublished: true } }),
      db.lead.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
        select: {
          id: true, firstName: true, lastName: true,
          email: true, serviceType: true, status: true, createdAt: true,
        },
      }),
    ]);

    return { leadCount, newLeadCount, subscriberCount, testimonialCount, recentLeads };
  } catch {
    return {
      leadCount: 0, newLeadCount: 0, subscriberCount: 0,
      testimonialCount: 0, recentLeads: [],
    };
  }
}

function StatCard({
  label, value, icon: Icon, color, change, href,
}: {
  label: string; value: string | number; icon: React.ElementType;
  color: string; change?: string; href?: string;
}) {
  const inner = (
    <div className="relative bg-[#161A23] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group overflow-hidden">
      <div className="absolute -top-3 -right-3 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon size={72} />
      </div>
      <div className="flex items-center gap-2 text-white/40 text-xs font-medium mb-3">
        <Icon size={13} className={color} />
        <span>{label}</span>
      </div>
      <div className="text-2xl font-black text-white">{value}</div>
      {change && (
        <p className="text-[10px] text-white/30 mt-1">{change}</p>
      )}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  CONTACTED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  QUALIFIED: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  CONVERTED: "bg-green-500/20 text-green-400 border-green-500/30",
  LOST: "bg-red-500/20 text-red-400 border-red-500/30",
};

const CONTENT_SECTIONS = [
  { label: "Homepage Sections", count: 6, icon: Globe, href: "/admin/homepage", color: "text-amber-400 bg-amber-500/10" },
  { label: "Products", count: 6, icon: Package, href: "/admin/products", color: "text-blue-400 bg-blue-500/10" },
  { label: "Services", count: 8, icon: Wrench, href: "/admin/services", color: "text-green-400 bg-green-500/10" },
  { label: "Partners", count: 9, icon: Handshake, href: "/admin/partners", color: "text-purple-400 bg-purple-500/10" },
  { label: "Success Stories", count: 3, icon: Star, href: "/admin/success-stories", color: "text-orange-400 bg-orange-500/10" },
  { label: "Blog Posts", count: 0, icon: FileText, href: "/admin/blog", color: "text-cyan-400 bg-cyan-500/10" },
];

export default async function AdminDashboard() {
  const data = await getDashboardData();
  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Dashboard Overview 👋</h1>
          <p className="text-white/40 text-sm mt-0.5">Welcome back! Here&apos;s what&apos;s happening with your website.</p>
        </div>
        <div className="text-xs text-white/30 bg-white/5 border border-white/8 rounded-lg px-3 py-2 hidden sm:block">
          {today}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Leads" value={data.leadCount} icon={MessageSquare} color="text-amber-400" change={`${data.newLeadCount} new`} href="/admin/leads" />
        <StatCard label="Newsletter Subs" value={data.subscriberCount} icon={Mail} color="text-blue-400" href="/admin/subscribers" />
        <StatCard label="Testimonials" value={data.testimonialCount} icon={Quote} color="text-purple-400" href="/admin/testimonials" />
        <StatCard label="Open Leads" value={data.newLeadCount} icon={TrendingUp} color="text-green-400" change="Needs follow-up" href="/admin/leads" />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent form submissions */}
        <div className="lg:col-span-2 bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="text-sm font-bold text-white">Recent Form Submissions</h2>
            <Link href="/admin/leads" className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1">
              View All <ArrowRight size={11} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            {data.recentLeads.length === 0 ? (
              <div className="px-6 py-12 text-center text-white/25 text-sm">No form submissions yet.</div>
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
                  {data.recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-3.5 font-medium text-white/80">
                        {lead.firstName} {lead.lastName}
                      </td>
                      <td className="px-4 py-3.5 text-white/40 hidden md:table-cell">{lead.email}</td>
                      <td className="px-4 py-3.5 text-white/40 hidden lg:table-cell">
                        {lead.serviceType?.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) ?? "—"}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${STATUS_COLORS[lead.status] ?? "bg-white/5 text-white/40 border-white/10"}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-white/30 hidden sm:table-cell">
                        {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="text-sm font-bold text-white">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-2">
            {[
              { label: "Edit Homepage", href: "/admin/homepage", icon: Globe, color: "text-amber-400 bg-amber-500/10" },
              { label: "View All Leads", href: "/admin/leads", icon: MessageSquare, color: "text-blue-400 bg-blue-500/10" },
              { label: "Manage Testimonials", href: "/admin/testimonials", icon: Quote, color: "text-purple-400 bg-purple-500/10" },
              { label: "Newsletter Subscribers", href: "/admin/subscribers", icon: Mail, color: "text-green-400 bg-green-500/10" },
              { label: "Blog Management", href: "/admin/blog", icon: FileText, color: "text-cyan-400 bg-cyan-500/10" },
              { label: "Website Settings", href: "/admin/settings", icon: BarChart3, color: "text-orange-400 bg-orange-500/10" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}>
                  <action.icon size={14} />
                </div>
                <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">{action.label}</span>
                <ExternalLink size={11} className="ml-auto text-white/15 group-hover:text-white/40 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content Summary */}
      <div className="bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white">Content Summary</h2>
          <Link href="/admin/homepage" className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1">
            Manage All <ArrowRight size={11} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5">
          {CONTENT_SECTIONS.map((section) => (
            <Link
              key={section.label}
              href={section.href}
              className="bg-[#161A23] p-5 hover:bg-white/[0.03] transition-colors group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${section.color}`}>
                <section.icon size={18} />
              </div>
              <p className="text-xs text-white/40 mb-1">{section.label}</p>
              <p className="text-2xl font-black text-white">{section.count}</p>
              <p className="text-[10px] text-amber-400 mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Manage <ArrowRight size={9} />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
