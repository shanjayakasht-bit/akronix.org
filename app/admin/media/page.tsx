"use client";

import { useState, useEffect } from "react";
import {
  FileImage, Save, Loader2, CheckCircle2, Plus, Trash2, Copy, Link as LinkIcon, Check,
} from "lucide-react";

type Asset = {
  id: string;
  name: string;
  url: string;
  category: string;
  alt: string;
};

const CATEGORIES = ["Logo", "Hero", "Product", "Team", "Blog", "Social", "Other"];

const DEFAULT_ASSETS: Asset[] = [
  { id: "a1", name: "Akronix Logo (Dark)", url: "/logo-dark.svg", category: "Logo", alt: "Akronix logo on dark background" },
  { id: "a2", name: "Akronix Logo (Light)", url: "/logo-light.svg", category: "Logo", alt: "Akronix logo on light background" },
  { id: "a3", name: "Hero Background", url: "/hero-bg.jpg", category: "Hero", alt: "Hero section background image" },
];

export default function MediaAdmin() {
  const [assets, setAssets] = useState<Asset[]>(DEFAULT_ASSETS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=media.")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["media.assets"]) {
          try { setAssets(JSON.parse(data["media.assets"])); } catch {}
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
        body: JSON.stringify({ "media.assets": JSON.stringify(assets) }),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } finally { setSaving(false); }
  };

  const updateAsset = (id: string, field: keyof Asset, val: string) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, [field]: val } : a));
  };

  const addAsset = () => {
    setAssets(prev => [...prev, { id: `asset_${Date.now()}`, name: "", url: "", category: "Other", alt: "" }]);
  };

  const removeAsset = (id: string) => setAssets(prev => prev.filter(a => a.id !== id));

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredAssets = selectedCategory === "All" ? assets : assets.filter(a => a.category === selectedCategory);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-amber-500" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FileImage size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Media Library</h1>
            <p className="text-xs text-white/30">{assets.length} assets · Manage image and asset URLs.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={addAsset} className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
            <Plus size={14} /> Add Asset
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-4 py-2 rounded-xl transition-colors disabled:opacity-60">
            {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <LinkIcon size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-300/80 leading-relaxed">
            This is a URL-based media library. Paste image URLs (from Cloudinary, S3, Imgur, or your CDN) and manage them in one place. Use the copy button to quickly grab URLs for use across your site.
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {["All", ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === cat
                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                : "bg-white/5 text-white/40 border border-white/5 hover:text-white/70"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Asset grid */}
      <div className="space-y-2">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="bg-[#161A23] border border-white/5 rounded-xl p-4">
            <div className="grid grid-cols-12 gap-4 items-start">
              {/* Preview */}
              <div className="col-span-2 hidden sm:block">
                {asset.url ? (
                  <div className="w-full aspect-video bg-white/5 border border-white/5 rounded-lg overflow-hidden flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset.url}
                      alt={asset.alt || asset.name}
                      className="w-full h-full object-contain p-1"
                      onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-white/3 border border-white/5 rounded-lg flex items-center justify-center">
                    <FileImage size={16} className="text-white/20" />
                  </div>
                )}
              </div>

              {/* Fields */}
              <div className="col-span-12 sm:col-span-9 grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/40">Name</label>
                  <input type="text" value={asset.name} onChange={e => updateAsset(asset.id, "name", e.target.value)}
                    placeholder="Asset name" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/40">Category</label>
                  <select value={asset.category} onChange={e => updateAsset(asset.id, "category", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/40 transition-colors">
                    {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#161A23]">{c}</option>)}
                  </select>
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-medium text-white/40">URL</label>
                  <div className="flex items-center gap-2">
                    <input type="text" value={asset.url} onChange={e => updateAsset(asset.id, "url", e.target.value)}
                      placeholder="https://cdn.example.com/image.png"
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 font-mono placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors" />
                    <button onClick={() => copyUrl(asset.url)} title="Copy URL"
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                        copied === asset.url ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                      }`}>
                      {copied === asset.url ? <Check size={11} /> : <Copy size={11} />}
                      {copied === asset.url ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-medium text-white/40">Alt Text</label>
                  <input type="text" value={asset.alt} onChange={e => updateAsset(asset.id, "alt", e.target.value)}
                    placeholder="Descriptive alt text for accessibility"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors" />
                </div>
              </div>

              {/* Delete */}
              <div className="col-span-12 sm:col-span-1 flex sm:flex-col sm:items-end justify-end">
                <button onClick={() => removeAsset(asset.id)} className="text-red-400/40 hover:text-red-400 transition-colors p-1"><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}

        {filteredAssets.length === 0 && (
          <div className="bg-[#161A23] border border-white/5 rounded-2xl p-16 text-center">
            <FileImage size={32} className="text-white/10 mx-auto mb-3" />
            <p className="text-white/25 text-sm">No assets in this category.</p>
            <button onClick={addAsset} className="mt-4 flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors mx-auto">
              <Plus size={14} /> Add Asset
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-end pb-8">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-60">
          {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
          {saving ? "Saving…" : saved ? "Saved!" : "Save Library"}
        </button>
      </div>
    </div>
  );
}
