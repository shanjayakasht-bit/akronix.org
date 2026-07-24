"use client";

import { useState, useMemo, useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, UserCheck, Package, Cpu, Briefcase, GraduationCap,
  PhoneCall, Zap, Clock, CheckSquare, BarChart3, Globe,
  Search, Check, ArrowRight, ShieldCheck, Cloud, Settings, HelpCircle,
  Sparkles, X, LucideIcon,
} from "lucide-react";
import Link from "next/link";

/* ─── CMS content type (matches admin/products editor) ────────── */
type CmsProduct = {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  desc: string;
  features: string[];
  isNew?: boolean;
};

type ProductDesign = { icon: LucideIcon; color: string; bgColor: string; accentColor: string };

const FALLBACK_PALETTE: ProductDesign[] = [
  { icon: Package, color: "#2563EB", bgColor: "#EFF6FF", accentColor: "#DBEAFE" },
  { icon: Package, color: "#16A34A", bgColor: "#F0FDF4", accentColor: "#DCFCE7" },
  { icon: Package, color: "#9333EA", bgColor: "#FDF4FF", accentColor: "#F3E8FF" },
  { icon: Package, color: "#EA580C", bgColor: "#FFF7ED", accentColor: "#FFEDD5" },
];

const categories = [
  { id: "all", name: "All Products" },
  { id: "crm", name: "CRM" },
  { id: "hr", name: "HR & Workforce" },
  { id: "operations", name: "Operations" },
  { id: "finance", name: "Finance" },
  { id: "education", name: "Education" },
  { id: "retail", name: "Retail" },
  { id: "ai", name: "AI & Automation" },
];

