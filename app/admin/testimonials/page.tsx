"use client";

import { useState, useEffect } from "react";
import {
  Quote, Plus, Trash2, Edit2, Star, Eye, EyeOff,
  Loader2, Save, X, CheckCircle2,
} from "lucide-react";

type Testimonial = {
  id: string;
  authorName: string;
  authorTitle: string;
  company: string;
  content: string;
  rating: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
};

const EMPTY = {
  authorName: "",
  authorTitle: "",
  company: "",
  content: "",
  rating: 5,
  isPublished: true,
  isFeatured: false,
};

function Field({ label, value, onChange, multiline = false, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; placeholder?: string;
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

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetch("/api/admin/testimonials")
      .then(r => r.json())
      .then(data => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    setForm({ ...EMPTY });
    setEditing("new");
  };

  const openEdit = (t: Testimonial) => {
    setForm({
      authorName: t.authorName,
      authorTitle: t.authorTitle,
      company: t.company,
      content: t.content,
      rating: t.rating,
      isPublished: t.isPublished,
      isFeatured: t.isFeatured,
    });
    setEditing(t.id);
  };

  const handleSave = async () => {
    if (!form.authorName.trim() || !form.content.trim()) {
      showToast("Name and content are required.", false);
      return;
    }
    setSaving(true);
    try {
      if (editing === "new") {
        const res = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          const created: Testimonial = await res.json();
          setItems(prev => [created, ...prev]);
          showToast("Testimonial created!");
        } else {
          showToast("Failed to create.", false);
        }
      } else {
        const res = await fetch(`/api/admin/testimonials/${editing}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          const updated: Testimonial = await res.json();
          setItems(prev => prev.map(t => t.id === editing ? updated : t));
          showToast("Testimonial updated!");
        } else {
          showToast("Failed to update.", false);
        }
      }
      setEditing(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems(prev => prev.filter(t => t.id !== id));
      showToast("Deleted.");
    }
  };

  const togglePublished = async (t: Testimonial) => {
    const res = await fetch(`/api/admin/testimonials/${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !t.isPublished }),
    });
    if (res.ok) {
      const updated: Testimonial = await res.json();
      setItems(prev => prev.map(x => x.id === t.id ? updated : x));
    }
  };

  const toggleFeatured = async (t: Testimonial) => {
    const res = await fetch(`/api/admin/testimonials/${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !t.isFeatured }),
    });
    if (res.ok) {
      const updated: Testimonial = await res.json();
      setItems(prev => prev.map(x => x.id === t.id ? updated : x));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm border ${
          toast.ok
            ? "bg-green-500/10 border-green-500/20 text-green-400"
            : "bg-red-500/10 border-red-500/20 text-red-400"
        }`}>
          {toast.ok ? <CheckCircle2 size={14} /> : <X size={14} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Quote size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Testimonials</h1>
            <p className="text-xs text-white/30">
              {items.filter(t => t.isPublished).length} published · {items.length} total
            </p>
          </div>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-4 py-2 rounded-xl transition-colors"
        >
          <Plus size={14} /> Add Testimonial
        </button>
      </div>

      {/* Info */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl px-4 py-3">
        <p className="text-xs text-blue-400/80">
          Published testimonials appear on the homepage. Featured testimonials are shown first.
          The homepage rating label can be edited from <a href="/admin/homepage" className="underline">Homepage Settings</a>.
        </p>
      </div>

      {/* Add / Edit Form */}
      {editing && (
        <div className="bg-[#161A23] border border-amber-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">
              {editing === "new" ? "Add New Testimonial" : "Edit Testimonial"}
            </h3>
            <button onClick={() => setEditing(null)} className="text-white/30 hover:text-white/70 transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Author Name"
              value={form.authorName}
              onChange={v => setForm(f => ({ ...f, authorName: v }))}
              placeholder="Ravi Sharma"
            />
            <Field
              label="Title"
              value={form.authorTitle}
              onChange={v => setForm(f => ({ ...f, authorTitle: v }))}
              placeholder="CEO"
            />
          </div>

          <Field
            label="Company"
            value={form.company}
            onChange={v => setForm(f => ({ ...f, company: v }))}
            placeholder="ShopEasy"
          />

          <Field
            label="Testimonial Content"
            value={form.content}
            onChange={v => setForm(f => ({ ...f, content: v }))}
            multiline
            placeholder="Akronix transformed our business..."
          />

          <div className="flex flex-wrap items-center gap-6">
            {/* Star rating */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40">Rating:</span>
              {[1, 2, 3, 4, 5].map(r => (
                <button key={r} onClick={() => setForm(f => ({ ...f, rating: r }))}>
                  <Star
                    size={18}
                    className={r <= form.rating ? "fill-amber-400 text-amber-400" : "text-white/20"}
                  />
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))}
                className="w-4 h-4 rounded accent-amber-500"
              />
              <span className="text-xs text-white/50">Published</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))}
                className="w-4 h-4 rounded accent-amber-500"
              />
              <span className="text-xs text-white/50">Featured</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setEditing(null)}
              className="text-sm text-white/40 hover:text-white/70 px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-5 py-2 rounded-xl transition-colors disabled:opacity-60"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? "Saving…" : editing === "new" ? "Create" : "Update"}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 size={24} className="animate-spin text-amber-500" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-[#161A23] border border-white/5 rounded-2xl">
          <Quote size={32} className="text-white/10 mx-auto mb-3" />
          <p className="text-white/25 text-sm">No testimonials yet.</p>
          <button onClick={openNew} className="mt-4 text-xs text-amber-400 hover:text-amber-300 underline transition-colors">
            Add your first testimonial
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(t => (
            <div
              key={t.id}
              className="bg-[#161A23] border border-white/5 hover:border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-colors"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm flex-shrink-0">
                {t.authorName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <span className="text-sm font-bold text-white">{t.authorName}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-xs text-white/40">{t.authorTitle}{t.company ? `, ${t.company}` : ""}</span>
                  {t.isFeatured && (
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-500/15 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">
                      Featured
                    </span>
                  )}
                  {!t.isPublished && (
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-white/5 text-white/30 px-2 py-0.5 rounded-full border border-white/10">
                      Draft
                    </span>
                  )}
                </div>

                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      className={i < t.rating ? "fill-amber-400 text-amber-400" : "text-white/10"}
                    />
                  ))}
                </div>

                <p className="text-sm text-white/55 leading-relaxed line-clamp-2">{t.content}</p>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => toggleFeatured(t)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${t.isFeatured ? "text-amber-400 bg-amber-500/10" : "text-white/20 hover:text-amber-400 hover:bg-amber-500/10"}`}
                  title={t.isFeatured ? "Unfeature" : "Feature"}
                >
                  <Star size={13} className={t.isFeatured ? "fill-amber-400" : ""} />
                </button>
                <button
                  onClick={() => togglePublished(t)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${t.isPublished ? "text-green-400 hover:bg-green-500/10" : "text-white/20 hover:text-white/60 hover:bg-white/5"}`}
                  title={t.isPublished ? "Unpublish" : "Publish"}
                >
                  {t.isPublished ? <Eye size={13} /> : <EyeOff size={13} />}
                </button>
                <button
                  onClick={() => openEdit(t)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                  title="Edit"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
