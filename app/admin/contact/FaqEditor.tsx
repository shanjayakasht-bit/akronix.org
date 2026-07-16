"use client";

import { useState, useEffect } from "react";
import { HelpCircle, Save, Loader2, CheckCircle2, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

type Faq = { q: string; a: string };

const DEFAULT_FAQS: Faq[] = [
  { q: "How long does it take to start a project?",    a: "Most projects kick off within 1–2 weeks after the initial discovery call and proposal approval." },
  { q: "Do you work with international clients?",       a: "Yes! We work with clients across 15+ countries. All communication happens over Zoom, email and Slack." },
  { q: "What is the minimum project budget?",           a: "Our projects start from ₹30,000 for landing pages. Custom SaaS and enterprise solutions are priced based on scope." },
  { q: "Can I request changes after the project starts?", a: "Absolutely. We follow an agile process with regular check-ins and allow scope adjustments within reasonable bounds." },
];

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

export default function FaqEditor() {
  const [faqs, setFaqs]       = useState<Faq[]>(DEFAULT_FAQS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [open, setOpen]       = useState(true);

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=contact.")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["contact.faqs"]) {
          try { setFaqs(JSON.parse(data["contact.faqs"])); } catch {}
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
        body: JSON.stringify({ "contact.faqs": JSON.stringify(faqs) }),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } finally { setSaving(false); }
  };

  const update = (i: number, field: keyof Faq, val: string) =>
    setFaqs(prev => prev.map((f, idx) => idx === i ? { ...f, [field]: val } : f));

  return (
    <div className="bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden mt-4">
      {/* Section header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <HelpCircle size={14} className="text-amber-400" />
          <h3 className="text-sm font-bold text-white">Frequently Asked Questions</h3>
          <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
            {faqs.length} items
          </span>
        </div>
        {open ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-4 border-t border-white/5 pt-5">
          <p className="text-xs text-white/25">Changes publish live to the public Contact Us page.</p>

          {loading ? (
            <div className="flex justify-center py-6">
              <Loader2 size={20} className="animate-spin text-amber-500" />
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {faqs.map((f, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest">FAQ {i + 1}</p>
                      <button
                        onClick={() => setFaqs(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-white/20 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <Field label="Question" value={f.q} onChange={v => update(i, "q", v)} placeholder="How long does it take to start?" />
                    <Field label="Answer" value={f.a} onChange={v => update(i, "a", v)} multiline placeholder="Most projects kick off within…" />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setFaqs(prev => [...prev, { q: "", a: "" }])}
                  className="flex items-center gap-1.5 text-xs font-bold text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg transition-colors"
                >
                  <Plus size={12} /> Add FAQ
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-4 py-2 rounded-xl transition-colors disabled:opacity-60"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
                  {saving ? "Saving…" : saved ? "Saved!" : "Save FAQs"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
