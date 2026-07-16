"use client";

import { useState, useEffect } from "react";
import { Package, Save, Loader2, CheckCircle2, Plus, Trash2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Product = {
  name: string;
  desc: string;
  tag: string;
  icon: string;
};

const ICON_OPTIONS = [
  "Users", "Building2", "Package", "Cpu", "ShieldCheck", "Zap",
  "Globe", "BarChart3", "Code2", "Database", "Briefcase", "Rocket",
  "Star", "Heart", "Layers", "Grid",
];

const DEFAULT_PRODUCTS: Product[] = [
  { name: "Akronix CRM", desc: "Manage leads and customers", tag: "CRM", icon: "Users" },
  { name: "Akronix HRMS", desc: "Simplify HR and employee management", tag: "HRMS", icon: "Building2" },
  { name: "Akronix ERP", desc: "Complete ERP solution for your business", tag: "ERP", icon: "Package" },
  { name: "Akronix Inventory", desc: "Track inventory & stock needs", tag: "INV", icon: "Cpu" },
  { name: "Akronix POS", desc: "Point-of-sale for retail businesses", tag: "POS", icon: "ShieldCheck" },
  { name: "Akronix AI", desc: "A remote assistant with AI Intelligence", tag: "AI", icon: "Zap" },
];

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=homepage.")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["homepage.products"]) {
          try { setProducts(JSON.parse(data["homepage.products"])); } catch {}
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
        body: JSON.stringify({ "homepage.products": JSON.stringify(products) }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  const update = (i: number, field: keyof Product, value: string) => {
    setProducts(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p));
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
          <Package size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Products</h1>
            <p className="text-xs text-white/30">Edit the products shown in the homepage &quot;Premium Products&quot; section.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Preview <ArrowUpRight size={11} />
          </Link>
          <button
            onClick={() => setProducts(prev => [...prev, { name: "", desc: "", tag: "", icon: "Package" }])}
            className="flex items-center gap-1.5 text-xs font-bold text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg transition-colors"
          >
            <Plus size={12} /> Add
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

      <div className="grid sm:grid-cols-2 gap-4">
        {products.map((p, i) => (
          <div key={i} className="bg-[#161A23] border border-white/5 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Product {i + 1}</p>
              <button
                onClick={() => setProducts(prev => prev.filter((_, idx) => idx !== i))}
                className="text-white/20 hover:text-red-400 transition-colors"
                title="Remove"
              >
                <Trash2 size={13} />
              </button>
            </div>

            <input
              value={p.name}
              onChange={e => update(i, "name", e.target.value)}
              placeholder="Product name (e.g., Akronix CRM)"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-bold placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
            />

            <input
              value={p.desc}
              onChange={e => update(i, "desc", e.target.value)}
              placeholder="Short description"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
            />

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-white/25 mb-1 block">Tag</label>
                <input
                  value={p.tag}
                  onChange={e => update(i, "tag", e.target.value)}
                  placeholder="CRM"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] text-white/25 mb-1 block">Icon</label>
                <select
                  value={p.icon}
                  onChange={e => update(i, "icon", e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 focus:outline-none focus:border-amber-500/40 transition-colors"
                >
                  {ICON_OPTIONS.map(ic => (
                    <option key={ic} value={ic}>{ic}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl px-4 py-3">
        <p className="text-xs text-blue-400/80">
          Changes are saved to the database and reflected on the homepage immediately.
          The &quot;Icon&quot; field uses Lucide icon names — they map to icons in the product cards.
        </p>
      </div>
    </div>
  );
}
