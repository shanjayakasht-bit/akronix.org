"use client";

import { useState, useEffect } from "react";
import { Network, Save, Loader2, CheckCircle2, Plus, Trash2, Play } from "lucide-react";
import Image from "next/image";
import VideoModal from "@/components/ui/video-modal";

type Event = { title: string; date: string; location: string; desc: string };
type Content = {
  hero_headline: string;
  hero_subtext: string;
  hero_image: string;
  hero_video_url: string;
  stats_members: string;
  stats_events: string;
  stats_cities: string;
  stats_countries: string;
  events: Event[];
  cta_headline: string;
  cta_desc: string;
};

const DEFAULTS: Content = {
  hero_headline: "Connect. Collaborate. Grow.",
  hero_subtext: "Join the Akronix business networking community — meet founders, investors, and industry leaders driving growth.",
  hero_image: "/blog-networking.png",
  hero_video_url: "",
  stats_members: "",
  stats_events: "",
  stats_cities: "",
  stats_countries: "",
  events: [],
  cta_headline: "Ready to Grow Your Network?",
  cta_desc: "Join thousands of entrepreneurs and business leaders who are building the future together.",
};

function Field({ label, value, onChange, multiline, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) {
  const cls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors resize-none";
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/40">{label}</label>
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5"><h3 className="text-sm font-bold text-white">{title}</h3></div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

export default function NetworkingAdmin() {
  const [content, setContent] = useState<Content>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=networking.")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["networking.content"]) {
          try { setContent({ ...DEFAULTS, ...JSON.parse(data["networking.content"]) }); } catch {}
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = <K extends keyof Content>(key: K, val: Content[K]) =>
    setContent(prev => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "networking.content": JSON.stringify(content) }),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } finally { setSaving(false); }
  };

  const addEvent = () => set("events", [...content.events, { title: "", date: "", location: "", desc: "" }]);
  const removeEvent = (i: number) => set("events", content.events.filter((_, idx) => idx !== i));
  const updateEvent = (i: number, field: keyof Event, val: string) => {
    const next = [...content.events];
    next[i] = { ...next[i], [field]: val };
    set("events", next);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-amber-500" /></div>;

  const SaveBtn = ({ full }: { full?: boolean }) => (
    <button onClick={handleSave} disabled={saving}
      className={`flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-xl transition-colors disabled:opacity-60 ${full ? "px-6 py-3" : "px-4 py-2"}`}>
      {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
      {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Network size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Networking Page</h1>
            <p className="text-xs text-white/30">Edit networking community page content and events.</p>
          </div>
        </div>
        <SaveBtn />
      </div>

      <Card title="Hero Section">
        <Field label="Headline" value={content.hero_headline} onChange={v => set("hero_headline", v)} placeholder="Connect. Collaborate. Grow." />
        <Field label="Subtext" value={content.hero_subtext} onChange={v => set("hero_subtext", v)} multiline placeholder="Join the Akronix networking community..." />
      </Card>

      <Card title="Hero Media">
        <div className="grid sm:grid-cols-[1fr_140px] gap-4 items-start">
          <Field label="Hero Image URL" value={content.hero_image} onChange={v => set("hero_image", v)} placeholder="/blog-networking.png" />
          {content.hero_image && (
            <div className="relative w-full sm:w-[140px] aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-white/5">
              <Image src={content.hero_image} alt="Hero preview" fill className="object-cover" />
            </div>
          )}
        </div>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Field label="Overview Video URL" value={content.hero_video_url} onChange={v => set("hero_video_url", v)} placeholder="https://youtube.com/watch?v=... or a direct .mp4 link" />
          </div>
          <button
            onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2.5 rounded-lg transition-colors mb-0.5 flex-shrink-0"
          >
            <Play size={12} /> Live Preview
          </button>
        </div>
        <p className="text-[11px] text-white/25">
          Supports YouTube, Vimeo, or a direct video file link. Leave blank to show &quot;Video coming soon&quot; when visitors click play.
        </p>
      </Card>

      <Card title="Community Stats">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Members" value={content.stats_members} onChange={v => set("stats_members", v)} placeholder="2,000+" />
          <Field label="Annual Events" value={content.stats_events} onChange={v => set("stats_events", v)} placeholder="50+" />
          <Field label="Cities" value={content.stats_cities} onChange={v => set("stats_cities", v)} placeholder="20+" />
          <Field label="Countries" value={content.stats_countries} onChange={v => set("stats_countries", v)} placeholder="10+" />
        </div>
      </Card>

      <Card title="Upcoming Events">
        <div className="space-y-4">
          {content.events.map((ev, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Event {i + 1}</p>
                <button onClick={() => removeEvent(i)} className="text-red-400/40 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
              </div>
              <Field label="Title" value={ev.title} onChange={v => updateEvent(i, "title", v)} placeholder="Event name" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date" value={ev.date} onChange={v => updateEvent(i, "date", v)} placeholder="YYYY-MM-DD" />
                <Field label="Location" value={ev.location} onChange={v => updateEvent(i, "location", v)} placeholder="City, State" />
              </div>
              <Field label="Description" value={ev.desc} onChange={v => updateEvent(i, "desc", v)} multiline placeholder="Brief description..." />
            </div>
          ))}
          <button onClick={addEvent} className="flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors">
            <Plus size={14} /> Add Event
          </button>
        </div>
      </Card>

      <Card title="CTA Section">
        <Field label="Headline" value={content.cta_headline} onChange={v => set("cta_headline", v)} placeholder="Ready to Grow Your Network?" />
        <Field label="Description" value={content.cta_desc} onChange={v => set("cta_desc", v)} multiline placeholder="Join thousands of entrepreneurs..." />
      </Card>

      <div className="flex justify-end pb-8"><SaveBtn full /></div>

      <VideoModal open={previewOpen} onClose={() => setPreviewOpen(false)} videoUrl={content.hero_video_url} title="Live Preview — Akronix Network" />
    </div>
  );
}
