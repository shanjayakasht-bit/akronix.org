"use client";

import { useState, useEffect } from "react";
import { Save, RotateCcw, Globe, ArrowUpRight, CheckCircle2, Loader2, Play } from "lucide-react";
import Link from "next/link";
import VideoModal from "@/components/ui/video-modal";

type HomepageSettings = {
  "homepage.hero.badge": string;
  "homepage.hero.description": string;
  "homepage.hero.cta1.text": string;
  "homepage.hero.cta1.href": string;
  "homepage.hero.cta2.text": string;
  "homepage.hero.cta2.href": string;
  "homepage.cta.headline": string;
  "homepage.cta.description": string;
  "homepage.partners": string;
  "homepage.video_url": string;
};

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
    "homepage.partners": JSON.stringify(["ZOHO", "Microsoft", "AWS", "HubSpot", "Google", "BNI", "Meta", "GitHub", "Hostinger"]),
    "homepage.video_url": "",
  });

  const [partners, setPartners] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=homepage.")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        setSettings((prev) => ({ ...prev, ...data }));
        if (data["homepage.partners"]) {
          try { setPartners(JSON.parse(data["homepage.partners"])); } catch {}
        } else {
          setPartners(["ZOHO", "Microsoft", "AWS", "HubSpot", "Google", "BNI", "Meta", "GitHub", "Hostinger"]);
        }
      })
      .catch(() => {
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
        <Field label="Badge Text" value={settings["homepage.hero.badge"]} onChange={(v) => set("homepage.hero.badge", v)} placeholder="Software, Marketing & Networking for Growing Businesses" />
        <Field label="Description" value={settings["homepage.hero.description"]} onChange={(v) => set("homepage.hero.description", v)} multiline placeholder="We help startups and growing companies build reliable software..." />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Primary CTA Text" value={settings["homepage.hero.cta1.text"]} onChange={(v) => set("homepage.hero.cta1.text", v)} placeholder="Get Started" />
          <Field label="Primary CTA Link" value={settings["homepage.hero.cta1.href"]} onChange={(v) => set("homepage.hero.cta1.href", v)} placeholder="/contact?type=project" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Secondary CTA Text" value={settings["homepage.hero.cta2.text"]} onChange={(v) => set("homepage.hero.cta2.text", v)} placeholder="Explore Products" />
          <Field label="Secondary CTA Link" value={settings["homepage.hero.cta2.href"]} onChange={(v) => set("homepage.hero.cta2.href", v)} placeholder="/products" />
        </div>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Field label="Overview Video URL" value={settings["homepage.video_url"]} onChange={(v) => set("homepage.video_url", v)} placeholder="https://youtube.com/watch?v=... or a direct .mp4 link" />
          </div>
          <button
            onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2.5 rounded-lg transition-colors mb-0.5 flex-shrink-0"
          >
            <Play size={12} /> Live Preview
          </button>
        </div>
        <p className="text-[11px] text-white/25">
          Powers the &quot;Watch Video&quot; button in the &quot;Why Businesses Choose Akronix&quot; section. Supports YouTube, Vimeo, or a direct video file link.
        </p>
      </SectionCard>

      {/* CTA Banner */}
      <SectionCard title="CTA Banner Section">
        <Field label="Headline" value={settings["homepage.cta.headline"]} onChange={(v) => set("homepage.cta.headline", v)} placeholder="Ready to Build the Future of Your Business?" />
        <Field label="Description" value={settings["homepage.cta.description"]} onChange={(v) => set("homepage.cta.description", v)} multiline placeholder="Let's build software that matters..." />
      </SectionCard>

      {/* Testimonials */}
      <SectionCard title="Testimonials Section">
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
          <p className="text-xs text-amber-400/80">
            💡 Testimonials and the rating shown on the homepage are pulled directly from the{" "}
            <Link href="/admin/testimonials" className="underline">Testimonials section</Link> —
            add published reviews there and they&apos;ll appear here automatically. The section stays hidden until at least one exists.
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

      <VideoModal open={previewOpen} onClose={() => setPreviewOpen(false)} videoUrl={settings["homepage.video_url"]} title="Live Preview — Akronix Overview" />
    </div>
  );
}
