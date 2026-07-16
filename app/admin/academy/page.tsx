"use client";

import { useState, useEffect } from "react";
import { GraduationCap, Save, Loader2, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

type HeroStat  = { value: string; suffix: string; label: string };
type Program   = { title: string; desc: string; features: string };
type WhyReason = { title: string; desc: string };
type NumberStat  = { value: string; suffix: string; label: string };
type Testimonial = { name: string; role: string; img: string; text: string; stars: number };

type Content = {
  hero_line1: string;
  hero_highlight: string;
  hero_line2: string;
  hero_subtext: string;
  hero_stats: HeroStat[];
  programs: Program[];
  why_headline: string;
  why_reasons: WhyReason[];
  numbers: NumberStat[];
  cta_headline: string;
  cta_desc: string;
  testimonials: Testimonial[];
};

const DEFAULTS: Content = {
  hero_line1: "Learn. Innovate.",
  hero_highlight: "Lead",
  hero_line2: "the Future.",
  hero_subtext:
    "Akronix Academy empowers students, entrepreneurs and professionals with the skills, mentorship and real-world experience to build innovative solutions and successful careers.",
  hero_stats: [
    { value: "500", suffix: "+", label: "Students Mentored" },
    { value: "100", suffix: "+", label: "Projects Guided" },
    { value: "50",  suffix: "+", label: "Workshops Conducted" },
    { value: "95",  suffix: "%", label: "Student Satisfaction" },
  ],
  programs: [
    { title: "Mentorship Programs",       desc: "Learn from industry experts and successful founders.",            features: "Startup Mentorship,Career Mentorship,Personal Branding,1:1 Guidance" },
    { title: "Academic Projects",          desc: "Guiding students in building real-world academic projects.",     features: "Mini Projects,Final Year Projects,Research Projects,Project Documentation" },
    { title: "Startup Incubation",         desc: "From idea to launch — we support your startup journey.",        features: "Idea Validation,MVP Development,Business Strategy,Fundraising Support" },
    { title: "Technical Courses",          desc: "Build in-demand technical skills from scratch.",                features: "Web Development,Data Science & AI,Cloud & DevOps,Cybersecurity" },
    { title: "Workshops & Bootcamps",      desc: "Hands-on learning through intensive workshops.",                features: "AI & ML Bootcamps,Hackathons,Coding Workshops,Industry Sessions" },
    { title: "Internships & Placements",   desc: "Gain real-world experience and career opportunities.",          features: "Industry Internships,Resume Building,Interview Prep,Placement Support" },
  ],
  why_headline: "Why Join Akronix Academy?",
  why_reasons: [
    { title: "Industry Experts",      desc: "Learn from professionals with real-world experience." },
    { title: "Practical Learning",    desc: "Hands-on projects and real-world case studies." },
    { title: "Personalized Guidance", desc: "1:1 mentorship tailored to your goals." },
    { title: "Career Growth",         desc: "Build skills that help you get hired." },
    { title: "Innovation Focus",      desc: "Work on cutting-edge technologies." },
    { title: "Supportive Community",  desc: "Collaborate, network and grow together." },
  ],
  numbers: [
    { value: "500", suffix: "+", label: "Students Mentored" },
    { value: "100", suffix: "+", label: "Projects Guided" },
    { value: "50",  suffix: "+", label: "Workshops" },
    { value: "25",  suffix: "+", label: "Industry Experts" },
    { value: "95",  suffix: "%", label: "Student Satisfaction" },
    { value: "10",  suffix: "+", label: "Partner Institutions" },
  ],
  cta_headline: "Start Your Learning Journey Today",
  cta_desc:
    "Join thousands of learners who are building skills, creating solutions and shaping their future with Akronix Academy.",
  testimonials: [
    { name: "Karthik M.", role: "Final Year Student",   img: "/bharath pic.jpeg",  text: "Akronix Academy helped me build my final year project and secure a great placement opportunity.", stars: 5 },
    { name: "Sneha R.",   role: "AI/ML Intern",         img: "/Sarvika pic.jpeg",  text: "The mentorship program gave me clarity and confidence to build my own startup.", stars: 5 },
    { name: "Rohan P.",   role: "Full Stack Developer", img: "/pranav pic.jpeg",   text: "The workshops and bootcamps improved my skills and helped me land my dream job.", stars: 5 },
  ],
};

const PROGRAM_LABELS = [
  "Program 1 — Mentorship (green)",
  "Program 2 — Academic Projects (indigo)",
  "Program 3 — Startup Incubation (purple)",
  "Program 4 — Technical Courses (blue)",
  "Program 5 — Workshops & Bootcamps (pink)",
  "Program 6 — Internships & Placements (orange)",
];

/* ── Shared field ── */
function Field({
  label, value, onChange, multiline, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) {
  const cls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 transition-colors resize-none";
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/40">{label}</label>
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />}
    </div>
  );
}

