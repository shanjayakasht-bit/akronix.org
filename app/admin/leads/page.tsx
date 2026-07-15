import { db } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import { FileText, Search } from "lucide-react";

async function getLeads() {
  try {
    return await db.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch {
    return [];
  }
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  CONTACTED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  QUALIFIED: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  PROPOSAL: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  CONVERTED: "bg-green-500/20 text-green-400 border-green-500/30",
  LOST: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <FileText size={18} className="text-amber-400" />
            All Form Submissions
          </h1>
          <p className="text-white/40 text-xs mt-0.5">{leads.length} total leads</p>
        </div>
      </div>

      <div className="bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
          <Search size={14} className="text-white/25" />
          <input
            type="text"
            placeholder="Filter leads..."
            className="flex-1 bg-transparent text-sm text-white/60 placeholder:text-white/20 focus:outline-none"
          />
        </div>
        <div className="overflow-x-auto">
          {leads.length === 0 ? (
            <div className="py-16 text-center text-white/20 text-sm">No leads yet.</div>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5">
                  {["Name", "Email", "Company", "Service", "Message", "Status", "Time"].map((h) => (
                    <th key={h} className="text-left text-white/30 font-medium px-5 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-white/80 whitespace-nowrap">
                      {lead.firstName} {lead.lastName}
                    </td>
                    <td className="px-5 py-3.5 text-white/40">{lead.email}</td>
                    <td className="px-5 py-3.5 text-white/30">{lead.company ?? "—"}</td>
                    <td className="px-5 py-3.5 text-white/40 whitespace-nowrap">
                      {lead.serviceType?.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-white/30 max-w-[200px] truncate">{lead.message}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${STATUS_COLORS[lead.status] ?? "bg-white/5 text-white/40 border-white/10"}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-white/25 whitespace-nowrap">
                      {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
