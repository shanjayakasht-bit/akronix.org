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

type CatalogProduct = {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  desc: string;
  features: string[];
  isNew: boolean;
};

const ICON_OPTIONS = [
  "Users", "Building2", "Package", "Cpu", "ShieldCheck", "Zap",
  "Globe", "BarChart3", "Code2", "Database", "Briefcase", "Rocket",
  "Star", "Heart", "Layers", "Grid",
];

const CATEGORY_OPTIONS = [
  { id: "crm", label: "CRM" },
  { id: "hr", label: "HR & Workforce" },
  { id: "operations", label: "Operations" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
  { id: "retail", label: "Retail" },
  { id: "ai", label: "AI & Automation" },
];

const DEFAULT_PRODUCTS: Product[] = [
  { name: "Akronix CRM", desc: "Manage leads and customers", tag: "CRM", icon: "Users" },
  { name: "Akronix HRMS", desc: "Simplify HR and employee management", tag: "HRMS", icon: "Building2" },
  { name: "Akronix ERP", desc: "Complete ERP solution for your business", tag: "ERP", icon: "Package" },
  { name: "Akronix Inventory", desc: "Track inventory & stock needs", tag: "INV", icon: "Cpu" },
  { name: "Akronix POS", desc: "Point-of-sale for retail businesses", tag: "POS", icon: "ShieldCheck" },
  { name: "Akronix AI", desc: "A remote assistant with AI Intelligence", tag: "AI", icon: "Zap" },
];

const DEFAULT_CATALOG: CatalogProduct[] = [
  { id: "crm", name: "Akronix CRM", category: "crm", categoryLabel: "CRM", desc: "Manage leads, customers, and sales pipeline in one place.", features: ["Lead Management", "Sales Automation", "Reports & Analytics", "Customer Support"], isNew: false },
  { id: "hrms", name: "Akronix HRMS", category: "hr", categoryLabel: "HR & Workforce", desc: "Streamline HR operations and empower your workforce.", features: ["Employee Management", "Attendance & Leave", "Payroll Management", "Performance Tracking"], isNew: false },
  { id: "erp", name: "Akronix ERP", category: "operations", categoryLabel: "Operations", desc: "Integrate and manage all your business processes seamlessly.", features: ["Procurement", "Inventory Management", "Accounting", "Business Intelligence"], isNew: false },
  { id: "inventory", name: "Akronix Inventory", category: "operations", categoryLabel: "Operations", desc: "Track inventory, manage stock, and optimize operations.", features: ["Stock Management", "Warehouse Management", "Purchase & Sales", "Low Stock Alerts"], isNew: false },
  { id: "pos", name: "Akronix POS", category: "retail", categoryLabel: "Retail", desc: "Smart billing and retail management made simple.", features: ["Billing & Invoicing", "Multi-store Management", "Sales Analytics", "Customer Management"], isNew: false },
  { id: "lms", name: "Akronix LMS", category: "education", categoryLabel: "Education", desc: "A complete learning management system for modern education.", features: ["Course Management", "Live Classes", "Exams & Assignments", "Student Progress Tracking"], isNew: false },
  { id: "helpdesk", name: "Akronix Helpdesk", category: "ai", categoryLabel: "AI & Automation", desc: "Deliver exceptional support with a smart helpdesk system.", features: ["Ticket Management", "SLA Management", "Knowledge Base", "Customer Feedback"], isNew: false },
  { id: "ai-assistant", name: "Akronix AI Assistant", category: "ai", categoryLabel: "AI & Automation", desc: "AI-powered automation to boost productivity and save time.", features: ["Smart Automations", "AI Chatbot", "Workflow Automation", "Data Insights"], isNew: true },
  { id: "attendance", name: "Akronix Attendance", category: "hr", categoryLabel: "HR & Workforce", desc: "Track attendance accurately with real-time insights.", features: ["Biometric Integration", "Live Attendance", "Shift Management", "Reports & Analytics"], isNew: false },
  { id: "project-management", name: "Akronix Project Management", category: "operations", categoryLabel: "Operations", desc: "Plan, track, and deliver projects on time, every time.", features: ["Task Management", "Team Collaboration", "Timeline Tracking", "Project Reports"], isNew: false },
  { id: "books", name: "Akronix Books", category: "finance", categoryLabel: "Finance", desc: "Simple bookkeeping and invoicing for growing businesses.", features: ["Invoicing", "Expense Tracking", "Tax Filing", "Financial Reports"], isNew: false },
  { id: "ecommerce", name: "Akronix E-commerce", category: "retail", categoryLabel: "Retail", desc: "Launch and manage your online store effortlessly.", features: ["Store Builder", "Product Catalog", "Order Management", "Payment Gateways"], isNew: false },
];

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [catalog, setCatalog] = useState<CatalogProduct[]>(DEFAULT_CATALOG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/site-settings?prefix=homepage.").then(r => r.json()),
      fetch("/api/admin/site-settings?prefix=products.").then(r => r.json()),
    ])
      .then(([homepageData, productsData]: Record<string, string>[]) => {
        if (homepageData["homepage.products"]) {
          try { setProducts(JSON.parse(homepageData["homepage.products"])); } catch {}
        }
        if (productsData["products.catalog"]) {
          try { setCatalog(JSON.parse(productsData["products.catalog"])); } catch {}
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
        body: JSON.stringify({
          "homepage.products": JSON.stringify(products),
          "products.catalog": JSON.stringify(catalog),
        }),
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

  const updateCatalogItem = <K extends keyof CatalogProduct>(i: number, field: K, value: CatalogProduct[K]) => {
    setCatalog(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p));
  };

  const addCatalogItem = () => setCatalog(prev => [...prev, {
    id: `product-${Date.now()}`, name: "", category: "crm", categoryLabel: "CRM", desc: "", features: [], isNew: false,
  }]);

  const removeCatalogItem = (i: number) => setCatalog(prev => prev.filter((_, idx) => idx !== i));

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
            <p className="text-xs text-white/30">Manage the homepage products strip and the full /products catalog.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Preview <ArrowUpRight size={11} />
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

      {/* Homepage Products Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Homepage Products Strip</h2>
          <button
            onClick={() => setProducts(prev => [...prev, { name: "", desc: "", tag: "", icon: "Package" }])}
            className="flex items-center gap-1.5 text-xs font-bold text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg transition-colors"
          >
            <Plus size={12} /> Add
          </button>
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
            Shown in the homepage &quot;Premium Products&quot; section. The &quot;Icon&quot; field uses Lucide icon names.
          </p>
        </div>
      </div>

      {/* Products Catalog */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Products Catalog ({catalog.length})</h2>
          <button
            onClick={addCatalogItem}
            className="flex items-center gap-1.5 text-xs font-bold text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg transition-colors"
          >
            <Plus size={12} /> Add Product
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {catalog.map((p, i) => (
            <div key={p.id} className="bg-[#161A23] border border-white/5 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">{p.id}</p>
                <button
                  onClick={() => removeCatalogItem(i)}
                  className="text-white/20 hover:text-red-400 transition-colors"
                  title="Remove"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <input
                value={p.name}
                onChange={e => updateCatalogItem(i, "name", e.target.value)}
                placeholder="Product name (e.g., Akronix CRM)"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-bold placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
              />

              <textarea
                value={p.desc}
                onChange={e => updateCatalogItem(i, "desc", e.target.value)}
                placeholder="Description shown on the product card"
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors resize-none"
              />

              <div>
                <label className="text-[10px] text-white/25 mb-1 block">Category</label>
                <select
                  value={p.category}
                  onChange={e => {
                    const cat = CATEGORY_OPTIONS.find(c => c.id === e.target.value);
                    updateCatalogItem(i, "category", e.target.value);
                    if (cat) updateCatalogItem(i, "categoryLabel", cat.label);
                  }}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 focus:outline-none focus:border-amber-500/40 transition-colors"
                >
                  {CATEGORY_OPTIONS.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-white/25 mb-1 block">Features (comma-separated)</label>
                <input
                  value={p.features.join(", ")}
                  onChange={e => updateCatalogItem(i, "features", e.target.value.split(",").map(f => f.trim()).filter(Boolean))}
                  placeholder="Lead Management, Sales Automation, ..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={p.isNew}
                  onChange={e => updateCatalogItem(i, "isNew", e.target.checked)}
                  className="w-4 h-4 rounded accent-amber-500"
                />
                <span className="text-xs text-white/50">Mark as &quot;New&quot;</span>
              </label>
            </div>
          ))}
        </div>

        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl px-4 py-3">
          <p className="text-xs text-blue-400/80">
            This is the full catalog shown on the public <span className="font-bold text-blue-300">/products</span> page, with category filters and search.
          </p>
        </div>
      </div>
    </div>
  );
}
