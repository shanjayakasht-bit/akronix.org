"use client";

import { useState, useEffect } from "react";
import {
  Newspaper, Plus, Trash2, Edit2, Eye, EyeOff,
  Loader2, Save, X, CheckCircle2, Tag,
} from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  coverImage: string;
  publishedAt: string | null;
  createdAt: string;
  tags: string[];
};

const EMPTY: Omit<BlogPost, "id" | "createdAt" | "publishedAt"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  status: "DRAFT",
  coverImage: "",
  tags: [],
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const STATUS_STYLES: Record<string, string> = {
  PUBLISHED: "bg-green-500/10 text-green-400 border-green-500/20",
  DRAFT: "bg-white/5 text-white/40 border-white/10",
  ARCHIVED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const loadPosts = () => {
    fetch("/api/admin/site-settings")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["blog.posts"]) {
          try { setPosts(JSON.parse(data["blog.posts"])); } catch {}
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadPosts(); }, []);

  const savePosts = async (updatedPosts: BlogPost[]) => {
    const res = await fetch("/api/admin/site-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "blog.posts": JSON.stringify(updatedPosts) }),
    });
    return res.ok;
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      showToast("Title and content are required.", false);
      return;
    }
    setSaving(true);
    try {
      const now = new Date().toISOString();
      let updatedPosts: BlogPost[];
      if (editing === "new") {
        const newPost: BlogPost = {
          ...form,
          id: `post_${Date.now()}`,
          createdAt: now,
          publishedAt: form.status === "PUBLISHED" ? now : null,
          slug: form.slug || slugify(form.title),
        };
        updatedPosts = [newPost, ...posts];
      } else {
        updatedPosts = posts.map(p => p.id === editing
          ? { ...p, ...form, slug: form.slug || slugify(form.title), publishedAt: form.status === "PUBLISHED" && !p.publishedAt ? now : p.publishedAt }
          : p
        );
      }
      const ok = await savePosts(updatedPosts);
      if (ok) {
        setPosts(updatedPosts);
        showToast(editing === "new" ? "Post created!" : "Post updated!");
        setEditing(null);
      } else {
        showToast("Failed to save.", false);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const updated = posts.filter(p => p.id !== id);
    const ok = await savePosts(updated);
    if (ok) {
      setPosts(updated);
      showToast("Deleted.");
    }
  };

  const openEdit = (p: BlogPost) => {
    setForm({
      title: p.title, slug: p.slug, excerpt: p.excerpt, content: p.content,
      status: p.status, coverImage: p.coverImage, tags: [...p.tags],
    });
    setTagInput("");
    setEditing(p.id);
  };

  const addTag = () => {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (t && !form.tags.includes(t)) {
      setForm(f => ({ ...f, tags: [...f.tags, t] }));
    }
    setTagInput("");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm border ${toast.ok ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
          {toast.ok ? <CheckCircle2 size={14} /> : <X size={14} />}
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Newspaper size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Blog Management</h1>
            <p className="text-xs text-white/30">
              {posts.filter(p => p.status === "PUBLISHED").length} published · {posts.length} total
            </p>
          </div>
        </div>
        <button
          onClick={() => { setForm({ ...EMPTY }); setTagInput(""); setEditing("new"); }}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-4 py-2 rounded-xl transition-colors"
        >
          <Plus size={14} /> New Post
        </button>
      </div>

      {/* Editor */}
      {editing && (
        <div className="bg-[#161A23] border border-amber-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">
              {editing === "new" ? "New Blog Post" : "Edit Post"}
            </h3>
            <button onClick={() => setEditing(null)} className="text-white/30 hover:text-white/70"><X size={16} /></button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-white/25 mb-1 block">Title</label>
              <input
                value={form.title}
                onChange={e => {
                  const title = e.target.value;
                  setForm(f => ({ ...f, title, slug: slugify(title) }));
                }}
                placeholder="Post title"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-bold placeholder:text-white/20 focus:outline-none focus:border-amber-500/40"
              />
            </div>
            <div>
              <label className="text-[10px] text-white/25 mb-1 block">Slug</label>
              <input
                value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))}
                placeholder="post-url-slug"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/60 font-mono placeholder:text-white/20 focus:outline-none focus:border-amber-500/40"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-white/25 mb-1 block">Excerpt</label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
              placeholder="Brief summary shown in listings..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 resize-none"
            />
          </div>

          <div>
            <label className="text-[10px] text-white/25 mb-1 block">Content</label>
            <textarea
              rows={8}
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              placeholder="Write your blog post content here..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 resize-none font-mono"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-white/25 mb-1 block">Cover Image URL</label>
              <input
                value={form.coverImage}
                onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))}
                placeholder="https://..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/60 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40"
              />
            </div>
            <div>
              <label className="text-[10px] text-white/25 mb-1 block">Status</label>
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value as BlogPost["status"] }))}
                className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-amber-500/40"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-white/25 mb-2 block">Tags</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {form.tags.map(t => (
                <span key={t} className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full text-xs">
                  {t}
                  <button onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(x => x !== t) }))} className="ml-0.5 hover:text-red-400">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add tag, press Enter"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-amber-500/40"
              />
              <button onClick={addTag} className="px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                <Tag size={12} />
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setEditing(null)} className="text-sm text-white/40 hover:text-white/70 px-4 py-2 rounded-xl border border-white/10 transition-colors">Cancel</button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-5 py-2 rounded-xl transition-colors disabled:opacity-60"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? "Saving…" : editing === "new" ? "Publish Post" : "Update Post"}
            </button>
          </div>
        </div>
      )}

      {/* Post list */}
      {loading ? (
        <div className="flex items-center justify-center h-40"><Loader2 size={24} className="animate-spin text-amber-500" /></div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-[#161A23] border border-white/5 rounded-2xl">
          <Newspaper size={32} className="text-white/10 mx-auto mb-3" />
          <p className="text-white/25 text-sm">No blog posts yet.</p>
          <button onClick={() => { setForm({ ...EMPTY }); setTagInput(""); setEditing("new"); }} className="mt-4 text-xs text-amber-400 hover:text-amber-300 underline">
            Write your first post
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(p => (
            <div key={p.id} className="bg-[#161A23] border border-white/5 hover:border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-sm font-bold text-white">{p.title}</span>
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${STATUS_STYLES[p.status]}`}>
                    {p.status}
                  </span>
                  {p.tags.map(t => (
                    <span key={t} className="text-[9px] font-bold uppercase tracking-widest bg-white/5 text-white/25 px-2 py-0.5 rounded-full border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-white/30 font-mono mb-1">/{p.slug}</p>
                <p className="text-xs text-white/50 line-clamp-1">{p.excerpt}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-amber-400 hover:bg-amber-500/10 transition-colors">
                  <Edit2 size={13} />
                </button>
                <button onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors">
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
