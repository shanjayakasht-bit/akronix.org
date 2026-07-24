import { db } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import { UserCog, CheckCircle2, XCircle, ShieldCheck, Shield, User } from "lucide-react";

export const dynamic = "force-dynamic";

async function getUsers() {
  try {
    return await db.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
        company: true,
        country: true,
      },
    });
  } catch {
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ROLE_STYLES: Record<string, { cls: string; Icon: any }> = {
  SUPER_ADMIN: { cls: "bg-amber-500/15 text-amber-400 border-amber-500/20", Icon: ShieldCheck },
  ADMIN: { cls: "bg-blue-500/15 text-blue-400 border-blue-500/20", Icon: Shield },
  CLIENT: { cls: "bg-purple-500/15 text-purple-400 border-purple-500/20", Icon: User },
  USER: { cls: "bg-white/5 text-white/40 border-white/10", Icon: User },
};

export default async function UsersPage() {
  const users = await getUsers();
  const activeCount = users.filter(u => u.isActive).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <UserCog size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Users & Roles</h1>
            <p className="text-xs text-white/30">{activeCount} active · {users.length} total</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Super Admins", value: users.filter(u => u.role === "SUPER_ADMIN").length, color: "text-amber-400" },
          { label: "Admins", value: users.filter(u => u.role === "ADMIN").length, color: "text-blue-400" },
          { label: "Clients", value: users.filter(u => u.role === "CLIENT").length, color: "text-purple-400" },
          { label: "Users", value: users.filter(u => u.role === "USER").length, color: "text-white/60" },
        ].map(s => (
          <div key={s.label} className="bg-[#161A23] border border-white/5 rounded-2xl p-5">
            <p className="text-xs text-white/30 mb-2">{s.label}</p>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden">
        {users.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <UserCog size={32} className="text-white/10 mx-auto mb-3" />
            <p className="text-white/25 text-sm">No users found.</p>
          </div>
        ) : (
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-white/30 font-medium px-6 py-3">User</th>
                <th className="text-left text-white/30 font-medium px-4 py-3 hidden md:table-cell">Email</th>
                <th className="text-left text-white/30 font-medium px-4 py-3">Role</th>
                <th className="text-left text-white/30 font-medium px-4 py-3">Status</th>
                <th className="text-left text-white/30 font-medium px-4 py-3 hidden lg:table-cell">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const roleStyle = ROLE_STYLES[u.role] ?? ROLE_STYLES.USER;
                const RoleIcon = roleStyle.Icon;
                return (
                  <tr key={u.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-[10px] flex-shrink-0">
                          {(u.name ?? u.email)[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-white/80">{u.name ?? "—"}</p>
                          {u.company && <p className="text-white/30">{u.company}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-white/50 hidden md:table-cell">{u.email}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${roleStyle.cls}`}>
                        <RoleIcon size={9} />
                        {u.role.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        u.isActive
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}>
                        {u.isActive ? <CheckCircle2 size={9} /> : <XCircle size={9} />}
                        {u.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-white/30 hidden lg:table-cell">
                      {formatDistanceToNow(new Date(u.createdAt), { addSuffix: true })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