const productsList = [
  {
    id: "crm",
    name: "Akronix CRM",
    category: "crm",
    categoryLabel: "CRM",
    desc: "Manage leads, customers, and sales pipeline in one place.",
    features: ["Lead Management", "Sales Automation", "Reports & Analytics", "Customer Support"],
    icon: Users,
    color: "#2563EB",
    bgColor: "#EFF6FF",
    accentColor: "#DBEAFE",
  },
  {
    id: "hrms",
    name: "Akronix HRMS",
    category: "hr",
    categoryLabel: "HR & Workforce",
    desc: "Streamline HR operations and empower your workforce.",
    features: ["Employee Management", "Attendance & Leave", "Payroll Management", "Performance Tracking"],
    icon: UserCheck,
    color: "#16A34A",
    bgColor: "#F0FDF4",
    accentColor: "#DCFCE7",
  },
  {
    id: "erp",
    name: "Akronix ERP",
    category: "operations",
    categoryLabel: "Operations",
    desc: "Integrate and manage all your business processes seamlessly.",
    features: ["Procurement", "Inventory Management", "Accounting", "Business Intelligence"],
    icon: Package,
    color: "#EA580C",
    bgColor: "#FFF7ED",
    accentColor: "#FFEDD5",
  },
  {
    id: "inventory",
    name: "Akronix Inventory",
    category: "operations",
    categoryLabel: "Operations",
    desc: "Track inventory, manage stock, and optimize operations.",
    features: ["Stock Management", "Warehouse Management", "Purchase & Sales", "Low Stock Alerts"],
    icon: Cpu,
    color: "#0D9488",
    bgColor: "#F0FDFA",
    accentColor: "#DCFCE7",
  },
  {
    id: "pos",
    name: "Akronix POS",
    category: "retail",
    categoryLabel: "Retail",
    desc: "Smart billing and retail management made simple.",
    features: ["Billing & Invoicing", "Multi-store Management", "Sales Analytics", "Customer Management"],
    icon: Briefcase,
    color: "#E11D48",
    bgColor: "#FFF1F2",
    accentColor: "#FFE4E6",
  },
  {
    id: "lms",
    name: "Akronix LMS",
    category: "education",
    categoryLabel: "Education",
    desc: "A complete learning management system for modern education.",
    features: ["Course Management", "Live Classes", "Exams & Assignments", "Student Progress Tracking"],
    icon: GraduationCap,
    color: "#9333EA",
    bgColor: "#FDF4FF",
    accentColor: "#F3E8FF",
  },
  {
    id: "helpdesk",
    name: "Akronix Helpdesk",
    category: "ai",
    categoryLabel: "AI & Automation",
    desc: "Deliver exceptional support with a smart helpdesk system.",
    features: ["Ticket Management", "SLA Management", "Knowledge Base", "Customer Feedback"],
    icon: PhoneCall,
    color: "#2563EB",
    bgColor: "#EFF6FF",
    accentColor: "#DBEAFE",
  },
  {
    id: "ai-assistant",
    name: "Akronix AI Assistant",
    category: "ai",
    categoryLabel: "AI & Automation",
    desc: "AI-powered automation to boost productivity and save time.",
    features: ["Smart Automations", "AI Chatbot", "Workflow Automation", "Data Insights"],
    icon: Zap,
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    accentColor: "#EDE9FE",
    isNew: true,
  },
  {
    id: "attendance",
    name: "Akronix Attendance",
    category: "hr",
    categoryLabel: "HR & Workforce",
    desc: "Track attendance accurately with real-time insights.",
    features: ["Biometric Integration", "Live Attendance", "Shift Management", "Reports & Analytics"],
    icon: Clock,
    color: "#0284C7",
    bgColor: "#F0F9FF",
    accentColor: "#E0F2FE",
  },
  {
    id: "project-management",
    name: "Akronix Project Management",
    category: "operations",
    categoryLabel: "Operations",
    desc: "Plan, track, and deliver projects on time, every time.",
    features: ["Task Management", "Team Collaboration", "Timeline Tracking", "Project Reports"],
    icon: CheckSquare,
    color: "#059669",
    bgColor: "#ECFDF5",
    accentColor: "#D1FAE5",
  },
  {
    id: "books",
    name: "Akronix Books",
    category: "finance",
    categoryLabel: "Finance",
    desc: "Simple bookkeeping and invoicing for growing businesses.",
    features: ["Invoicing", "Expense Tracking", "Tax Filing", "Financial Reports"],
    icon: BarChart3,
    color: "#D97706",
    bgColor: "#FEF3C7",
    accentColor: "#FDE68A",
  },
  {
    id: "ecommerce",
    name: "Akronix E-commerce",
    category: "retail",
    categoryLabel: "Retail",
    desc: "Launch and manage your online store effortlessly.",
    features: ["Store Builder", "Product Catalog", "Order Management", "Payment Gateways"],
    icon: Globe,
    color: "#DB2777",
    bgColor: "#FDF2F8",
    accentColor: "#FBCFE8",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

/* Design (icon/colors) keyed by id — admin only manages text content */
const PRODUCT_DESIGN: Record<string, ProductDesign> = Object.fromEntries(
  productsList.map((p) => [p.id, { icon: p.icon, color: p.color, bgColor: p.bgColor, accentColor: p.accentColor }])
);

const DEFAULT_PRODUCTS_CMS: CmsProduct[] = productsList.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  categoryLabel: p.categoryLabel,
  desc: p.desc,
  features: p.features,
  isNew: p.isNew,
}));

