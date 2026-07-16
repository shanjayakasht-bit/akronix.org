"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Loader2, CheckCircle2 } from "lucide-react";

type SettingsMap = Record<string, string>;

const SECTIONS = [
  {
    title: "General Information",
    fields: [
      { key: "site.name", label: "Site Name", placeholder: "Akronix" },
      { key: "site.tagline", label: "Tagline", placeholder: "Build. Connect. Scale." },
      { key: "site.description", label: "Site Description", placeholder: "Short description of Akronix", multiline: true },
    ],
  },
  {
    title: "Contact Details",
    fields: [
      { key: "site.contact.email", label: "Contact Email", placeholder: "hello@akronix.io" },
      { key: "site.contact.phone", label: "Phone Number", placeholder: "+91 98765 43210" },
      { key: "site.contact.address", label: "Address", placeholder: "Kochi, Kerala, India", multiline: true },
    ],
  },
  {
    title: "Social Media Links",
    fields: [
      { key: "site.social.linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/company/akronix" },
      { key: "site.social.instagram", label: "Instagram URL", placeholder: "https://instagram.com/akronix" },
      { key: "site.social.twitter", label: "Twitter / X URL", placeholder: "https://twitter.com/akronix" },
      { key: "site.social.youtube", label: "YouTube URL", placeholder: "https://youtube.com/@akronix" },
      { key: "site.social.facebook", label: "Facebook URL", placeholder: "https://facebook.com/akronix" },
    ],
  },
  {
    title: "SEO Defaults",
    fields: [
      { key: "site.seo.title", label: "Default Meta Title", placeholder: "Akronix — Build. Connect. Scale." },
      { key: "site.seo.description", label: "Default Meta Description", placeholder: "Akronix is your complete business growth ecosystem...", multiline: true },
      { key: "site.seo.keywords", label: "Default Keywords", placeholder: "SaaS, software development, digital marketing, networking", multiline: true },
    ],
  },
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

export default function WebsiteSettingsPage() {
  const [settings, setSettings] = useState<SettingsMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site-settings")
      .then(r => r.json())
      .then((data: SettingsMap) => setSettings(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (key: string, value: string) => setSettings(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    const siteKeys = SECTIONS.flatMap(s => s.fields.map(f => f.key));
    const payload: SettingsMap = {};
    for (const key of siteKeys) {
      if (settings[key] !== undefined) payload[key] = settings[key];
    }
    try {
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

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 size={24} className="animate-spin text-amber-500" />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Settings size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Website Settings</h1>
            <p className="text-xs text-white/30">Global site info, contact details, social links, and SEO.</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-4 py-2 rounded-xl transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
          {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {SECTIONS.map(section => (
        <SectionCard key={section.title} title={section.title}>
          {section.fields.map(field => (
            <div key={field.key} className="space-y-1.5">
              <label className="text-xs font-medium text-white/40">{field.label}</label>
              {field.multiline ? (
                <textarea
                  rows={3}
                  value={settings[field.key] ?? ""}
                  onChange={e => set(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={settings[field.key] ?? ""}
                  onChange={e => set(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
                />
              )}
            </div>
          ))}
        </SectionCard>
      ))}

      <div className="flex justify-end pb-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
          {saving ? "Saving…" : saved ? "Saved!" : "Save All Settings"}
        </button>
      </div>
    </div>
  );
}
