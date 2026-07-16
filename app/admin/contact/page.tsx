import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import FaqEditor from "./FaqEditor";

async function getRecentLeads() {
  try {
    return await db.lead.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: { id: true, firstName: true, lastName: true, email: true, message: true, status: true, createdAt: true },
    });
  } catch { return []; }
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  CONTACTED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  QUALIFIED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  CONVERTED: "bg-green-500/10 text-green-400 border-green-500/20",
  LOST: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default async function ContactAdmin() {
  const leads = await getRecentLeads();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Mail size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Contact Us</h1>
            <p className="text-xs text-white/30">Recent contact form submissions and settings.</p>
          </div>
        </div>
        <Link
          href="/admin/leads"
          className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
        >
          View All Leads <ArrowRight size={11} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#161A23] border border-white/5 rounded-2xl p-5">
          <p className="text-xs text-white/30 mb-2">Total Enquiries</p>
          <p className="text-2xl font-black text-white">{leads.length}+</p>
        </div>
        <div className="bg-[#161A23] border border-white/5 rounded-2xl p-5">
          <p className="text-xs text-white/30 mb-2">New (Unread)</p>
          <p className="text-2xl font-black text-amber-400">{leads.filter(l => l.status === "NEW").length}</p>
        </div>
      </div>

      <div className="bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white">Recent Contact Submissions</h2>
          <Link href="/admin/leads" className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1">
            All Forms <ArrowRight size={11} />
          </Link>
        </div>
        {leads.length === 0 ? (
          <div className="px-6 py-16 text-center text-white/25 text-sm">No submissions yet.</div>
        ) : (
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-white/30 font-medium px-6 py-3">Name</th>
                <th className="text-left text-white/30 font-medium px-4 py-3 hidden md:table-cell">Email</th>
                <th className="text-left text-white/30 font-medium px-4 py-3">Status</th>
                <th className="text-left text-white/30 font-medium px-4 py-3 hidden sm:table-cell">Time</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(l => (
                <tr key={l.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-6 py-3.5 text-white/80 font-medium">{l.firstName} {l.lastName}</td>
                  <td className="px-4 py-3.5 text-white/40 hidden md:table-cell">{l.email}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${STATUS_COLORS[l.status] ?? "bg-white/5 text-white/40 border-white/10"}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-white/30 hidden sm:table-cell">
                    {formatDistanceToNow(new Date(l.createdAt), { addSuffix: true })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* FAQ Editor */}
      <FaqEditor />
    </div>
  );
}
