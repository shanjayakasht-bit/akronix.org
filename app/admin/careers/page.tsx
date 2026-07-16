"use client";

import { useState, useEffect } from "react";
import { Briefcase, Save, Loader2, CheckCircle2, Plus, Trash2, MapPin, Clock } from "lucide-react";

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  desc: string;
  requirements: string;
  isActive: boolean;
};

const DEFAULT_JOBS: Job[] = [
  {
    id: "j1", title: "Senior Full-Stack Developer", department: "Engineering", location: "Remote / Kochi",
    type: "Full-time", experience: "3–5 years", isActive: true,
    desc: "Build and scale our SaaS products using React, Next.js, and Node.js.",
    requirements: "React,Next.js,Node.js,PostgreSQL,TypeScript",
  },
  {
    id: "j2", title: "Product Designer (UI/UX)", department: "Design", location: "Kochi, Kerala",
    type: "Full-time", experience: "2–4 years", isActive: true,
    desc: "Design intuitive and beautiful user interfaces for our SaaS products.",
    requirements: "Figma,User Research,Prototyping,Design Systems",
  },
  {
    id: "j3", title: "Business Development Executive", department: "Sales", location: "Remote",
    type: "Full-time", experience: "1–3 years", isActive: true,
    desc: "Drive growth by identifying new business opportunities and partnerships.",
    requirements: "B2B Sales,CRM,Communication,Lead Generation",
  },
];

const DEPARTMENTS = ["Engineering", "Design", "Sales", "Marketing", "Operations", "HR", "Finance"];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];

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

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/40">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/40 transition-colors">
        {options.map(o => <option key={o} value={o} className="bg-[#161A23]">{o}</option>)}
      </select>
    </div>
  );
}

export default function CareersAdmin() {
  const [jobs, setJobs] = useState<Job[]>(DEFAULT_JOBS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=careers.")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["careers.jobs"]) {
          try { setJobs(JSON.parse(data["careers.jobs"])); } catch {}
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
        body: JSON.stringify({ "careers.jobs": JSON.stringify(jobs) }),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } finally { setSaving(false); }
  };

  const updateJob = (id: string, field: keyof Job, val: Job[keyof Job]) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, [field]: val } : j));
  };

  const addJob = () => {
    const newJob: Job = {
      id: `job_${Date.now()}`, title: "", department: "Engineering",
      location: "", type: "Full-time", experience: "", desc: "", requirements: "", isActive: true,
    };
    setJobs(prev => [...prev, newJob]);
    setExpandedId(newJob.id);
  };

  const removeJob = (id: string) => setJobs(prev => prev.filter(j => j.id !== id));
  const activeCount = jobs.filter(j => j.isActive).length;

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-amber-500" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Briefcase size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Careers & Jobs</h1>
            <p className="text-xs text-white/30">{activeCount} active openings · {jobs.length} total</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={addJob} className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
            <Plus size={14} /> Add Job
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-4 py-2 rounded-xl transition-colors disabled:opacity-60">
            {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Listings", value: activeCount, color: "text-green-400" },
          { label: "Departments", value: jobs.map(j => j.department).filter((d, i, a) => a.indexOf(d) === i).length, color: "text-blue-400" },
          { label: "Total Jobs", value: jobs.length, color: "text-amber-400" },
        ].map(s => (
          <div key={s.label} className="bg-[#161A23] border border-white/5 rounded-2xl p-5">
            <p className="text-xs text-white/30 mb-2">{s.label}</p>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Job list */}
      <div className="space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className={`bg-[#161A23] border rounded-2xl overflow-hidden transition-colors ${job.isActive ? "border-white/5" : "border-white/[0.03] opacity-60"}`}>
            {/* Job summary row */}
            <div
              className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
              onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-bold text-white">{job.title || "Untitled Job"}</p>
                  {job.isActive
                    ? <span className="px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] font-bold">ACTIVE</span>
                    : <span className="px-1.5 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/10 text-[9px] font-bold">INACTIVE</span>}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-white/30 flex items-center gap-1"><MapPin size={9} />{job.location || "—"}</span>
                  <span className="text-[10px] text-white/30 flex items-center gap-1"><Clock size={9} />{job.type}</span>
                  <span className="text-[10px] text-white/30">{job.department}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={e => { e.stopPropagation(); removeJob(job.id); }}
                  className="text-red-400/40 hover:text-red-400 transition-colors p-1"><Trash2 size={13} /></button>
                <span className="text-white/20 text-xs">{expandedId === job.id ? "▲" : "▼"}</span>
              </div>
            </div>

            {/* Expanded edit form */}
            {expandedId === job.id && (
              <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Job Title" value={job.title} onChange={v => updateJob(job.id, "title", v)} placeholder="Senior Developer" />
                  <SelectField label="Department" value={job.department} onChange={v => updateJob(job.id, "department", v)} options={DEPARTMENTS} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Location" value={job.location} onChange={v => updateJob(job.id, "location", v)} placeholder="Remote / Kochi" />
                  <SelectField label="Job Type" value={job.type} onChange={v => updateJob(job.id, "type", v)} options={JOB_TYPES} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Experience Required" value={job.experience} onChange={v => updateJob(job.id, "experience", v)} placeholder="2–4 years" />
                  <div className="space-y-1.5 flex flex-col justify-end">
                    <label className="text-xs font-medium text-white/40">Status</label>
                    <label className="flex items-center gap-2.5 cursor-pointer mt-1">
                      <input type="checkbox" checked={job.isActive} onChange={e => updateJob(job.id, "isActive", e.target.checked)}
                        className="w-4 h-4 rounded bg-white/5 border border-white/20 accent-amber-500" />
                      <span className="text-xs text-white/60">Active (visible on site)</span>
                    </label>
                  </div>
                </div>
                <Field label="Job Description" value={job.desc} onChange={v => updateJob(job.id, "desc", v)} multiline placeholder="Brief role description..." />
                <Field label="Requirements (comma-separated)" value={job.requirements} onChange={v => updateJob(job.id, "requirements", v)} placeholder="React,TypeScript,Node.js" />
              </div>
            )}
          </div>
        ))}

        {jobs.length === 0 && (
          <div className="bg-[#161A23] border border-white/5 rounded-2xl p-16 text-center">
            <Briefcase size={32} className="text-white/10 mx-auto mb-3" />
            <p className="text-white/25 text-sm">No job listings yet.</p>
            <button onClick={addJob} className="mt-4 flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors mx-auto">
              <Plus size={14} /> Add Your First Job
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-end pb-8">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-60">
          {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
          {saving ? "Saving…" : saved ? "Saved!" : "Save All Jobs"}
        </button>
      </div>
    </div>
  );
}