function mergeProducts(cms: CmsProduct[] | null) {
  const source = cms && cms.length > 0 ? cms : DEFAULT_PRODUCTS_CMS;
  return source.map((p, i) => ({
    ...p,
    ...(PRODUCT_DESIGN[p.id] ?? FALLBACK_PALETTE[i % FALLBACK_PALETTE.length]),
  }));
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cmsProducts, setCmsProducts] = useState<CmsProduct[] | null>(null);

  useEffect(() => {
    fetch("/api/site-settings?prefix=products.")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        if (data["products.catalog"]) {
          try { setCmsProducts(JSON.parse(data["products.catalog"])); } catch {}
        }
      })
      .catch(() => {});
  }, []);

  const activeProducts = useMemo(() => mergeProducts(cmsProducts), [cmsProducts]);

  const filteredProducts = useMemo(() => {
    return activeProducts.filter((product) => {
      if (selectedCategory !== "all" && product.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(q) ||
          product.desc.toLowerCase().includes(q) ||
          product.categoryLabel.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeProducts, selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: activeProducts.length };
    activeProducts.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return counts;
  }, [activeProducts]);

  return (
    <>
      <Navigation />
      <main className="bg-white text-gray-900 min-h-screen pt-24 pb-20 overflow-clip">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative py-16 px-4 bg-gradient-to-b from-[#F8FAFF] via-white to-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }} />
            <div className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: "linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }} />
          </div>

          <div className="container-xl relative z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-6">
              <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
              <span>&gt;</span>
              <span className="text-blue-600">Products</span>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[0.95] mb-6"
                >
                  Our Products <br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Built to Power Your Business
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl mb-8"
                >
                  Explore our suite of white-label SaaS products designed to simplify operations, enhance productivity, and accelerate growth.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-gray-100"
                >
                  {[
                    { title: "White-Label Ready", desc: "Use as your own brand", color: "#F59E0B", icon: Sparkles },
                    { title: "Secure & Scalable", desc: "Enterprise-grade security", color: "#2563EB", icon: ShieldCheck },
                    { title: "Easy to Customize", desc: "Flexible to your needs", color: "#10B981", icon: Settings },
                  ].map((feat) => (
                    <div key={feat.title} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 flex-shrink-0">
                        <feat.icon size={16} style={{ color: feat.color }} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{feat.title}</h4>
                        <p className="text-[10px] text-gray-400 leading-snug">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="lg:col-span-5 hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white"
                >
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-[10px] font-semibold text-gray-400">Dashboard Preview</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 flex gap-3 h-[250px]">
                    <div className="w-20 bg-white rounded-lg p-2 flex flex-col gap-1.5 shadow-sm">
                      <div className="w-full h-3 bg-blue-50 rounded" />
                      <div className="w-full h-3 bg-gray-100 rounded" />
                      <div className="w-full h-3 bg-gray-100 rounded" />
                      <div className="w-full h-3 bg-gray-100 rounded" />
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="grid grid-cols-3 gap-2">
                        {[["Revenue", "$250k"], ["Users", "1,420"], ["Active", "320"]].map(([label, val]) => (
                          <div key={label} className="bg-white p-2.5 rounded-lg shadow-sm">
                            <p className="text-[8px] text-gray-400">{label}</p>
                            <p className="text-xs font-black text-gray-900">{val}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-white rounded-lg p-3 flex-1 shadow-sm flex flex-col justify-end gap-1">
                        <div className="flex justify-between items-end gap-1">
                          {[30, 45, 60, 50, 70, 90, 80, 100].map((h, i) => (
                            <div key={i} className="flex-1 rounded-sm bg-blue-100" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-xl shadow-lg border border-gray-100 p-2.5 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-gray-600">Built for Growing Teams</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FILTER BAR + GRID ─────────────────────────────────── */}
        <section className="container-xl py-8 px-4">

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between pb-8 border-b border-gray-100 mb-8"
          >
            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === cat.id
                      ? "bg-[#FBBF24] text-gray-900 shadow-sm"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {cat.name}
                  {cat.id !== "all" && (
                    <span className={`ml-1.5 text-[9px] ${selectedCategory === cat.id ? "text-gray-700" : "text-gray-400"}`}>
                      {categoryCounts[cat.id] || 0}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72 flex-shrink-0">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-full text-xs bg-gray-50 border border-gray-100 outline-none focus:bg-white focus:border-blue-400 focus:shadow-[0_0_12px_rgba(37,99,235,0.06)] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-gray-400">
              Showing <span className="font-bold text-gray-700">{filteredProducts.length}</span> products
              {selectedCategory !== "all" && (
                <> in <span className="font-bold text-blue-600">{categories.find(c => c.id === selectedCategory)?.name}</span></>
              )}
            </p>
            {(selectedCategory !== "all" || searchQuery) && (
              <button
                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors"
              >
                <X size={10} /> Clear filters
              </button>
            )}
          </div>

          {/* Product grid */}
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 bg-gray-50 border border-dashed border-gray-200 rounded-3xl"
              >
                <HelpCircle size={40} className="mx-auto text-gray-300 mb-3" />
                <h3 className="text-base font-black text-gray-900 mb-1">No products found</h3>
                <p className="text-xs text-gray-400 mb-6">Try a different category or clear your search.</p>
                <button
                  onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={selectedCategory + searchQuery}
                variants={container}
                initial="hidden"
                animate="show"
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={item}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group relative bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-gray-100 transition-shadow duration-300 flex flex-col"
                  >
                    {product.isNew && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-[8px] font-black text-blue-600 uppercase tracking-wider">
                          New
                        </span>
                      </div>
                    )}

                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: product.bgColor }}
                    >
                      <product.icon size={20} style={{ color: product.color }} />
                    </div>

                    <span
                      className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3"
                      style={{ backgroundColor: product.accentColor, color: product.color }}
                    >
                      {product.categoryLabel}
                    </span>

                    <h3 className="text-base font-black text-gray-900 mb-2 leading-tight">{product.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-5 flex-grow">{product.desc}</p>

                    <ul className="space-y-1.5 mb-6">
                      {product.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-gray-600">
                          <Check size={11} style={{ color: product.color }} className="flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-2 pt-4 border-t border-gray-50 mt-auto">
                      <Link
                        href="/contact"
                        className="flex-1 text-center py-2.5 rounded-xl text-[10px] font-bold border border-gray-100 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        Learn More
                      </Link>
                      <Link
                        href="/contact?type=consultation"
                        className="flex-1 text-center py-2.5 rounded-xl text-[10px] font-bold text-white transition-all hover:opacity-90"
                        style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}cc)` }}
                      >
                        Request Demo
                      </Link>
                    </div>
                  </motion.div>
                ))}

                {/* Coming Soon card */}
                <motion.div
                  variants={item}
                  className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-3xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group min-h-[320px]"
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full" />
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                      <Zap size={18} className="text-white fill-white" />
                    </div>
                    <h3 className="text-base font-black mb-2">More Powerful Products Coming!</h3>
                    <p className="text-xs text-blue-100/80 leading-relaxed">
                      We&apos;re continuously building new solutions to help your business create more value.
                    </p>
                  </div>
                  <div className="relative z-10 pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:underline"
                    >
                      View Roadmap <ArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── TRUST STRIP ──────────────────────────────────────── */}
        <section className="bg-gray-50 border-y border-gray-100 py-12 px-4 mt-16">
          <div className="container-xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { title: "Enterprise Security", desc: "Role-based access, data encryption, and regular backups on every product.", icon: ShieldCheck },
                { title: "Cloud-Based", desc: "Access your products anytime, anywhere — hosted and monitored by our team.", icon: Cloud },
                { title: "Fully Customizable", desc: "White-label ready products that can be fully customized to your brand.", icon: Settings },
                { title: "Dedicated Support", desc: "Our expert support team is always here to help you succeed.", icon: PhoneCall },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <item.icon size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-white">
          <div className="container-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #FFF7ED 0%, #FFFBEB 100%)", border: "1px solid #FEF3C7" }}
            >
              <div className="relative z-10 max-w-2xl mx-auto">
                <p className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-3">Custom Software Development</p>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Have a Unique Requirement?</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  We build custom software solutions tailored to your business goals. Let&apos;s create something amazing together!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white text-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: "linear-gradient(135deg, #F59E0B, #EA580C)" }}
                  >
                    Talk to an Expert <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/contact?type=consultation"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-gray-700 text-xs bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Book a Free Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
