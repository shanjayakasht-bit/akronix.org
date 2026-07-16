import { Handshake, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PartnersAdmin() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2.5">
        <Handshake size={16} className="text-amber-400" />
        <div>
          <h1 className="text-xl font-black text-white">Partners</h1>
          <p className="text-xs text-white/30">Manage the partner logos shown on the homepage.</p>
        </div>
      </div>
      <div className="bg-[#161A23] border border-white/5 rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <Handshake size={28} className="text-amber-400/60" />
        </div>
        <h2 className="text-base font-bold text-white">Partners are managed in Homepage Settings</h2>
        <p className="text-white/35 text-sm max-w-sm">
          The scrolling partner strip on the homepage is editable from the Homepage editor.
          You can add, remove, or reorder partner names there.
        </p>
        <Link
          href="/admin/homepage"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-xl transition-colors"
        >
          Go to Homepage Editor <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