/* ── Collapsible section ── */
function Section({
  title, badge, defaultOpen = false, children,
}: {
  title: string; badge?: string; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-[#161A23] border border-white/5 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-white">{title}</h3>
          {badge && (
            <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
              {badge}
            </span>
          )}
        </div>
        {open ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
      </button>
      {open && <div className="px-6 pb-6 space-y-4 border-t border-white/5 pt-5">{children}</div>}
    </div>
  );
}

/* ── Page ── */
export default function AcademyAdmin() {
  const [content, setContent]  = useState<Content>(DEFAULTS);
  const [loading, setLoading]  = useState(true);
  const [saving,  setSaving]   = useState(false);
  const [saved,   setSaved]    = useState(false);

  useEffect(() => {
    fetch("/api/admin/site-settings?prefix=academy.")
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data["academy.content"]) {
          try { setContent({ ...DEFAULTS, ...JSON.parse(data["academy.content"]) }); } catch {}
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = <K extends keyof Content>(key: K, val: Content[K]) =>
    setContent(prev => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "academy.content": JSON.stringify(content) }),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } finally { setSaving(false); }
  };

  const updateHeroStat = (i: number, field: keyof HeroStat, val: string) => {
    const next = [...content.hero_stats];
    next[i] = { ...next[i], [field]: val };
    set("hero_stats", next);
  };

  const updateProgram = (i: number, field: keyof Program, val: string) => {
    const next = [...content.programs];
    next[i] = { ...next[i], [field]: val };
    set("programs", next);
  };

  const updateReason = (i: number, field: keyof WhyReason, val: string) => {
    const next = [...content.why_reasons];
    next[i] = { ...next[i], [field]: val };
    set("why_reasons", next);
  };

  const updateNumber = (i: number, field: keyof NumberStat, val: string) => {
    const next = [...content.numbers];
    next[i] = { ...next[i], [field]: val };
    set("numbers", next);
  };

  const updateTestimonial = (i: number, field: keyof Testimonial, val: string | number) => {
    const next = [...content.testimonials];
    next[i] = { ...next[i], [field]: val };
    set("testimonials", next);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 size={24} className="animate-spin text-amber-500" />
    </div>
  );

  const SaveBtn = ({ full }: { full?: boolean }) => (
    <button
      onClick={handleSave}
      disabled={saving}
      className={`flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-xl transition-colors disabled:opacity-60 ${full ? "px-6 py-3" : "px-4 py-2"}`}
    >
      {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
      {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <GraduationCap size={16} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-black text-white">Academy Page</h1>
            <p className="text-xs text-white/30">All changes publish live to the public Academy page.</p>
          </div>
        </div>
        <SaveBtn />
      </div>

      {/* Live-update notice */}
      <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl px-4 py-3 text-xs text-amber-300/70">
        Changes are saved to the database and immediately reflected on the public <span className="font-bold text-amber-400">/academy</span> page.
      </div>

      {/* ─── 1. Hero ─── */}
      <Section title="Hero Section" defaultOpen>
        <div className="grid grid-cols-3 gap-4">
          <Field
            label='Headline — Line 1'
            value={content.hero_line1}
            onChange={v => set("hero_line1", v)}
            placeholder="Learn. Innovate."
          />
          <Field
            label='Highlighted / Gradient Word'
            value={content.hero_highlight}
            onChange={v => set("hero_highlight", v)}
            placeholder="Lead"
          />
          <Field
            label='Headline — Line 2'
            value={content.hero_line2}
            onChange={v => set("hero_line2", v)}
            placeholder="the Future."
          />
        </div>
        <Field
          label="Sub-description"
          value={content.hero_subtext}
          onChange={v => set("hero_subtext", v)}
          multiline
          placeholder="Akronix Academy empowers students…"
        />
      </Section>

      {/* ─── 2. Hero Stats ─── */}
      <Section title="Hero Stats" badge="4 stats" defaultOpen>
        <p className="text-xs text-white/25 -mt-1">Shown as 4 mini stats beneath the hero description. Icons are preset.</p>
        <div className="grid grid-cols-2 gap-4">
          {content.hero_stats.map((s, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Stat {i + 1}</p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Value" value={s.value} onChange={v => updateHeroStat(i, "value", v)} placeholder="500" />
                <Field label="Suffix" value={s.suffix} onChange={v => updateHeroStat(i, "suffix", v)} placeholder="+" />
              </div>
              <Field label="Label" value={s.label} onChange={v => updateHeroStat(i, "label", v)} placeholder="Students Mentored" />
            </div>
          ))}
        </div>
      </Section>

      {/* ─── 3. Programs ─── */}
      <Section title="Our Programs" badge="6 programs">
        <p className="text-xs text-white/25 -mt-1">
          Each program has a preset icon and colour theme. Edit title, description, and features (comma-separated).
        </p>
        <div className="space-y-3">
          {content.programs.map((p, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3">
              <p className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest">{PROGRAM_LABELS[i]}</p>
              <Field label="Title" value={p.title} onChange={v => updateProgram(i, "title", v)} />
              <Field label="Short Description" value={p.desc} onChange={v => updateProgram(i, "desc", v)} multiline />
              <Field
                label="Features (comma-separated)"
                value={p.features}
                onChange={v => updateProgram(i, "features", v)}
                placeholder="Feature 1,Feature 2,Feature 3,Feature 4"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* ─── 4. Why Join ─── */}
      <Section title="Why Join Section" badge="6 reasons">
        <Field
          label="Section Headline"
          value={content.why_headline}
          onChange={v => set("why_headline", v)}
          placeholder="Why Join Akronix Academy?"
        />
        <div className="grid grid-cols-2 gap-3 mt-1">
          {content.why_reasons.map((r, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Reason {i + 1}</p>
              <Field label="Title" value={r.title} onChange={v => updateReason(i, "title", v)} />
              <Field label="Description" value={r.desc} onChange={v => updateReason(i, "desc", v)} />
            </div>
          ))}
        </div>
      </Section>

      {/* ─── 5. By The Numbers ─── */}
      <Section title="By The Numbers" badge="6 stats">
        <p className="text-xs text-white/25 -mt-1">Animated count-up statistics shown in the success stories section.</p>
        <div className="grid grid-cols-2 gap-4">
          {content.numbers.map((n, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Stat {i + 1}</p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Value" value={n.value} onChange={v => updateNumber(i, "value", v)} placeholder="500" />
                <Field label="Suffix" value={n.suffix} onChange={v => updateNumber(i, "suffix", v)} placeholder="+" />
              </div>
              <Field label="Label" value={n.label} onChange={v => updateNumber(i, "label", v)} placeholder="Students Mentored" />
            </div>
          ))}
        </div>
      </Section>

      {/* ─── 6. CTA ─── */}
      <Section title="CTA Section">
        <Field label="Headline" value={content.cta_headline} onChange={v => set("cta_headline", v)} placeholder="Start Your Learning Journey Today" />
        <Field label="Description" value={content.cta_desc} onChange={v => set("cta_desc", v)} multiline />
      </Section>

      {/* ─── 7. Student Success Stories ─── */}
      <Section title="Student Success Stories" badge="3 testimonials">
        <p className="text-xs text-white/25 -mt-1">Shown on the public academy page beneath &ldquo;Why Join&rdquo;. Use real photo filenames (e.g. <code className="text-amber-400/70">/bharath pic.jpeg</code>) or leave blank for an initials fallback.</p>
        <div className="space-y-4">
          {content.testimonials.map((t, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3">
              <p className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest">Story {i + 1}</p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Full Name" value={t.name} onChange={v => updateTestimonial(i, "name", v)} placeholder="Karthik M." />
                <Field label="Role / Title" value={t.role} onChange={v => updateTestimonial(i, "role", v)} placeholder="Final Year Student" />
              </div>
              <Field label="Photo URL" value={t.img} onChange={v => updateTestimonial(i, "img", v)} placeholder="/student-photo.jpeg or https://..." />
              <Field label="Quote / Testimonial" value={t.text} onChange={v => updateTestimonial(i, "text", v)} multiline placeholder="What they said about Akronix Academy…" />
              <div>
                <label className="text-[10px] font-medium text-white/40 block mb-2">Star Rating</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => updateTestimonial(i, "stars", star)}
                      className={`text-lg transition-colors ${star <= t.stars ? "text-amber-400" : "text-white/10 hover:text-amber-300/40"}`}
                    >★</button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="flex justify-end pb-8">
        <SaveBtn full />
      </div>
    </div>
  );
}
