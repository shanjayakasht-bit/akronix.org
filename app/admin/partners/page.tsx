"use client";

import { useState, useEffect, useRef } from "react";
import { Handshake, Save, Loader2, CheckCircle2, ChevronDown, ChevronUp, Plus, Trash2, Upload, Building2 } from "lucide-react";

type PartnerLogoEntry = { name: string; imageUrl?: string };
type EcosystemCategory = { title: string; desc: string; logos: PartnerLogoEntry[] };
type Spotlight = { partnerName: string; quote: string; by: string };

type Content = {
  ecosystem: EcosystemCategory[];
  spotlights: Spotlight[];
};

/** Accepts both the legacy string[] format and the current {name, imageUrl}[] format. */
function normalizeLogos(logos: unknown): PartnerLogoEntry[] {
  if (!Array.isArray(logos)) return [];
  return logos.map((l) => (typeof l === "string" ? { name: l } : l as PartnerLogoEntry));
}

const DEFAULTS: Content = {
  ecosystem: [
    { title: "Technology Partners", desc: "Leading technology providers and innovators powering digital transformation.", logos: [{ name: "AWS" }, { name: "Microsoft" }, { name: "Google Cloud" }, { name: "DigitalOcean" }] },
    { title: "Educational Partners", desc: "Partnering with top institutions to empower students and drive innovation.", logos: [{ name: "SRM University" }, { name: "VIT University" }, { name: "PES University" }, { name: "Christ University" }] },
    { title: "Startup Ecosystem Partners", desc: "Collaborating with incubators, accelerators and startup communities.", logos: [{ name: "T-Hub" }, { name: "10,000 Startups" }, { name: "NASSCOM Foundation" }, { name: "Invest India" }] },
    { title: "Business Partners", desc: "Working with businesses to deliver solutions, create value and scale together.", logos: [{ name: "Zoho" }, { name: "PayU" }, { name: "Razorpay" }, { name: "Tally" }] },
    { title: "Networking Partners", desc: "Joining hands with networking organizations to build strong communities.", logos: [{ name: "BNI" }, { name: "TiE" }, { name: "LocalCircles" }, { name: "FICCI" }] },
  ],
  spotlights: [
    { partnerName: "", quote: "", by: "" },
    { partnerName: "", quote: "", by: "" },
    { partnerName: "", quote: "", by: "" },
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
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=partners.")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["partners.content"]) {
          try {
            const parsed = JSON.parse(data["partners.content"]);
            const ecosystem = Array.isArray(parsed.ecosystem)
              ? parsed.ecosystem.map((cat: EcosystemCategory) => ({ ...cat, logos: normalizeLogos(cat.logos) }))
              : DEFAULTS.ecosystem;
            setContent({ ...DEFAULTS, ...parsed, ecosystem });
          } catch {}
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

  const updateLogo = (catIndex: number, logoIndex: number, field: keyof PartnerLogoEntry, val: string) => {
    const next = [...content.ecosystem];
    const logos = [...next[catIndex].logos];
    logos[logoIndex] = { ...logos[logoIndex], [field]: val };
    next[catIndex] = { ...next[catIndex], logos };
    set("ecosystem", next);
  };

  const addLogo = (catIndex: number) => {
    const next = [...content.ecosystem];
    next[catIndex] = { ...next[catIndex], logos: [...next[catIndex].logos, { name: "" }] };
    set("ecosystem", next);
  };

  const removeLogo = (catIndex: number, logoIndex: number) => {
    const next = [...content.ecosystem];
    next[catIndex] = { ...next[catIndex], logos: next[catIndex].logos.filter((_, idx) => idx !== logoIndex) };
    set("ecosystem", next);
  };

  const handleLogoUpload = async (catIndex: number, logoIndex: number, file: File) => {
    const key = `${catIndex}-${logoIndex}`;
    setUploadError(null);
    setUploadingKey(key);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "partners");
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        updateLogo(catIndex, logoIndex, "imageUrl", data.url);
      } else {
        setUploadError(data.error ?? "Upload failed.");
      }
    } catch {
      setUploadError("Upload failed.");
    } finally {
      setUploadingKey(null);
    }
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
        Upload a logo image, or leave it blank to use a recognised name (AWS, Microsoft, Zoho, BNI, etc.) or a clean initials badge instead.
      </div>
      {uploadError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-xs text-red-400">{uploadError}</div>
      )}

      {/* ─── 1. Partner Ecosystem ─── */}
      <Section title="Partner Ecosystem" badge="5 categories" defaultOpen>
        <p className="text-xs text-white/25 -mt-1">
          Each category has a preset icon and colour theme. Edit the title, description, and add, remove or upload logos for the companies and colleges shown per category.
        </p>
        <div className="space-y-3">
          {content.ecosystem.map((cat, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3">
              <p className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest">{CATEGORY_LABELS[i]}</p>
              <Field label="Title" value={cat.title} onChange={v => updateCategory(i, "title", v)} />
              <Field label="Description" value={cat.desc} onChange={v => updateCategory(i, "desc", v)} multiline />
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/40">Logos ({cat.logos.length})</label>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {cat.logos.map((logo, j) => {
                    const key = `${i}-${j}`;
                    return (
                      <div key={j} className="flex items-center gap-2.5 bg-white/[0.03] border border-white/10 rounded-xl p-2.5">
                        {/* Logo preview */}
                        <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {logo.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={logo.imageUrl} alt={logo.name} className="max-w-full max-h-full object-contain p-1" />
                          ) : (
                            <Building2 size={16} className="text-white/15" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0 space-y-1.5">
                          <input
                            value={logo.name}
                            onChange={e => updateLogo(i, j, "name", e.target.value)}
                            placeholder="Partner name"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
                          />
                          <input
                            ref={el => { fileInputRefs.current[key] = el; }}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            className="hidden"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) handleLogoUpload(i, j, file);
                              e.target.value = "";
                            }}
                          />
                          <button
                            onClick={() => fileInputRefs.current[key]?.click()}
                            disabled={uploadingKey === key}
                            className="flex items-center gap-1 text-[10px] font-bold text-white/40 hover:text-white transition-colors disabled:opacity-60"
                          >
                            {uploadingKey === key ? <Loader2 size={10} className="animate-spin" /> : <Upload size={10} />}
                            {uploadingKey === key ? "Uploading…" : logo.imageUrl ? "Replace logo" : "Upload logo"}
                          </button>
                        </div>

                        <button onClick={() => removeLogo(i, j)} className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0 self-start mt-1">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => addLogo(i)} className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400/70 hover:text-amber-400 transition-colors mt-1">
                  <Plus size={11} /> Add Logo
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── 2. Partner Spotlight ─── */}
      <Section title="Partner Spotlight" badge="3 quotes">
        <p className="text-xs text-white/25 -mt-1">Shown as the rotating quote carousel on the public Partners page.</p>
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
          <p className="text-xs text-red-300/80">
            ⚠️ Only enter a quote here if the named partner actually said it and agreed to be quoted. Publishing an invented quote attributed to a real organization is misleading and can create legal exposure. Leave blank (section stays hidden) until you have a real, approved quote.
          </p>
        </div>
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
