"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Save, Loader2, CheckCircle2, Plus, Trash2, Camera, ChevronUp, ChevronDown, Upload, Eye, EyeOff } from "lucide-react";
import { DEFAULT_LEADERSHIP, type LeadershipMember } from "@/lib/leadership-defaults";

type TeamMember = LeadershipMember;

const COLOR_PRESETS = ["#2563EB", "#9333EA", "#16A34A", "#EA580C", "#0D9488", "#DC2626", "#F59E0B"];

const DEFAULT_TEAM: TeamMember[] = DEFAULT_LEADERSHIP;

function Field({ label, value, onChange, placeholder, multiline }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean;
}) {
  const cls = "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors resize-none";
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-medium text-white/35 uppercase tracking-wider">{label}</label>
      {multiline
        ? <textarea rows={2} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />}
    </div>
  );
}

export default function LeadershipAdmin() {
  const [team, setTeam]     = useState<TeamMember[]>(DEFAULT_TEAM);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=site.")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["site.leadership"]) {
          try {
            const parsed = JSON.parse(data["site.leadership"]);
            setTeam(parsed.map((m: TeamMember) => ({ ...DEFAULT_TEAM[0], ...m })));
          } catch {}
        }
        if (data["site.leadership.visible"] === "false") setVisible(false);
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
          "site.leadership": JSON.stringify(team),
          "site.leadership.visible": String(visible),
        }),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } finally { setSaving(false); }
  };

  const update = (i: number, field: keyof TeamMember, value: string) =>
    setTeam(prev => prev.map((m, idx) => idx === i ? { ...m, [field]: value } : m));

  const addMember = () => setTeam(prev => [...prev, {
    name: "", title: "", bio: "", photo: "", avatar: "?", linkedin: "", twitter: "", instagram: "", color: "#2563EB",
  }]);

  const moveMember = (i: number, dir: -1 | 1) => {
    const target = i + dir;
    if (target < 0 || target >= team.length) return;
    setTeam(prev => {
      const next = [...prev];
      [next[i], next[target]] = [next[target], next[i]];
      return next;
    });
  };

  const handlePhotoUpload = async (i: number, file: File) => {
    setUploadError(null);
    setUploadingIdx(i);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "leadership");
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        update(i, "photo", data.url);
      } else {
        setUploadError(data.error ?? "Upload failed.");
      }
    } catch {
      setUploadError("Upload failed.");
    } finally {
      setUploadingIdx(null);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 size={24} className="animate-spin text-amber-500" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-2.5">
          <Users size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Leadership Team</h1>
            <p className="text-xs text-white/30">Changes publish live to the About Us page.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => setVisible(v => !v)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border transition-colors ${
              visible
                ? "text-green-400 bg-green-500/10 border-green-500/20 hover:bg-green-500/15"
                : "text-white/40 bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            {visible ? <Eye size={12} /> : <EyeOff size={12} />}
            {visible ? "Shown on About page" : "Hidden on About page"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={addMember}
            className="flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg transition-colors"
          >
            <Plus size={12} /> Add Member
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-4 py-2 rounded-xl transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </motion.button>
        </div>
      </motion.div>

      <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl px-4 py-3 text-xs text-amber-300/70 space-y-1">
        <p>Upload a <span className="font-bold text-amber-400">photo</span> directly, or paste a URL. Leave blank to show the coloured initials avatar instead.</p>
        <p>Use the <span className="font-bold text-amber-400">arrows</span> on each card to reorder members — order here matches the order shown on the site. This section also powers the full <span className="font-bold text-amber-400">/team</span> page.</p>
      </div>
      {uploadError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-xs text-red-400">{uploadError}</div>
      )}

      {/* Team grid */}
      <motion.div
        className="grid sm:grid-cols-2 gap-4"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.07 } } }}
      >
        <AnimatePresence>
          {team.map((m, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-[#161A23] border border-white/5 rounded-2xl p-5 space-y-4 hover:border-white/10 transition-colors"
            >
              {/* Preview + delete */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo} alt={m.name} className="w-11 h-11 rounded-full object-cover border-2 border-white/10" />
                  ) : (
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm border-2"
                      style={{ backgroundColor: m.color + "33", borderColor: m.color + "60" }}
                    >
                      <span style={{ color: m.color }}>{m.avatar || "?"}</span>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-white">{m.name || "Name"}</p>
                    <p className="text-[10px] text-white/35">{m.title || "Title"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => moveMember(i, -1)}
                    disabled={i === 0}
                    className="text-white/20 hover:text-amber-400 transition-colors p-1 disabled:opacity-20 disabled:hover:text-white/20"
                    title="Move up"
                  >
                    <ChevronUp size={14} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => moveMember(i, 1)}
                    disabled={i === team.length - 1}
                    className="text-white/20 hover:text-amber-400 transition-colors p-1 disabled:opacity-20 disabled:hover:text-white/20"
                    title="Move down"
                  >
                    <ChevronDown size={14} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setTeam(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-white/20 hover:text-red-400 transition-colors p-1"
                    title="Remove"
                  >
                    <Trash2 size={13} />
                  </motion.button>
                </div>
              </div>

              {/* Fields */}
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Full Name" value={m.name} onChange={v => {
                    const avatar = v.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
                    setTeam(prev => prev.map((x, idx) => idx === i ? { ...x, name: v, avatar } : x));
                  }} placeholder="Shanjay Akash T." />
                  <Field label="Job Title / Role" value={m.title} onChange={v => update(i, "title", v)} placeholder="Founder & CEO" />
                </div>
                <Field label="Short Bio" value={m.bio} onChange={v => update(i, "bio", v)} multiline placeholder="Brief description..." />
                <div className="flex gap-2 items-end">
                  <div className="relative flex-1">
                    <Field label="Photo URL (optional)" value={m.photo} onChange={v => update(i, "photo", v)} placeholder="/team-photo.jpg or https://..." />
                    <Camera size={12} className="absolute right-3 top-[26px] text-white/20 pointer-events-none" />
                  </div>
                  <input
                    ref={el => { fileInputRefs.current[i] = el; }}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handlePhotoUpload(i, file);
                      e.target.value = "";
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => fileInputRefs.current[i]?.click()}
                    disabled={uploadingIdx === i}
                    className="flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg transition-colors disabled:opacity-60 whitespace-nowrap"
                  >
                    {uploadingIdx === i ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                    {uploadingIdx === i ? "Uploading…" : "Upload"}
                  </motion.button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Field label="LinkedIn URL" value={m.linkedin} onChange={v => update(i, "linkedin", v)} placeholder="https://..." />
                  <Field label="Twitter/X URL" value={m.twitter} onChange={v => update(i, "twitter", v)} placeholder="https://..." />
                  <Field label="Instagram URL" value={m.instagram} onChange={v => update(i, "instagram", v)} placeholder="https://..." />
                </div>
              </div>

              {/* Color picker */}
              <div>
                <label className="text-[10px] text-white/25 mb-2 block uppercase tracking-wider">Avatar Colour (used when no photo)</label>
                <div className="flex gap-2">
                  {COLOR_PRESETS.map(c => (
                    <motion.button
                      key={c}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => update(i, "color", c)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${m.color === c ? "border-white scale-110" : "border-transparent"}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-end pb-8">
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
          {saving ? "Saving…" : saved ? "All Saved!" : "Save All Changes"}
        </motion.button>
      </div>
    </div>
  );
}
