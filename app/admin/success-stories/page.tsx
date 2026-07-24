"use client";

import { useState, useEffect } from "react";
import { Star, Save, Loader2, CheckCircle2, Plus, Trash2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Story = {
  category: string;
  title: string;
  highlight: string;
  highlightLabel: string;
  desc: string;
  color: string;
  bg: string;
};

const COLOR_PRESETS = [
  { label: "Blue", color: "#2563EB", bg: "#EFF6FF" },
  { label: "Green", color: "#16A34A", bg: "#F0FDF4" },
  { label: "Purple", color: "#9333EA", bg: "#FDF4FF" },
  { label: "Orange", color: "#EA580C", bg: "#FFF7ED" },
  { label: "Teal", color: "#0D9488", bg: "#F0FDFA" },
  { label: "Red", color: "#DC2626", bg: "#FEF2F2" },
];

export default function SuccessStoriesAdmin() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=homepage.")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["homepage.success_stories"]) {
          try { setStories(JSON.parse(data["homepage.success_stories"])); } catch {}
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "homepage.success_stories": JSON.stringify(stories) }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  const update = (i: number, field: keyof Story, value: string) => {
    setStories(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  };

  const setColor = (i: number, preset: { color: string; bg: string }) => {
    setStories(prev => prev.map((s, idx) => idx === i ? { ...s, color: preset.color, bg: preset.bg } : s));
  };

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 size={24} className="animate-spin text-amber-500" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Star size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Success Stories</h1>
            <p className="text-xs text-white/30">Real client case studies only — use actual project results. This section stays hidden on the site until you add at least one.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors">
            Preview <ArrowUpRight size={11} />
          </Link>
          <button
            onClick={() => setStories(prev => [
              ...prev,
              { category: "", title: "", highlight: "", highlightLabel: "", desc: "", color: "#2563EB", bg: "#EFF6FF" }
            ])}
            className="flex items-center gap-1.5 text-xs font-bold text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg transition-colors"
          >
            <Plus size={12} /> Add Story
          </button>
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

      <div className="space-y-5">
        {stories.map((s, i) => (
          <div key={i} className="bg-[#161A23] border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                <p className="text-xs font-bold text-white/40">Story {i + 1}</p>
              </div>
              <button
                onClick={() => setStories(prev => prev.filter((_, idx) => idx !== i))}
                className="text-white/20 hover:text-red-400 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-white/25 mb-1 block">Category Label</label>
                <input
                  value={s.category}
                  onChange={e => update(i, "category", e.target.value)}
                  placeholder="e.g., Digital Transformation"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] text-white/25 mb-1 block">Card Title</label>
                <input
                  value={s.title}
                  onChange={e => update(i, "title", e.target.value)}
                  placeholder="e.g., Retail/CRM Solution"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-white/25 mb-1 block">Highlight Number</label>
                <input
                  value={s.highlight}
                  onChange={e => update(i, "highlight", e.target.value)}
                  placeholder="Use a real, verifiable figure"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xl font-black text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] text-white/25 mb-1 block">Highlight Label</label>
                <input
                  value={s.highlightLabel}
                  onChange={e => update(i, "highlightLabel", e.target.value)}
                  placeholder="increase in efficiency"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-white/25 mb-1 block">Description</label>
              <textarea
                value={s.desc}
                onChange={e => update(i, "desc", e.target.value)}
                placeholder="Brief description of the success story..."
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-[10px] text-white/25 mb-2 block">Colour Theme</label>
              <div className="flex gap-2 flex-wrap">
                {COLOR_PRESETS.map(preset => (
                  <button
                    key={preset.color}
                    onClick={() => setColor(i, preset)}
                    title={preset.label}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${s.color === preset.color ? "border-white scale-110" : "border-transparent hover:scale-105"}`}
                    style={{ backgroundColor: preset.color }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
