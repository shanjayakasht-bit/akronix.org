import { db } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import { Mail, CheckCircle2, XCircle, Download } from "lucide-react";

export const dynamic = "force-dynamic";

async function getSubscribers() {
  try {
    return await db.newsletter.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function SubscribersPage() {
  const subscribers = await getSubscribers();
  const activeCount = subscribers.filter(s => s.isActive).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Mail size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Newsletter Subscribers</h1>
            <p className="text-xs text-white/30">{activeCount} active · {subscribers.length} total</p>
          </div>
        </div>
        <a
          href={`data:text/csv;charset=utf-8,Email,Status,Joined\n${subscribers.map(s => `${s.email},${s.isActive ? "Active" : "Inactive"},${new Date(s.createdAt).toLocaleDateString()}`).join("\n")}`}
          download="subscribers.csv"
          className="flex items-center gap-2 text-xs font-bold text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg transition-colors"
        >
          <Download size={12} /> Export CSV
        </a>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Subscribers", value: subscribers.length, color: "text-white" },
          { label: "Active", value: activeCount, color: "text-green-400" },
          { label: "Unsubscribed", value: subscribers.length - activeCount, color: "text-red-400" },
        ].map(stat => (
          <div key={stat.label} className="bg-[#161A23] border border-white/5 rounded-2xl p-5">
            <p className="text-xs text-white/30 mb-2">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden">
        {subscribers.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <Mail size={32} className="text-white/10 mx-auto mb-3" />
            <p className="text-white/25 text-sm">No subscribers yet.</p>
            <p className="text-white/15 text-xs mt-1">Subscribers appear here when someone signs up for the newsletter.</p>
          </div>
        ) : (
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-white/30 font-medium px-6 py-3">Email</th>
                <th className="text-left text-white/30 font-medium px-4 py-3">Status</th>
                <th className="text-left text-white/30 font-medium px-4 py-3 hidden sm:table-cell">Joined</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map(s => (
                <tr key={s.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-3.5 text-white/80 font-medium">{s.email}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      s.isActive
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}>
                      {s.isActive ? <CheckCircle2 size={9} /> : <XCircle size={9} />}
                      {s.isActive ? "Active" : "Unsubscribed"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-white/30 hidden sm:table-cell">
                    {formatDistanceToNow(new Date(s.createdAt), { addSuffix: true })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
