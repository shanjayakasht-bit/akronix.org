"use client";

import { useState, useEffect } from "react";
import { Save, RotateCcw, Globe, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

type HomepageSettings = {
  "homepage.hero.badge": string;
  "homepage.hero.description": string;
  "homepage.hero.cta1.text": string;
  "homepage.hero.cta1.href": string;
  "homepage.hero.cta2.text": string;
  "homepage.hero.cta2.href": string;
  "homepage.cta.headline": string;
  "homepage.cta.description": string;
  "homepage.testimonials.label": string;
  "homepage.stats": string;
  "homepage.partners": string;
};

type Stat = { value: string; label: string };

const DEFAULT_STATS: Stat[] = [
  { value: "500+", label: "Businesses Empowered" },
  { value: "15+", label: "Valuable Partnerships" },
  { value: "98%", label: "Client Retention" },
  { value: "60%", label: "Avg. Efficiency Gain" },
];

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5">
        <h3 className="text-sm font-bold text-white">{title}</h3>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label, value, onChange, multiline = false, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; placeholder?: string;
}) {
  const cls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors resize-none";
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/40">{label}</label>
      {multiline ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}

export default function HomepageCMS() {
  const [settings, setSettings] = useState<HomepageSettings>({
    "homepage.hero.badge": "",
    "homepage.hero.description": "",
    "homepage.hero.cta1.text": "",
    "homepage.hero.cta1.href": "",
    "homepage.hero.cta2.text": "",
    "homepage.hero.cta2.href": "",
    "homepage.cta.headline": "",
    "homepage.cta.description": "",
    "homepage.testimonials.label": "",
    "homepage.stats": JSON.stringify(DEFAULT_STATS),
    "homepage.partners": JSON.stringify(["ZOHO", "Microsoft", "AWS", "HubSpot", "Google", "BNI", "Meta", "GitHub", "Hostinger"]),
  });

  const [stats, setStats] = useState<Stat[]>(DEFAULT_STATS);
  const [partners, setPartners] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=homepage.")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        setSettings((prev) => ({ ...prev, ...data }));
        if (data["homepage.stats"]) {
          try { setStats(JSON.parse(data["homepage.stats"])); } catch {}
        } else {
          setStats(DEFAULT_STATS);
        }
        if (data["homepage.partners"]) {
          try { setPartners(JSON.parse(data["homepage.partners"])); } catch {}
        } else {
          setPartners(["ZOHO", "Microsoft", "AWS", "HubSpot", "Google", "BNI", "Meta", "GitHub", "Hostinger"]);
        }
      })
      .catch(() => {
        setStats(DEFAULT_STATS);
        setPartners(["ZOHO", "Microsoft", "AWS", "HubSpot", "Google", "BNI", "Meta", "GitHub", "Hostinger"]);
      })
      .finally(() => setLoading(false));
  }, []);

  const set = (key: keyof HomepageSettings, value: string) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...settings,
        "homepage.stats": JSON.stringify(stats),
        "homepage.partners": JSON.stringify(partners),
      };
      const res = await fetch("/api/admin/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe size={16} className="text-amber-400" />
            <h1 className="text-xl font-black text-white">Homepage Editor</h1>
          </div>
          <p className="text-white/40 text-xs">Edit all homepage sections. Changes go live immediately after saving.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            Preview <ArrowUpRight size={12} />
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

      {/* Hero Section */}
      <SectionCard title="Hero Section">
        <Field label="Badge Text" value={settings["homepage.hero.badge"]} onChange={(v) => set("homepage.hero.badge", v)} placeholder="Empowering Startups, Businesses & Institutions" />
        <Field label="Description" value={settings["homepage.hero.description"]} onChange={(v) => set("homepage.hero.description", v)} multiline placeholder="Akronix is your complete business growth ecosystem..." />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Primary CTA Text" value={settings["homepage.hero.cta1.text"]} onChange={(v) => set("homepage.hero.cta1.text", v)} placeholder="Get Started" />
          <Field label="Primary CTA Link" value={settings["homepage.hero.cta1.href"]} onChange={(v) => set("homepage.hero.cta1.href", v)} placeholder="/contact?type=project" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Secondary CTA Text" value={settings["homepage.hero.cta2.text"]} onChange={(v) => set("homepage.hero.cta2.text", v)} placeholder="Explore Products" />
          <Field label="Secondary CTA Link" value={settings["homepage.hero.cta2.href"]} onChange={(v) => set("homepage.hero.cta2.href", v)} placeholder="/products" />
        </div>
      </SectionCard>

      {/* Stats */}
      <SectionCard title="Stats Bar (4 items)">
        <div className="grid sm:grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3">
              <p className="text-[10px] text-white/30 font-medium uppercase tracking-widest">Stat {i + 1}</p>
              <input
                type="text"
                value={stat.value}
                onChange={(e) => {
                  const next = [...stats];
                  next[i] = { ...next[i], value: e.target.value };
                  setStats(next);
                }}
                placeholder="500+"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-amber-500/40 transition-colors"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => {
                  const next = [...stats];
                  next[i] = { ...next[i], label: e.target.value };
                  setStats(next);
                }}
                placeholder="Businesses Empowered"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/60 focus:outline-none focus:border-amber-500/40 transition-colors"
              />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* CTA Banner */}
      <SectionCard title="CTA Banner Section">
        <Field label="Headline" value={settings["homepage.cta.headline"]} onChange={(v) => set("homepage.cta.headline", v)} placeholder="Ready to Build the Future of Your Business?" />
        <Field label="Description" value={settings["homepage.cta.description"]} onChange={(v) => set("homepage.cta.description", v)} multiline placeholder="Let's build software that matters..." />
      </SectionCard>

      {/* Testimonials */}
      <SectionCard title="Testimonials Section">
        <Field label="Rating Label" value={settings["homepage.testimonials.label"]} onChange={(v) => set("homepage.testimonials.label", v)} placeholder="4.9/5 from 100+ reviews" />
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
          <p className="text-xs text-amber-400/80">
            💡 Testimonial content is managed from the{" "}
            <Link href="/admin/testimonials" className="underline">Testimonials section</Link>.
            They are stored in the database and pulled dynamically.
          </p>
        </div>
      </SectionCard>

      {/* Partners */}
      <SectionCard title="Partner Names (comma-separated)">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white/40">Partner Names (one per line)</label>
          <textarea
            rows={5}
            value={partners.join("\n")}
            onChange={(e) =>
              setPartners(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))
            }
            placeholder="ZOHO&#10;Microsoft&#10;AWS&#10;HubSpot"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors resize-none font-mono"
          />
          <p className="text-[10px] text-white/25">Enter each partner name on its own line. These appear in the scrolling partners strip.</p>
        </div>
      </SectionCard>

      {/* Save button at bottom */}
      <div className="flex justify-end pb-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
          {saving ? "Saving…" : saved ? "Saved!" : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
