import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import TestimonialForm from "@/components/testimonial-form";
import {
  Plus,
  LayoutDashboard,
  MessageSquare,
  CreditCard,
  Terminal,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Star,
  User,
  Package,
  Zap,
} from "lucide-react";

function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(" ");
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    PENDING:     { label: "Pending",     cls: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
    IN_REVIEW:   { label: "In Review",   cls: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
    IN_PROGRESS: { label: "In Progress", cls: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/20" },
    REVIEW:      { label: "Review",      cls: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20" },
    COMPLETED:   { label: "Completed",   cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
    CANCELLED:   { label: "Cancelled",   cls: "bg-red-500/15 text-red-400 border-red-500/20" },
    ON_HOLD:     { label: "On Hold",     cls: "bg-orange-500/15 text-orange-400 border-orange-500/20" },
  };
  const { label, cls } = map[status] ?? { label: status, cls: "bg-white/10 text-white/50 border-white/10" };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border ${cls}`}>
      {label}
    </span>
  );
}

function InvoiceStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    DRAFT:     { label: "Draft",     cls: "bg-white/10 text-white/40 border-white/10" },
    SENT:      { label: "Sent",      cls: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
    PAID:      { label: "Paid",      cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
    OVERDUE:   { label: "Overdue",   cls: "bg-red-500/15 text-red-400 border-red-500/20" },
    CANCELLED: { label: "Cancelled", cls: "bg-orange-500/15 text-orange-400 border-orange-500/20" },
  };
  const { label, cls } = map[status] ?? { label: status, cls: "bg-white/10 text-white/50 border-white/10" };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border ${cls}`}>
      {label}
    </span>
  );
}

export default async function ClientPortal() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  // --- Fetch all real data in parallel ---
  const [user, projects, invoices, messages, existingTestimonial] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, company: true, phone: true, country: true, createdAt: true },
    }),
    db.project.findMany({
      where: { clientId: userId },
      include: { milestones: true },
      orderBy: { createdAt: "desc" },
    }),
    db.invoice.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    db.message.findMany({
      where: { recipientId: userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    db.testimonial.findFirst({ where: { userId } }),
  ]);

  const activeProjects = projects.filter((p) => p.status === "IN_PROGRESS" || p.status === "IN_REVIEW");
  const pendingInvoices = invoices.filter((i) => i.status === "SENT" || i.status === "OVERDUE");
  const unreadMessages = messages.filter((m) => m.status === "UNREAD");
  const latestProject = projects[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-white/5 bg-black z-20 hidden lg:flex flex-col">
        <div className="p-8 flex-1">
          <Link href="/" className="block text-xl font-bold tracking-tighter mb-12 hover:opacity-80 transition-opacity">
            Akron<span className="gradient-text-primary">ix</span>
          </Link>

          <nav className="space-y-1">
            {[
              { label: "Dashboard", icon: LayoutDashboard, active: true, href: "/portal" },
              { label: "My Projects", icon: Terminal, href: "/portal" },
              { label: "Messages", icon: MessageSquare, badge: unreadMessages.length || undefined, href: "/portal" },
              { label: "Billing", icon: CreditCard, badge: pendingInvoices.length || undefined, href: "/portal" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  item.active
                    ? "bg-fuchsia-950/60 text-white border border-fuchsia-900/40"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.badge ? (
                  <span className="text-[10px] font-bold bg-fuchsia-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
        </div>

        {/* User card at bottom */}
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white uppercase flex-shrink-0">
              {user?.name?.charAt(0) ?? "?"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user?.name ?? "Client"}</p>
              <p className="text-[11px] text-white/40 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-neutral-950/80 backdrop-blur border-b border-white/5 px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              Welcome back, <span className="gradient-text-primary">{user?.name?.split(" ")[0] ?? "there"}</span>
            </h1>
            <p className="text-white/40 text-xs mt-0.5">
              {activeProjects.length > 0
                ? `${activeProjects.length} active project${activeProjects.length > 1 ? "s" : ""}`
                : "No active projects"}{" "}
              {pendingInvoices.length > 0 ? `· ${pendingInvoices.length} pending invoice${pendingInvoices.length > 1 ? "s" : ""}` : ""}
            </p>
          </div>
          <Link href="/contact?type=project" className="btn-primary py-2.5 px-5 text-sm font-bold flex items-center gap-2">
            <Plus size={16} />
            New Project
          </Link>
        </div>

        <div className="p-8 space-y-8">

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Projects", value: projects.length, icon: Package, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10" },
              { label: "Active Projects", value: activeProjects.length, icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10" },
              { label: "Pending Invoices", value: pendingInvoices.length, icon: CreditCard, color: "text-amber-400", bg: "bg-amber-500/10" },
              { label: "Unread Messages", value: unreadMessages.length, icon: MessageSquare, color: "text-emerald-400", bg: "bg-emerald-500/10" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-5 border border-white/5">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                  <stat.icon size={18} className={stat.color} />
                </div>
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white/80">My Projects</h2>
              <span className="text-xs text-white/30">{projects.length} total</span>
            </div>

            {projects.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 border border-white/5 text-center">
                <Terminal size={40} className="text-white/10 mx-auto mb-4" />
                <p className="text-white/40 text-sm font-medium">No projects yet</p>
                <p className="text-white/20 text-xs mt-1">Start a project to see it here</p>
                <Link href="/contact?type=project" className="inline-flex items-center gap-2 btn-primary px-5 py-2.5 text-sm font-bold mt-6">
                  <Plus size={16} /> Start a Project
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((project) => {
                  const completedMilestones = project.milestones.filter((m) => m.completed).length;
                  const totalMilestones = project.milestones.length;
                  const progressPct = project.progress;

                  return (
                    <div
                      key={project.id}
                      className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-300"
                    >
                      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
                        <Terminal size={100} />
                      </div>

                      <div className="flex items-start justify-between mb-4">
                        <StatusBadge status={project.status} />
                        <span className="text-[10px] text-white/30">
                          {new Date(project.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </span>
                      </div>

                      <h3 className="text-base font-bold mb-1 leading-tight">{project.title}</h3>
                      <p className="text-white/40 text-xs mb-5 line-clamp-2 leading-relaxed">{project.description}</p>

                      {/* Progress bar */}
                      <div className="mb-5">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] text-white/40">
                            {totalMilestones > 0
                              ? `Milestone ${completedMilestones} of ${totalMilestones}`
                              : "Progress"}
                          </span>
                          <span className="text-[11px] font-bold text-fuchsia-400">{progressPct}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 transition-all duration-1000"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>

                      {/* Milestones preview */}
                      {project.milestones.length > 0 && (
                        <div className="space-y-1.5 mb-5">
                          {project.milestones.slice(0, 3).map((m) => (
                            <div key={m.id} className="flex items-center gap-2">
                              {m.completed ? (
                                <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                              ) : (
                                <Clock size={13} className="text-white/20 flex-shrink-0" />
                              )}
                              <span className={`text-[11px] ${m.completed ? "text-white/50 line-through" : "text-white/60"}`}>
                                {m.title}
                              </span>
                            </div>
                          ))}
                          {project.milestones.length > 3 && (
                            <p className="text-[11px] text-white/20 pl-5">
                              +{project.milestones.length - 3} more milestones
                            </p>
                          )}
                        </div>
                      )}

                      {/* Budget & priority row */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="text-xs text-white/40">
                          Priority: <span className="text-white/60 font-semibold">{project.priority}</span>
                        </div>
                        {project.budget && (
                          <div className="text-xs text-white/40">
                            Budget: <span className="text-white/60 font-semibold">${project.budget.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Invoices & Messages row */}
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Invoices */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white/80">Invoices</h2>
                <span className="text-xs text-white/30">{invoices.length} total</span>
              </div>
              <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
                {invoices.length === 0 ? (
                  <div className="p-10 text-center">
                    <FileText size={32} className="text-white/10 mx-auto mb-3" />
                    <p className="text-white/30 text-sm">No invoices yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {invoices.map((inv) => (
                      <div key={inv.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                          <CreditCard size={15} className="text-white/40" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{inv.title}</p>
                          <p className="text-[11px] text-white/30">{inv.invoiceNo}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-bold">${inv.total.toLocaleString()}</p>
                          <InvoiceStatusBadge status={inv.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Messages */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white/80">Messages</h2>
                {unreadMessages.length > 0 && (
                  <span className="text-[10px] font-bold bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/20 px-2 py-0.5 rounded-full">
                    {unreadMessages.length} unread
                  </span>
                )}
              </div>
              <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
                {messages.length === 0 ? (
                  <div className="p-10 text-center">
                    <MessageSquare size={32} className="text-white/10 mx-auto mb-3" />
                    <p className="text-white/30 text-sm">No messages yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors",
                          msg.status === "UNREAD" && "bg-fuchsia-500/5"
                        )}
                      >
                        <div className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5",
                          msg.status === "UNREAD" ? "bg-fuchsia-500/20" : "bg-white/5"
                        )}>
                          <MessageSquare size={14} className={msg.status === "UNREAD" ? "text-fuchsia-400" : "text-white/30"} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{msg.subject}</p>
                          <p className="text-[11px] text-white/30 truncate mt-0.5">{msg.content.slice(0, 60)}…</p>
                          <p className="text-[10px] text-white/20 mt-1">
                            {new Date(msg.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        {msg.status === "UNREAD" && (
                          <span className="w-2 h-2 rounded-full bg-fuchsia-500 flex-shrink-0 mt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Review Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white/80">Your Review</h2>
              {existingTestimonial && (
                <div className="flex items-center gap-1">
                  {[...Array(existingTestimonial.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              )}
            </div>
            <TestimonialForm existingTestimonial={existingTestimonial} />
          </section>

          {/* Account Info */}
          <section>
            <h2 className="text-base font-bold text-white/80 mb-4">Account</h2>
            <div className="glass-card rounded-2xl border border-white/5 p-6">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500/30 to-cyan-500/30 border border-white/10 flex items-center justify-center text-2xl font-black text-white uppercase">
                  {user?.name?.charAt(0) ?? "?"}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{user?.name ?? "—"}</h3>
                  <p className="text-white/40 text-sm">{user?.email}</p>
                  {user?.company && <p className="text-xs text-fuchsia-400 mt-1">{user.company}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Phone", value: user?.phone ?? "—" },
                  { label: "Country", value: user?.country ?? "—" },
                  { label: "Member Since", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/3 rounded-xl p-4 border border-white/5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/30 mb-1">{item.label}</p>
                    <p className="text-sm text-white/70 font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
