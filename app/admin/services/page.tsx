"use client";

import { useState, useEffect } from "react";
import { Wrench, Save, Loader2, CheckCircle2, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

type ServiceItem = {
  name: string;
  slug: string;
  shortDesc: string;
  description: string;
  features: string[];
  isActive: boolean;
};

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    name: "SaaS Development",
    slug: "saas-development",
    shortDesc: "Custom SaaS products built around your workflow.",
    description: "Multi-tenant architecture, subscription billing and admin dashboards — end-to-end SaaS development from architecture to deployment.",
    features: ["Multi-tenancy", "Subscription Management", "Cloud Native", "Custom APIs"],
    isActive: true,
  },
  {
    name: "MVP Development",
    slug: "mvp-development",
    shortDesc: "A working first version, scoped to what you need to test.",
    description: "We help you scope, build and ship a minimum viable product with the core features needed to validate the idea — not more.",
    features: ["Fast Turnaround", "Core Features First", "User Feedback Ready", "Scalable Architecture"],
    isActive: true,
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    shortDesc: "SEO and paid ads for local and B2B brands.",
    description: "SEO, performance marketing and social media management focused on qualified leads, not just traffic.",
    features: ["SEO & SEM", "Social Media Marketing", "Performance Marketing", "Branding & Content"],
    isActive: true,
  },
  {
    name: "AI & Automation",
    slug: "ai-automation",
    shortDesc: "Automation that removes manual busywork.",
    description: "AI chatbots and workflow automation integrated into your existing tools and processes.",
    features: ["AI Chatbots", "Process Automation", "Data Analytics", "Machine Learning"],
    isActive: true,
  },
];

export default function ServicesAdmin() {
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=site.")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["site.services"]) {
          try { setServices(JSON.parse(data["site.services"])); } catch {}
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
        body: JSON.stringify({ "site.services": JSON.stringify(services) }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  const update = (i: number, field: keyof ServiceItem, value: string | boolean | string[]) => {
    setServices(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  };

  const updateFeature = (si: number, fi: number, value: string) => {
    setServices(prev => prev.map((s, idx) => {
      if (idx !== si) return s;
      const features = [...s.features];
      features[fi] = value;
      return { ...s, features };
    }));
  };

  const addFeature = (si: number) => {
    setServices(prev => prev.map((s, idx) => idx === si ? { ...s, features: [...s.features, ""] } : s));
  };

  const removeFeature = (si: number, fi: number) => {
    setServices(prev => prev.map((s, idx) => idx === si ? { ...s, features: s.features.filter((_, fIdx) => fIdx !== fi) } : s));
  };

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 size={24} className="animate-spin text-amber-500" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Wrench size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Services</h1>
            <p className="text-xs text-white/30">Manage your service offerings and descriptions.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setServices(prev => [...prev, {
              name: "", slug: "", shortDesc: "", description: "", features: [""], isActive: true,
            }])}
            className="flex items-center gap-1.5 text-xs font-bold text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg transition-colors"
          >
            <Plus size={12} /> Add Service
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

      <div className="space-y-3">
        {services.map((s, i) => (
          <div key={i} className="bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden">
            {/* Accordion header */}
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${s.isActive ? "bg-green-400" : "bg-white/20"}`} />
                <span className="text-sm font-bold text-white">{s.name || `Service ${i + 1}`}</span>
                <span className="text-xs text-white/30">{s.shortDesc?.slice(0, 50)}{s.shortDesc?.length > 50 ? "…" : ""}</span>
              </div>
              {expanded === i ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
            </button>

            {expanded === i && (
              <div className="px-6 pb-6 space-y-4 border-t border-white/5 pt-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-white/25 mb-1 block">Service Name</label>
                    <input
                      value={s.name}
                      onChange={e => update(i, "name", e.target.value)}
                      placeholder="SaaS Development"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-bold placeholder:text-white/20 focus:outline-none focus:border-amber-500/40"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/25 mb-1 block">Slug</label>
                    <input
                      value={s.slug}
                      onChange={e => update(i, "slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                      placeholder="saas-development"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 font-mono placeholder:text-white/20 focus:outline-none focus:border-amber-500/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-white/25 mb-1 block">Short Description</label>
                  <input
                    value={s.shortDesc}
                    onChange={e => update(i, "shortDesc", e.target.value)}
                    placeholder="One-line description"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-white/25 mb-1 block">Full Description</label>
                  <textarea
                    rows={3}
                    value={s.description}
                    onChange={e => update(i, "description", e.target.value)}
                    placeholder="Detailed description of this service..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 resize-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] text-white/25">Features</label>
                    <button onClick={() => addFeature(i)} className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1">
                      <Plus size={10} /> Add feature
                    </button>
                  </div>
                  <div className="space-y-2">
                    {s.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2">
                        <input
                          value={f}
                          onChange={e => updateFeature(i, fi, e.target.value)}
                          placeholder="Feature name"
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40"
                        />
                        <button onClick={() => removeFeature(i, fi)} className="text-white/20 hover:text-red-400 transition-colors">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={s.isActive}
                      onChange={e => update(i, "isActive", e.target.checked)}
                      className="w-4 h-4 rounded accent-amber-500"
                    />
                    <span className="text-xs text-white/50">Active / Visible</span>
                  </label>
                  <button
                    onClick={() => setServices(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-xs text-red-400/60 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={12} /> Remove service
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
