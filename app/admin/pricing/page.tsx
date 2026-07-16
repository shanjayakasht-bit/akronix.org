"use client";

import { useState, useEffect } from "react";
import {
  DollarSign, Save, Loader2, CheckCircle2, Plus, Trash2, Star,
} from "lucide-react";

type Feature = string;
type Plan = {
  id: string;
  name: string;
  price: string;
  billingCycle: string;
  description: string;
  features: Feature[];
  isPopular: boolean;
  badge: string;
  color: string;
};

const COLOR_OPTIONS = [
  { label: "Amber", value: "amber" },
  { label: "Blue", value: "blue" },
  { label: "Purple", value: "purple" },
  { label: "Green", value: "green" },
  { label: "Orange", value: "orange" },
];

const DEFAULT_PLANS: Plan[] = [
  {
    id: "starter", name: "Starter", price: "29", billingCycle: "monthly",
    description: "Perfect for small businesses and startups getting started.",
    features: ["Up to 5 users", "2 products included", "Basic analytics", "Email support", "5GB storage"],
    isPopular: false, badge: "", color: "blue",
  },
  {
    id: "growth", name: "Growth", price: "99", billingCycle: "monthly",
    description: "Ideal for growing businesses that need more power and flexibility.",
    features: ["Up to 25 users", "5 products included", "Advanced analytics", "Priority support", "50GB storage", "Custom integrations", "API access"],
    isPopular: true, badge: "Most Popular", color: "amber",
  },
  {
    id: "enterprise", name: "Enterprise", price: "299", billingCycle: "monthly",
    description: "Full-scale solution for large organizations and enterprises.",
    features: ["Unlimited users", "All products included", "Enterprise analytics", "Dedicated support", "Unlimited storage", "Custom development", "SLA guarantee", "On-premise option"],
    isPopular: false, badge: "Best Value", color: "purple",
  },
];

function Field({ label, value, onChange, multiline, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; placeholder?: string; type?: string;
}) {
  const cls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors resize-none";
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/40">{label}</label>
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />}
    </div>
  );
}

export default function PricingAdmin() {
  const [plans, setPlans] = useState<Plan[]>(DEFAULT_PLANS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=pricing.")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["pricing.plans"]) {
          try { setPlans(JSON.parse(data["pricing.plans"])); } catch {}
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
        body: JSON.stringify({ "pricing.plans": JSON.stringify(plans) }),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } finally { setSaving(false); }
  };

  const updatePlan = (i: number, field: keyof Plan, val: Plan[keyof Plan]) => {
    const next = [...plans];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (next[i] as any)[field] = val;
    setPlans(next);
  };

  const addFeature = (pi: number) => {
    const next = [...plans];
    next[pi].features = [...next[pi].features, ""];
    setPlans(next);
  };

  const updateFeature = (pi: number, fi: number, val: string) => {
    const next = [...plans];
    next[pi].features[fi] = val;
    setPlans(next);
  };

  const removeFeature = (pi: number, fi: number) => {
    const next = [...plans];
    next[pi].features = next[pi].features.filter((_, idx) => idx !== fi);
    setPlans(next);
  };

  const addPlan = () => setPlans(prev => [...prev, {
    id: `plan_${Date.now()}`, name: "New Plan", price: "0", billingCycle: "monthly",
    description: "", features: ["Feature 1"], isPopular: false, badge: "", color: "blue",
  }]);

  const removePlan = (i: number) => setPlans(prev => prev.filter((_, idx) => idx !== i));

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-amber-500" /></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <DollarSign size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Pricing Plans</h1>
            <p className="text-xs text-white/30">{plans.length} plans · Edit pricing tiers, features, and billing cycles.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={addPlan} className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
            <Plus size={14} /> Add Plan
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-4 py-2 rounded-xl transition-colors disabled:opacity-60">
            {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid lg:grid-cols-3 gap-5">
        {plans.map((plan, pi) => (
          <div key={plan.id} className={`bg-[#161A23] border rounded-2xl overflow-hidden transition-colors ${plan.isPopular ? "border-amber-500/30" : "border-white/5"}`}>
            {/* Card header */}
            <div className={`px-5 py-4 border-b flex items-center justify-between ${plan.isPopular ? "border-amber-500/20 bg-amber-500/5" : "border-white/5"}`}>
              <div className="flex items-center gap-2">
                {plan.isPopular && <Star size={13} className="text-amber-400 fill-amber-400" />}
                <h3 className="text-sm font-bold text-white">{plan.name || "Unnamed Plan"}</h3>
              </div>
              <button onClick={() => removePlan(pi)} className="text-red-400/40 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Plan Name" value={plan.name} onChange={v => updatePlan(pi, "name", v)} placeholder="Starter" />
                <Field label="Price ($/mo)" value={plan.price} onChange={v => updatePlan(pi, "price", v)} placeholder="29" type="number" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/40">Billing Cycle</label>
                  <select value={plan.billingCycle} onChange={e => updatePlan(pi, "billingCycle", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/40 transition-colors">
                    {["monthly", "quarterly", "yearly", "one-time"].map(c => (
                      <option key={c} value={c} className="bg-[#161A23] capitalize">{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/40">Accent Color</label>
                  <select value={plan.color} onChange={e => updatePlan(pi, "color", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/40 transition-colors">
                    {COLOR_OPTIONS.map(c => <option key={c.value} value={c.value} className="bg-[#161A23]">{c.label}</option>)}
                  </select>
                </div>
              </div>

              <Field label="Description" value={plan.description} onChange={v => updatePlan(pi, "description", v)} multiline placeholder="Brief plan description..." />

              <div className="grid grid-cols-2 gap-3">
                <Field label="Badge Text" value={plan.badge} onChange={v => updatePlan(pi, "badge", v)} placeholder="Most Popular" />
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/40">Highlight</label>
                  <label className="flex items-center gap-2.5 cursor-pointer mt-2.5">
                    <input type="checkbox" checked={plan.isPopular} onChange={e => updatePlan(pi, "isPopular", e.target.checked)}
                      className="w-4 h-4 rounded bg-white/5 border border-white/20 accent-amber-500" />
                    <span className="text-xs text-white/60">Mark as popular</span>
                  </label>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/40">Features</label>
                {plan.features.map((feat, fi) => (
                  <div key={fi} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={feat}
                      onChange={e => updateFeature(pi, fi, e.target.value)}
                      placeholder="Feature description"
                      className="flex-1 bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/30 transition-colors"
                    />
                    <button onClick={() => removeFeature(pi, fi)} className="text-red-400/40 hover:text-red-400 transition-colors flex-shrink-0"><Trash2 size={11} /></button>
                  </div>
                ))}
                <button onClick={() => addFeature(pi)} className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400/70 hover:text-amber-400 transition-colors mt-1">
                  <Plus size={11} /> Add Feature
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pb-8">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-60">
          {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
          {saving ? "Saving…" : saved ? "Saved!" : "Save All Plans"}
        </button>
      </div>
    </div>
  );
}
