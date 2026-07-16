import { ShieldCheck, Database, Server, Activity } from "lucide-react";

export default function SystemAdmin() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2.5">
        <ShieldCheck size={16} className="text-amber-400" />
        <div>
          <h1 className="text-xl font-black text-white">System Settings</h1>
          <p className="text-xs text-white/30">Infrastructure, security and system configuration.</p>
        </div>
      </div>

      {/* System info cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Environment", value: "Production", icon: Server, color: "text-green-400" },
          { label: "Database", value: "PostgreSQL 16", icon: Database, color: "text-blue-400" },
          { label: "Status", value: "Healthy", icon: Activity, color: "text-green-400" },
        ].map(s => (
          <div key={s.label} className="bg-[#161A23] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <s.icon size={13} className="text-white/30" />
              <p className="text-xs text-white/30">{s.label}</p>
            </div>
            <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#161A23] border border-white/5 rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <ShieldCheck size={28} className="text-amber-400/50" />
        </div>
        <h2 className="text-base font-bold text-white">Advanced System Settings</h2>
        <p className="text-white/35 text-sm max-w-xs">
          Advanced configuration including caching, email providers, integrations and security settings.
        </p>
        <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-bold">
          Coming Soon
        </span>
      </div>
    </div>
  );
}
