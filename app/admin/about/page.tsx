"use client";

import { useState, useEffect } from "react";
import { Info, Save, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutAdmin() {
  const [settings, setSettings] = useState({
    "about.hero.headline": "",
    "about.hero.subheadline": "",
    "about.hero.description": "",
    "about.mission": "",
    "about.vision": "",
    "about.values": "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site-settings")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        setSettings(prev => ({ ...prev, ...data }));
      })
      .finally(() => setLoading(false));
  }, []);

  const set = (key: string, value: string) => setSettings(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } finally { setSaving(false); }
  };

  const fields: { key: keyof typeof settings; label: string; placeholder: string; multiline?: boolean }[] = [
    { key: "about.hero.headline", label: "Hero Headline", placeholder: "About Akronix" },
    { key: "about.hero.subheadline", label: "Hero Subheadline", placeholder: "Building the future, together." },
    { key: "about.hero.description", label: "Hero Description", placeholder: "We are a complete business ecosystem...", multiline: true },
    { key: "about.mission", label: "Our Mission", placeholder: "To empower businesses with technology and connections...", multiline: true },
    { key: "about.vision", label: "Our Vision", placeholder: "To become India's leading business growth ecosystem...", multiline: true },
    { key: "about.values", label: "Core Values (comma-separated)", placeholder: "Innovation, Integrity, Impact, Community, Growth" },
  ];

  if (loading) return <div className="flex items-center justify-center h-40"><Loader2 size={24} className="animate-spin text-amber-500" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Info size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">About Us</h1>
            <p className="text-xs text-white/30">Edit About page content and company story.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/leadership" className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors">
            Team Members <ArrowRight size={11} />
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-4 py-2 rounded-xl transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="bg-[#161A23] border border-white/5 rounded-2xl p-6 space-y-5">
        {fields.map(f => (
          <div key={f.key} className="space-y-1.5">
            <label className="text-xs font-medium text-white/40">{f.label}</label>
            {f.multiline ? (
              <textarea
                rows={3}
                value={settings[f.key]}
                onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors resize-none"
              />
            ) : (
              <input
                type="text"
                value={settings[f.key]}
                onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
              />
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl px-4 py-3">
        <p className="text-xs text-blue-400/80">
          Team members (leadership) are managed in the{" "}
          <Link href="/admin/leadership" className="underline">Leadership section</Link>.
        </p>
      </div>
    </div>
  );
}
