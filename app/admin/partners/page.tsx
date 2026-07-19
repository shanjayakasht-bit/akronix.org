"use client";

import { useState, useEffect } from "react";
import { Handshake, Save, Loader2, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

type EcosystemCategory = { title: string; desc: string; logos: string[] };
type Spotlight = { partnerName: string; quote: string; by: string };

type Content = {
  ecosystem: EcosystemCategory[];
  spotlights: Spotlight[];
};

const DEFAULTS: Content = {
  ecosystem: [
    { title: "Technology Partners", desc: "Leading technology providers and innovators powering digital transformation.", logos: ["AWS", "Microsoft", "Google Cloud", "DigitalOcean"] },
    { title: "Educational Partners", desc: "Partnering with top institutions to empower students and drive innovation.", logos: ["SRM University", "VIT University", "PES University", "Christ University"] },
    { title: "Startup Ecosystem Partners", desc: "Collaborating with incubators, accelerators and startup communities.", logos: ["T-Hub", "10,000 Startups", "NASSCOM Foundation", "Invest India"] },
    { title: "Business Partners", desc: "Working with businesses to deliver solutions, create value and scale together.", logos: ["Zoho", "PayU", "Razorpay", "Tally"] },
    { title: "Networking Partners", desc: "Joining hands with networking organizations to build strong communities.", logos: ["BNI", "TiE", "LocalCircles", "FICCI"] },
  ],
  spotlights: [
    { partnerName: "AWS", quote: "Akronix is a valuable partner with deep technical expertise and a strong commitment to delivering innovative solutions.", by: "AWS Partner Network" },
    { partnerName: "SRM University", quote: "Our partnership with Akronix Academy empowers students with real-world skills and industry exposure.", by: "SRM Institute of Science & Technology" },
    { partnerName: "T-Hub", quote: "Akronix has been a catalyst for our startup community — connecting founders with the right resources and mentors.", by: "T-Hub Foundation" },
    { partnerName: "BNI", quote: "The Akronix networking community has added tremendous value to our members' business growth.", by: "BNI Partner Network" },
    { partnerName: "NASSCOM Foundation", quote: "Akronix's commitment to innovation aligns perfectly with NASSCOM's vision for India's digital future.", by: "NASSCOM Foundation" },
  ],
};

const CATEGORY_LABELS = [
  "Category 1 — Technology (purple)",
  "Category 2 — Educational (sky)",
  "Category 3 — Startup Ecosystem (green)",
  "Category 4 — Business (blue)",
  "Category 5 — Networking (amber)",
];

/* ── Shared field ── */
function Field({
  label, value, onChange, multiline, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) {
  const cls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors resize-none";
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/40">{label}</label>
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />}
    </div>
  );
}

/* ── Collapsible section ── */
function Section({
  title, badge, defaultOpen = false, children,
}: {
  title: string; badge?: string; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-white">{title}</h3>
          {badge && (
            <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
              {badge}
            </span>
          )}
        </div>
        {open ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
      </button>
      {open && <div className="px-6 pb-6 space-y-4 border-t border-white/5 pt-5">{children}</div>}
    </div>
  );
}

/* ── Page ── */
export default function PartnersAdmin() {
  const [content, setContent] = useState<Content>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=partners.")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["partners.content"]) {
          try { setContent({ ...DEFAULTS, ...JSON.parse(data["partners.content"]) }); } catch {}
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
        body: JSON.stringify({ "partners.content": JSON.stringify(content) }),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } finally { setSaving(false); }
  };

  const updateCategory = (i: number, field: "title" | "desc", val: string) => {
    const next = [...content.ecosystem];
    next[i] = { ...next[i], [field]: val };
    set("ecosystem", next);
  };

  const updateLogo = (catIndex: number, logoIndex: number, val: string) => {
    const next = [...content.ecosystem];
    const logos = [...next[catIndex].logos];
    logos[logoIndex] = val;
    next[catIndex] = { ...next[catIndex], logos };
    set("ecosystem", next);
  };

  const updateSpotlight = (i: number, field: keyof Spotlight, val: string) => {
    const next = [...content.spotlights];
    next[i] = { ...next[i], [field]: val };
    set("spotlights", next);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 size={24} className="animate-spin text-amber-500" />
    </div>
  );

  const SaveBtn = ({ full }: { full?: boolean }) => (
    <button
      onClick={handleSave}
      disabled={saving}
      className={`flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-xl transition-colors disabled:opacity-60 ${full ? "px-6 py-3" : "px-4 py-2"}`}
    >
      {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
      {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Handshake size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Partners Page</h1>
            <p className="text-xs text-white/30">All changes publish live to the public /partners page.</p>
          </div>
        </div>
        <SaveBtn />
      </div>

      {/* Live-update notice */}
      <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl px-4 py-3 text-xs text-amber-300/70">
        Changes are saved to the database and immediately reflected on the public <span className="font-bold text-amber-400">/partners</span> page.
        Recognised partner names (AWS, Microsoft, Zoho, BNI, etc.) render with their existing logo mark — anything else falls back to a clean initials badge.
      </div>

      {/* ─── 1. Partner Ecosystem ─── */}
      <Section title="Partner Ecosystem" badge="5 categories" defaultOpen>
        <p className="text-xs text-white/25 -mt-1">
          Each category has a preset icon and colour theme. Edit the title, description, and the 4 partner names shown per category.
        </p>
        <div className="space-y-3">
          {content.ecosystem.map((cat, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3">
              <p className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest">{CATEGORY_LABELS[i]}</p>
              <Field label="Title" value={cat.title} onChange={v => updateCategory(i, "title", v)} />
              <Field label="Description" value={cat.desc} onChange={v => updateCategory(i, "desc", v)} multiline />
              <div className="grid grid-cols-2 gap-3">
                {cat.logos.map((name, j) => (
                  <Field
                    key={j}
                    label={`Partner ${j + 1}`}
                    value={name}
                    onChange={v => updateLogo(i, j, v)}
                    placeholder="Partner name"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── 2. Partner Spotlight ─── */}
      <Section title="Partner Spotlight" badge="5 quotes">
        <p className="text-xs text-white/25 -mt-1">Shown as the rotating quote carousel on the public Partners page.</p>
        <div className="space-y-4">
          {content.spotlights.map((s, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3">
              <p className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest">Spotlight {i + 1}</p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Partner Name" value={s.partnerName} onChange={v => updateSpotlight(i, "partnerName", v)} placeholder="AWS" />
                <Field label="Attribution" value={s.by} onChange={v => updateSpotlight(i, "by", v)} placeholder="AWS Partner Network" />
              </div>
              <Field label="Quote" value={s.quote} onChange={v => updateSpotlight(i, "quote", v)} multiline placeholder="What they said about Akronix…" />
            </div>
          ))}
        </div>
      </Section>

      <div className="flex justify-end pb-8">
        <SaveBtn full />
      </div>
    </div>
  );
}
