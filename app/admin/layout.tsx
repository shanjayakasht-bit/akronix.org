"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { Menu, Bell, Search } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  const user = session?.user as { role?: string; name?: string | null; email?: string | null } | undefined;

  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN")) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-[#0D0D0D] text-white overflow-hidden">
      <AdminSidebar
        user={{ name: user.name, email: user.email, role: user.role ?? "ADMIN" }}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-[#111318] flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white/40 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-xs relative hidden sm:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-white/5 border border-white/8 rounded-lg pl-8 pr-4 py-2 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/30 transition-colors"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-white/20 bg-white/5 px-1.5 py-0.5 rounded">
              Ctrl+/
            </kbd>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
              <Bell size={15} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 rounded-full text-[9px] font-bold text-black flex items-center justify-center">3</span>
            </button>

            {/* User */}
            <div className="flex items-center gap-2.5">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-white leading-none">{user.name ?? "Admin"}</p>
                <p className="text-[10px] text-white/30 mt-0.5">Super Admin</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                {user.name?.[0]?.toUpperCase() ?? "A"}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#0D0D0D]">
          {children}
        </main>
      </div>
    </div>
  );
}
