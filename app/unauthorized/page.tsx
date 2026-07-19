import Link from "next/link";
import { ShieldAlert, ArrowRight } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
        <ShieldAlert size={26} className="text-red-400" />
      </div>
      <h1 className="text-2xl font-black text-white mb-2">Access Denied</h1>
      <p className="text-white/40 text-sm max-w-sm mb-8">
        Your account doesn&apos;t have permission to view the admin portal. If you think this is a mistake, contact your site administrator.
      </p>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-black px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl"
          style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)", boxShadow: "0 4px 20px rgba(245,158,11,0.25)" }}
        >
          Back to website
          <ArrowRight size={14} />
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium text-white/40 hover:text-white/70 transition-colors"
        >
          Sign in with a different account
        </Link>
      </div>
    </div>
  );
}
