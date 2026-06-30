"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Users, 
  Layers, 
  MessageSquare, 
  ShieldCheck,
  CreditCard,
  Briefcase,
  Search,
  CheckCircle,
  ChevronRight,
  TrendingUp,
  Mail,
  Building2,
  Calendar,
  AlertCircle,
  Pencil,
  X,
  Star,
  Package,
  Trash2,
  Plus
} from "lucide-react";

// Types matching database schema
interface StatCard {
  label: string;
  value: string;
  icon: string;
  change: string;
  color: string;
}

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  website?: string | null;
  message: string;
  serviceType?: string | null;
  budget?: string | null;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "PROPOSAL" | "CONVERTED" | "LOST";
  createdAt: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_REVIEW" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "CANCELLED" | "ON_HOLD";
  progress: number;
  budget?: number | null;
  serviceType: string;
  client: {
    name?: string | null;
    email?: string | null;
  };
}

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  role: "SUPER_ADMIN" | "ADMIN" | "CLIENT" | "USER";
  company?: string | null;
  createdAt: string;
}

interface Testimonial {
  id: string;
  authorName: string;
  authorTitle: string;
  company: string;
  content: string;
  rating: number;
  isPublished: boolean;
  createdAt: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
  badge?: string | null;
  icon?: string | null;
  color?: string | null;
}

interface EditingProduct {
  id: string;
  title: string;
  description: string;
  features: string;
  badge?: string | null;
  icon?: string | null;
  color?: string | null;
}

export default function AdminDashboard() {
  const { status } = useSession();
  const router = useRouter();

  // Active Tab: overview, leads, projects, users, testimonials, products
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "projects" | "users" | "testimonials" | "products">("overview");

  // Dashboard state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<StatCard[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [adminUser, setAdminUser] = useState({ name: "Administrator", email: "system@akronix.org" });

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Edit Modals state
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [editingProduct, setEditingProduct] = useState<EditingProduct | null>(null);
  
  // Creation Modals state
  const [isCreatingTestimonial, setIsCreatingTestimonial] = useState(false);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    authorName: "",
    authorTitle: "",
    company: "",
    content: "",
    rating: 5,
    isPublished: true
  });
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    features: "",
    badge: "Coming Soon",
    icon: "Briefcase"
  });
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  // 1. Session verification & redirection
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // 2. Fetch dashboard data from custom api
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/dashboard");
      
      if (!res.ok) {
        throw new Error(res.status === 403 
          ? "Unauthorized access — administrator privilege required." 
          : "Failed to load system dashboard."
        );
      }

      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setLeads(data.leads);
        setProjects(data.projects);
        setUsers(data.users);
        setTestimonials(data.testimonials ?? []);
        setProducts(data.products ?? []);
        if (data.admin) {
          setAdminUser(data.admin);
        }
      } else {
        throw new Error(data.error ?? "Failed to query system telemetry.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected connection error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Lead edit handler
  const handleEditLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingLead) return;

    try {
      setIsSubmittingEdit(true);
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: editingLead.id,
          firstName: editingLead.firstName,
          lastName: editingLead.lastName,
          email: editingLead.email,
          phone: editingLead.phone,
          company: editingLead.company,
          message: editingLead.message,
          serviceType: editingLead.serviceType,
          budget: editingLead.budget,
          status: editingLead.status,
        })
      });

      if (!res.ok) throw new Error("Failed to save lead updates.");

      const result = await res.json();
      if (result.success) {
        setLeads(prev => prev.map(l => l.id === editingLead.id ? { ...l, ...editingLead } : l));
        setNotification({ message: "Lead updated successfully.", type: "success" });
        setTimeout(() => setNotification(null), 3000);
        setEditingLead(null);
      } else {
        throw new Error(result.error ?? "Failed to save update.");
      }
    } catch (err: unknown) {
      setNotification({ message: err instanceof Error ? err.message : "Update failed.", type: "error" });
      setTimeout(() => setNotification(null), 4000);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // Project edit handler
  const handleEditProjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      setIsSubmittingEdit(true);
      const res = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: editingProject.id,
          title: editingProject.title,
          description: editingProject.description,
          status: editingProject.status,
          progress: Number(editingProject.progress),
          budget: editingProject.budget ? Number(editingProject.budget) : null,
          serviceType: editingProject.serviceType,
          clientName: editingProject.client?.name,
          clientEmail: editingProject.client?.email,
        })
      });

      if (!res.ok) throw new Error("Failed to save project updates.");

      const result = await res.json();
      if (result.success) {
        setProjects(prev => prev.map(p => p.id === editingProject.id ? { ...p, ...editingProject } : p));
        setNotification({ message: "Project updated successfully.", type: "success" });
        setTimeout(() => setNotification(null), 3000);
        setEditingProject(null);
      } else {
        throw new Error(result.error ?? "Failed to save update.");
      }
    } catch (err: unknown) {
      setNotification({ message: err instanceof Error ? err.message : "Update failed.", type: "error" });
      setTimeout(() => setNotification(null), 4000);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // User edit handler
  const handleEditUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      setIsSubmittingEdit(true);
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: editingUser.id,
          name: editingUser.name,
          email: editingUser.email,
          role: editingUser.role,
          company: editingUser.company,
        })
      });

      if (!res.ok) throw new Error("Failed to save user updates.");

      const result = await res.json();
      if (result.success) {
        setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...editingUser } : u));
        setNotification({ message: "User updated successfully.", type: "success" });
        setTimeout(() => setNotification(null), 3000);
        setEditingUser(null);
      } else {
        throw new Error(result.error ?? "Failed to save update.");
      }
    } catch (err: unknown) {
      setNotification({ message: err instanceof Error ? err.message : "Update failed.", type: "error" });
      setTimeout(() => setNotification(null), 4000);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // Testimonial edit handler
  const handleEditTestimonialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    try {
      setIsSubmittingEdit(true);
      const res = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testimonialId: editingTestimonial.id,
          authorName: editingTestimonial.authorName,
          authorTitle: editingTestimonial.authorTitle,
          company: editingTestimonial.company,
          content: editingTestimonial.content,
          rating: Number(editingTestimonial.rating),
          isPublished: editingTestimonial.isPublished,
        })
      });

      if (!res.ok) throw new Error("Failed to save testimonial updates.");

      const result = await res.json();
      if (result.success) {
        setTestimonials(prev => prev.map(t => t.id === editingTestimonial.id ? { ...t, ...editingTestimonial } : t));
        setNotification({ message: "Testimonial updated successfully.", type: "success" });
        setTimeout(() => setNotification(null), 3000);
        setEditingTestimonial(null);
      } else {
        throw new Error(result.error ?? "Failed to save update.");
      }
    } catch (err: unknown) {
      setNotification({ message: err instanceof Error ? err.message : "Update failed.", type: "error" });
      setTimeout(() => setNotification(null), 4000);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // Product edit handler
  const handleEditProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      setIsSubmittingEdit(true);
      const featuresArray = typeof editingProduct.features === "string"
        ? (editingProduct.features as string).split("\n").map(f => f.trim()).filter(Boolean)
        : editingProduct.features;

      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: editingProduct.id,
          title: editingProduct.title,
          description: editingProduct.description,
          features: featuresArray,
          badge: editingProduct.badge,
        })
      });

      if (!res.ok) throw new Error("Failed to save product updates.");

      const result = await res.json();
      if (result.success) {
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...editingProduct, features: featuresArray } : p));
        setNotification({ message: "Product updated successfully.", type: "success" });
        setTimeout(() => setNotification(null), 3000);
        setEditingProduct(null);
      } else {
        throw new Error(result.error ?? "Failed to save update.");
      }
    } catch (err: unknown) {
      setNotification({ message: err instanceof Error ? err.message : "Update failed.", type: "error" });
      setTimeout(() => setNotification(null), 4000);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // Create Testimonial
  const handleCreateTestimonialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmittingEdit(true);
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTestimonial)
      });

      if (!res.ok) throw new Error("Failed to create testimonial.");

      const result = await res.json();
      if (result.success) {
        setTestimonials(prev => [result.testimonial, ...prev]);
        setNotification({ message: "Testimonial created successfully.", type: "success" });
        setTimeout(() => setNotification(null), 3000);
        setIsCreatingTestimonial(false);
        setNewTestimonial({
          authorName: "",
          authorTitle: "",
          company: "",
          content: "",
          rating: 5,
          isPublished: true
        });
      } else {
        throw new Error(result.error ?? "Failed to create testimonial.");
      }
    } catch (err: unknown) {
      setNotification({ message: err instanceof Error ? err.message : "Creation failed.", type: "error" });
      setTimeout(() => setNotification(null), 4000);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // Delete Testimonial
  const handleDeleteTestimonial = async (testimonialId: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`/api/admin/testimonials?testimonialId=${testimonialId}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete testimonial.");

      const result = await res.json();
      if (result.success) {
        setTestimonials(prev => prev.filter(t => t.id !== testimonialId));
        setNotification({ message: "Testimonial deleted successfully.", type: "success" });
        setTimeout(() => setNotification(null), 3000);
      } else {
        throw new Error(result.error ?? "Failed to delete.");
      }
    } catch (err: unknown) {
      setNotification({ message: err instanceof Error ? err.message : "Deletion failed.", type: "error" });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  // Create Product
  const handleCreateProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmittingEdit(true);
      const featuresArray = newProduct.features.split("\n").map(f => f.trim()).filter(Boolean);

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newProduct.title,
          description: newProduct.description,
          features: featuresArray,
          badge: newProduct.badge,
          icon: newProduct.icon,
        })
      });

      if (!res.ok) throw new Error("Failed to create product.");

      const result = await res.json();
      if (result.success) {
        setProducts(prev => [result.product, ...prev]);
        setNotification({ message: "Product created successfully.", type: "success" });
        setTimeout(() => setNotification(null), 3000);
        setIsCreatingProduct(false);
        setNewProduct({
          title: "",
          description: "",
          features: "",
          badge: "Coming Soon",
          icon: "Briefcase"
        });
      } else {
        throw new Error(result.error ?? "Failed to create product.");
      }
    } catch (err: unknown) {
      setNotification({ message: err instanceof Error ? err.message : "Creation failed.", type: "error" });
      setTimeout(() => setNotification(null), 4000);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/admin/products?productId=${productId}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete product.");

      const result = await res.json();
      if (result.success) {
        setProducts(prev => prev.filter(p => p.id !== productId));
        setNotification({ message: "Product deleted successfully.", type: "success" });
        setTimeout(() => setNotification(null), 3000);
      } else {
        throw new Error(result.error ?? "Failed to delete.");
      }
    } catch (err: unknown) {
      setNotification({ message: err instanceof Error ? err.message : "Deletion failed.", type: "error" });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  // 3. Update a lead's status in the database in real-time
  const handleUpdateLeadStatus = async (leadId: string, newStatus: Lead["status"]) => {
    try {
      setUpdatingLeadId(leadId);
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status: newStatus })
      });

      if (!res.ok) {
        throw new Error("Failed to write lead status update.");
      }

      const result = await res.json();
      if (result.success) {
        // Update local state instantly
        setLeads(prevLeads => 
          prevLeads.map(lead => 
            lead.id === leadId ? { ...lead, status: newStatus } : lead
          )
        );
        
        // Show glowing success toast
        setNotification({ message: `Lead updated to ${newStatus}`, type: "success" });
        setTimeout(() => setNotification(null), 3000);
      } else {
        throw new Error(result.error ?? "Failed to save update.");
      }
    } catch (err: unknown) {
      setNotification({ message: err instanceof Error ? err.message : "Update transaction failed.", type: "error" });
      setTimeout(() => setNotification(null), 4000);
    } finally {
      setUpdatingLeadId(null);
    }
  };

  // Icon selector mapping
  const renderStatIcon = (iconName: string, color: string) => {
    const className = `w-5 h-5 ${color}`;
    switch (iconName) {
      case "Users": return <Users className={className} />;
      case "Briefcase": return <Briefcase className={className} />;
      case "CreditCard": return <CreditCard className={className} />;
      case "MessageSquare": return <MessageSquare className={className} />;
      default: return <AlertCircle className={className} />;
    }
  };

  // Show clean loaders during boot-up or loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-400/25 border-t-cyan-400 animate-spin" />
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Synchronizing System Telemetry...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-red-950/20 border border-red-500/30 flex items-center justify-center text-red-400 mb-6">
          <AlertCircle size={28} />
        </div>
        <h2 className="text-2xl font-black mb-2 tracking-tight">Access Restricted</h2>
        <p className="text-white/40 max-w-sm mb-6 text-sm leading-relaxed">{error}</p>
        <button 
          onClick={() => router.push("/")}
          className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  // Filtered lists based on search queries
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredProjects = projects.filter(proj => 
    proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proj.client.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTestimonials = testimonials.filter(t => 
    t.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.company && t.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
    t.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProductsList = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020205] text-white p-6 md:p-12 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Glowing Notification Toast */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-up ${
          notification.type === "success" 
            ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-300 shadow-emerald-950/20" 
            : "bg-red-950/80 border-red-500/30 text-red-300 shadow-red-950/20"
        }`}>
          {notification.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          <span className="text-xs font-bold uppercase tracking-wider">{notification.message}</span>
        </div>
      )}

      <div className="max-w-[1500px] mx-auto relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/[0.04] pb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
              <ShieldCheck size={14} />
              <span>Akronix System Control</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight italic">
              Enterprise Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] p-3 rounded-2xl backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center font-bold text-cyan-400 uppercase">
              {adminUser.name?.[0] ?? "A"}
            </div>
            <div className="text-left pr-2">
              <p className="text-xs font-black uppercase tracking-wider text-white/90 leading-none mb-1">
                {adminUser.name}
              </p>
              <p className="text-[10px] text-white/40 leading-none">
                {adminUser.email}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-4 py-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-[9px] font-black uppercase tracking-wider text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 ml-2"
            >
              Log Out
            </button>
          </div>
        </header>

        {/* Tab Navigation Menu */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-white/[0.04] pb-4">
          {([
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "leads", label: "Lead Manager", icon: MessageSquare },
            { id: "projects", label: "Projects Pipeline", icon: Layers },
            { id: "users", label: "Users Directory", icon: Users },
            { id: "testimonials", label: "Testimonials", icon: Star },
            { id: "products", label: "Products", icon: Package },
          ] as const).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                  isActive 
                    ? "bg-cyan-500/10 border-cyan-400/40 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.1)]" 
                    : "bg-white/[0.01] border-white/[0.05] text-white/40 hover:text-white/70 hover:border-white/10"
                }`}
              >
                <tab.icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Filter Bar (Leads/Projects/Users tabs) */}
        {activeTab !== "overview" && (
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.01] border border-white/[0.06] rounded-full pl-11 pr-5 py-3 text-xs font-medium focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.02] text-white transition-all placeholder:text-white/20"
              />
            </div>

            {activeTab === "leads" && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-[10px] font-black uppercase text-white/30 tracking-widest shrink-0">Filter Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#0A0A14] border border-white/[0.06] rounded-full px-4 py-2.5 text-xs text-white/60 focus:outline-none focus:border-cyan-400/40 cursor-pointer"
                >
                  <option value="ALL">ALL LEADS</option>
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="QUALIFIED">QUALIFIED</option>
                  <option value="PROPOSAL">PROPOSAL</option>
                  <option value="CONVERTED">CONVERTED</option>
                  <option value="LOST">LOST</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB CONTENT: OVERVIEW ─────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="animate-fade-in space-y-10">
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="group relative p-6 rounded-3xl bg-white/[0.01] border border-white/[0.04] overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_20px_40px_rgba(0,0,0,0.5)] hover:border-white/10 transition-all duration-300"
                >
                  <div className="absolute -top-16 -left-16 w-36 h-36 bg-cyan-500/[0.01] rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                      {stat.label}
                    </span>
                    <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      {renderStatIcon(stat.icon, stat.color)}
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-black tracking-tight text-white/90">
                      {stat.value}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      stat.change.startsWith("+") 
                        ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-400" 
                        : "bg-amber-950/20 border-amber-500/20 text-amber-400"
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Layout Grid: Pipeline & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Development Pipeline Column */}
              <div className="lg:col-span-8 p-8 rounded-3xl bg-white/[0.01] border border-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/85">
                    Operational Pipeline
                  </h3>
                  <button 
                    onClick={() => setActiveTab("projects")}
                    className="text-[10px] font-black text-cyan-400 uppercase tracking-widest hover:underline flex items-center gap-1"
                  >
                    <span>View All Pipeline</span>
                    <ChevronRight size={12} />
                  </button>
                </div>

                <div className="space-y-4">
                  {projects.slice(0, 3).map((proj) => (
                    <div 
                      key={proj.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-[#0A0A14] border border-white/[0.04] hover:border-white/10 transition-all duration-300 gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                          <Layers size={18} />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-black text-white/95 uppercase tracking-tight leading-tight mb-1">
                            {proj.title}
                          </p>
                          <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono">
                            {proj.serviceType.replace("_", " ")} • Client: {proj.client.name ?? "Independent"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-white/[0.04] pt-3 sm:pt-0">
                        <div className="flex flex-col items-start sm:items-end">
                          <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider mb-1">Progress</span>
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden shrink-0">
                              <div 
                                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" 
                                style={{ width: `${proj.progress}%` }} 
                              />
                            </div>
                            <span className="text-[10px] font-black text-white/60 font-mono">{proj.progress}%</span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border shrink-0 ${
                          proj.status === "COMPLETED" 
                            ? "bg-emerald-950/20 border-emerald-500/25 text-emerald-400" 
                            : "bg-cyan-950/20 border-cyan-500/25 text-cyan-400"
                        }`}>
                          {proj.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity Column */}
              <div className="lg:col-span-4 p-8 rounded-3xl bg-white/[0.01] border border-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/85 mb-6 text-left">
                  Recent Inquiries
                </h3>
                <div className="space-y-5">
                  {leads.slice(0, 4).map((lead) => (
                    <div key={lead.id} className="flex gap-4 border-b border-white/[0.04] pb-4 last:border-0 last:pb-0">
                      <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0 text-xs font-black text-white/70 uppercase">
                        {lead.firstName[0]}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-xs leading-normal min-w-0">
                          <span className="font-black text-white/95">{lead.firstName} {lead.lastName}</span>
                          <span className="text-white/40"> submitted an inquiry for </span>
                          <span className="font-bold text-cyan-400 uppercase text-[10px] tracking-wide">
                            {lead.serviceType ? lead.serviceType.replace("_", " ") : "Akronix Services"}
                          </span>
                        </p>
                        <p className="text-[10px] text-white/20 mt-1 uppercase tracking-wider font-mono">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ─── TAB CONTENT: LEADS MANAGER ─────────────────────────────── */}
        {activeTab === "leads" && (
          <div className="animate-fade-in overflow-hidden rounded-3xl bg-white/[0.01] border border-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.04] bg-white/[0.01] text-left">
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Contact</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Inquiry Message</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Requirements</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em] text-center">Status Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors duration-300">
                        {/* Column 1: Contact Details */}
                        <td className="px-6 py-5 whitespace-nowrap text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center text-xs font-black text-cyan-400 uppercase">
                              {lead.firstName[0]}
                            </div>
                            <div>
                              <p className="text-xs font-black text-white leading-none mb-1">
                                {lead.firstName} {lead.lastName}
                              </p>
                              <p className="text-[10px] text-white/45 flex items-center gap-1 leading-none mb-1 font-mono">
                                <Mail size={10} className="text-white/30" />
                                <span>{lead.email}</span>
                              </p>
                              {lead.company && (
                                <p className="text-[9px] text-white/30 flex items-center gap-1 leading-none font-sans">
                                  <Building2 size={10} className="text-white/20" />
                                  <span>{lead.company}</span>
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Column 2: Inquiry message */}
                        <td className="px-6 py-5 max-w-sm text-left">
                          <p className="text-xs text-white/60 font-medium line-clamp-2 leading-relaxed">
                            &quot;{lead.message}&quot;
                          </p>
                        </td>

                        {/* Column 3: Tech Requirements */}
                        <td className="px-6 py-5 text-left whitespace-nowrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-white/[0.03] border border-white/10 text-white/50 uppercase tracking-wider block w-fit mb-1.5">
                            {lead.serviceType ? lead.serviceType.replace("_", " ") : "GENERAL INQUIRY"}
                          </span>
                          <span className="text-[10px] font-black text-cyan-400 font-mono block">
                            Budget: {lead.budget ?? "Undetermined"}
                          </span>
                        </td>

                        {/* Column 4: Status Modifier Dropdown */}
                        <td className="px-6 py-5 text-center whitespace-nowrap">
                          <div className="inline-flex items-center justify-center gap-3 relative">
                            {updatingLeadId === lead.id ? (
                              <div className="w-4 h-4 rounded-full border border-cyan-400/20 border-t-cyan-400 animate-spin" />
                            ) : (
                              <select
                                value={lead.status}
                                onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as Lead["status"])}
                                className={`text-[10px] font-bold uppercase tracking-wider border rounded-full px-3 py-1.5 cursor-pointer focus:outline-none transition-all duration-300 ${
                                  lead.status === "CONVERTED"
                                    ? "bg-emerald-950/20 border-emerald-500/25 text-emerald-400"
                                    : lead.status === "LOST"
                                    ? "bg-red-950/20 border-red-500/25 text-red-400"
                                    : lead.status === "NEW"
                                    ? "bg-cyan-950/20 border-cyan-500/25 text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                                    : "bg-white/[0.02] border-white/10 text-white/50"
                                }`}
                              >
                                <option className="bg-[#0C0C1F]" value="NEW">NEW</option>
                                <option className="bg-[#0C0C1F]" value="CONTACTED">CONTACTED</option>
                                <option className="bg-[#0C0C1F]" value="QUALIFIED">QUALIFIED</option>
                                <option className="bg-[#0C0C1F]" value="PROPOSAL">PROPOSAL</option>
                                <option className="bg-[#0C0C1F]" value="CONVERTED">CONVERTED</option>
                                <option className="bg-[#0C0C1F]" value="LOST">LOST</option>
                              </select>
                            )}
                            <button
                              onClick={() => setEditingLead(lead)}
                              className="p-1.5 rounded-lg bg-white/[0.02] border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                              title="Edit Lead Details"
                            >
                              <Pencil size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-white/30 text-xs font-mono uppercase tracking-[0.25em]">
                        No matching inquiries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── TAB CONTENT: PROJECTS PIPELINE ─────────────────────────── */}
        {activeTab === "projects" && (
          <div className="animate-fade-in overflow-hidden rounded-3xl bg-white/[0.01] border border-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.04] bg-white/[0.01] text-left">
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Project Spec</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Client Relationship</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">System Status</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Progress Specs</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em] text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-white/[0.01] transition-colors duration-300">
                        {/* Column 1: Project details */}
                        <td className="px-6 py-5 text-left">
                          <p className="text-xs font-black text-white/95 uppercase tracking-tight mb-1">{proj.title}</p>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                            {proj.serviceType.replace("_", " ")}
                          </p>
                        </td>

                        {/* Column 2: Client */}
                        <td className="px-6 py-5 text-left">
                          <p className="text-xs font-bold text-white/80 leading-none mb-1">{proj.client.name ?? "Independent Partner"}</p>
                          <p className="text-[10px] text-white/45 flex items-center gap-1 font-mono leading-none">
                            <Mail size={10} className="text-white/30" />
                            <span>{proj.client.email ?? "no-email@partner.co"}</span>
                          </p>
                        </td>

                        {/* Column 3: Status */}
                        <td className="px-6 py-5 text-left whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                            proj.status === "COMPLETED" 
                              ? "bg-emerald-950/20 border-emerald-500/25 text-emerald-400" 
                              : "bg-cyan-950/20 border-cyan-500/25 text-cyan-400"
                          }`}>
                            {proj.status.replace("_", " ")}
                          </span>
                        </td>

                        {/* Column 4: Progress details */}
                        <td className="px-6 py-5 text-left whitespace-nowrap">
                          <div className="flex items-center gap-3 w-40">
                            <div className="w-28 h-1.5 bg-white/10 rounded-full overflow-hidden shrink-0">
                              <div 
                                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" 
                                style={{ width: `${proj.progress}%` }} 
                              />
                            </div>
                            <span className="text-[10px] font-black text-white/60 font-mono">{proj.progress}%</span>
                          </div>
                        </td>

                        {/* Column 5: Actions */}
                        <td className="px-6 py-5 text-center whitespace-nowrap">
                          <button
                            onClick={() => setEditingProject(proj)}
                            className="p-1.5 rounded-lg bg-white/[0.02] border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                            title="Edit Project Details"
                          >
                            <Pencil size={12} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-white/30 text-xs font-mono uppercase tracking-[0.25em]">
                        No matching projects found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── TAB CONTENT: USERS DIRECTORY ───────────────────────────── */}
        {activeTab === "users" && (
          <div className="animate-fade-in overflow-hidden rounded-3xl bg-white/[0.01] border border-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.04] bg-white/[0.01] text-left">
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">User Profile</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Enterprise/Company</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Operational Role</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Registration Date</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em] text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-white/[0.01] transition-colors duration-300">
                        {/* Column 1: User */}
                        <td className="px-6 py-5 text-left">
                          <p className="text-xs font-black text-white leading-none mb-1">{user.name ?? "General User"}</p>
                          <p className="text-[10px] text-white/40 flex items-center gap-1 font-mono leading-none">
                            <Mail size={10} className="text-white/20" />
                            <span>{user.email ?? "no-email"}</span>
                          </p>
                        </td>

                        {/* Column 2: Company */}
                        <td className="px-6 py-5 text-left text-xs text-white/60 font-medium">
                          {user.company ?? "Independent Partner"}
                        </td>

                        {/* Column 3: Role */}
                        <td className="px-6 py-5 text-left whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                            user.role === "SUPER_ADMIN" || user.role === "ADMIN"
                              ? "bg-purple-950/20 border-purple-500/25 text-purple-400"
                              : user.role === "CLIENT"
                              ? "bg-cyan-950/20 border-cyan-500/25 text-cyan-400"
                              : "bg-white/[0.02] border-white/10 text-white/40"
                          }`}>
                            {user.role}
                          </span>
                        </td>

                        {/* Column 4: Registration date */}
                        <td className="px-6 py-5 text-left text-xs font-mono text-white/40 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} className="text-white/20" />
                            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                          </div>
                        </td>

                        {/* Column 5: Actions */}
                        <td className="px-6 py-5 text-center whitespace-nowrap">
                          <button
                            onClick={() => setEditingUser(user)}
                            className="p-1.5 rounded-lg bg-white/[0.02] border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                            title="Edit User Profile"
                          >
                            <Pencil size={12} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-white/30 text-xs font-mono uppercase tracking-[0.25em]">
                        No matching users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── TAB CONTENT: TESTIMONIALS ──────────────────────────────── */}
        {activeTab === "testimonials" && (
          <div className="animate-fade-in overflow-hidden rounded-3xl bg-white/[0.01] border border-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.04] bg-white/[0.01] text-left">
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Author Details</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Testimonial Content</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Rating</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Publish Status</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em] text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredTestimonials.length > 0 ? (
                    filteredTestimonials.map((t) => (
                      <tr key={t.id} className="hover:bg-white/[0.01] transition-colors duration-300">
                        {/* Column 1: Author */}
                        <td className="px-6 py-5 whitespace-nowrap text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center justify-center text-xs font-black text-purple-400 uppercase">
                              {t.authorName[0]}
                            </div>
                            <div>
                              <p className="text-xs font-black text-white leading-none mb-1">{t.authorName}</p>
                              <p className="text-[10px] text-white/40 leading-none mb-1">{t.authorTitle}</p>
                              <p className="text-[9px] text-cyan-400 font-mono leading-none">{t.company}</p>
                            </div>
                          </div>
                        </td>

                        {/* Column 2: Content */}
                        <td className="px-6 py-5 max-w-sm text-left">
                          <p className="text-xs text-white/60 font-medium line-clamp-2 leading-relaxed">
                            &quot;{t.content}&quot;
                          </p>
                        </td>

                        {/* Column 3: Rating */}
                        <td className="px-6 py-5 text-left whitespace-nowrap">
                          <div className="flex gap-0.5">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} size={11} className="fill-yellow-500 text-yellow-500" />
                            ))}
                          </div>
                        </td>

                        {/* Column 4: Publish Status */}
                        <td className="px-6 py-5 text-left whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                            t.isPublished
                              ? "bg-emerald-950/20 border-emerald-500/25 text-emerald-400"
                              : "bg-white/[0.02] border-white/10 text-white/30"
                          }`}>
                            {t.isPublished ? "PUBLISHED" : "DRAFT"}
                          </span>
                        </td>

                        {/* Column 5: Actions */}
                        <td className="px-6 py-5 text-center whitespace-nowrap">
                          <button
                            onClick={() => setEditingTestimonial(t)}
                            className="p-1.5 rounded-lg bg-white/[0.02] border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                            title="Edit Testimonial"
                          >
                            <Pencil size={12} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-white/30 text-xs font-mono uppercase tracking-[0.25em]">
                        No matching testimonials found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── TAB CONTENT: PRODUCTS ─────────────────────────────────── */}
        {activeTab === "products" && (
          <div className="animate-fade-in overflow-hidden rounded-3xl bg-white/[0.01] border border-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.04] bg-white/[0.01] text-left">
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Product Title</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Description</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Key Features</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em]">Badge</th>
                    <th className="px-6 py-4 text-[9px] font-black text-white/35 uppercase tracking-[0.2em] text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredProductsList.length > 0 ? (
                    filteredProductsList.map((p) => (
                      <tr key={p.id} className="hover:bg-white/[0.01] transition-colors duration-300">
                        {/* Column 1: Title */}
                        <td className="px-6 py-5 whitespace-nowrap text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex items-center justify-center text-xs font-black text-indigo-400 uppercase">
                              {p.title[0]}
                            </div>
                            <span className="text-xs font-black text-white">{p.title}</span>
                          </div>
                        </td>

                        {/* Column 2: Description */}
                        <td className="px-6 py-5 max-w-xs text-left">
                          <p className="text-xs text-white/60 font-medium line-clamp-2 leading-relaxed">
                            {p.description}
                          </p>
                        </td>

                        {/* Column 3: Features */}
                        <td className="px-6 py-5 text-left max-w-xs">
                          <div className="flex flex-wrap gap-1">
                            {p.features.slice(0, 3).map((f: string, idx: number) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[9px] text-white/40 uppercase">
                                {f}
                              </span>
                            ))}
                            {p.features.length > 3 && (
                              <span className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[9px] text-white/30">
                                +{p.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Column 4: Badge */}
                        <td className="px-6 py-5 text-left whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[9px] font-black uppercase tracking-widest text-purple-400">
                            {p.badge ?? "Coming Soon"}
                          </span>
                        </td>

                        {/* Column 5: Actions */}
                        <td className="px-6 py-5 text-center whitespace-nowrap">
                          <button
                            onClick={() => setEditingProduct({ ...p, features: p.features.join("\n") })}
                            className="p-1.5 rounded-lg bg-white/[0.02] border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                            title="Edit Product"
                          >
                            <Pencil size={12} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-white/30 text-xs font-mono uppercase tracking-[0.25em]">
                        No matching products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ─── MODAL: EDIT LEAD ───────────────────────────────────────── */}
      {editingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg p-8 rounded-3xl bg-[#090911]/90 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.05)] overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-cyan-500/[0.03] rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black uppercase tracking-[0.25em] text-cyan-400">Edit Lead Details</h3>
              <button 
                onClick={() => setEditingLead(null)}
                className="p-1.5 rounded-full bg-white/[0.02] border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleEditLeadSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">First Name</label>
                  <input
                    type="text"
                    value={editingLead.firstName}
                    onChange={e => setEditingLead({ ...editingLead, firstName: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Last Name</label>
                  <input
                    type="text"
                    value={editingLead.lastName}
                    onChange={e => setEditingLead({ ...editingLead, lastName: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={editingLead.email}
                  onChange={e => setEditingLead({ ...editingLead, email: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Company</label>
                  <input
                    type="text"
                    value={editingLead.company ?? ""}
                    onChange={e => setEditingLead({ ...editingLead, company: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Budget</label>
                  <input
                    type="text"
                    value={editingLead.budget ?? ""}
                    onChange={e => setEditingLead({ ...editingLead, budget: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Inquiry Message</label>
                <textarea
                  value={editingLead.message}
                  onChange={e => setEditingLead({ ...editingLead, message: e.target.value })}
                  rows={3}
                  className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.05]">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/[0.02] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingEdit}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-cyan-400 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {isSubmittingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: EDIT PROJECT ────────────────────────────────────── */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg p-8 rounded-3xl bg-[#090911]/90 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.05)] overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-500/[0.03] rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black uppercase tracking-[0.25em] text-purple-400">Edit Project Spec</h3>
              <button 
                onClick={() => setEditingProject(null)}
                className="p-1.5 rounded-full bg-white/[0.02] border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleEditProjectSubmit} className="space-y-4">
              <div>
                <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Project Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Client Name</label>
                  <input
                    type="text"
                    value={editingProject.client.name ?? ""}
                    onChange={e => setEditingProject({ 
                      ...editingProject, 
                      client: { ...editingProject.client, name: e.target.value } 
                    })}
                    className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Client Email</label>
                  <input
                    type="email"
                    value={editingProject.client.email ?? ""}
                    onChange={e => setEditingProject({ 
                      ...editingProject, 
                      client: { ...editingProject.client, email: e.target.value } 
                    })}
                    className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">System Status</label>
                  <select
                    value={editingProject.status}
                    onChange={e => setEditingProject({ ...editingProject, status: e.target.value as Project["status"] })}
                    className="w-full bg-[#0C0C1F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/40 cursor-pointer"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="IN_REVIEW">IN REVIEW</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="REVIEW">REVIEW</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="ON_HOLD">ON HOLD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Progress ({editingProject.progress}%)</label>
                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editingProject.progress}
                      onChange={e => setEditingProject({ ...editingProject, progress: Number(e.target.value) })}
                      className="w-full accent-cyan-400 bg-white/10 h-1 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Project Description</label>
                <textarea
                  value={editingProject.description}
                  onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                  rows={2}
                  className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.05]">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/[0.02] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingEdit}
                  className="px-5 py-2.5 rounded-xl bg-purple-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-purple-400 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {isSubmittingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: EDIT USER ───────────────────────────────────────── */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg p-8 rounded-3xl bg-[#090911]/90 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.05)] overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/[0.03] rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black uppercase tracking-[0.25em] text-emerald-400">Edit User Profile</h3>
              <button 
                onClick={() => setEditingUser(null)}
                className="p-1.5 rounded-full bg-white/[0.02] border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleEditUserSubmit} className="space-y-4">
              <div>
                <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">User Full Name</label>
                <input
                  type="text"
                  value={editingUser.name ?? ""}
                  onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={editingUser.email ?? ""}
                  onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Enterprise / Company</label>
                  <input
                    type="text"
                    value={editingUser.company ?? ""}
                    onChange={e => setEditingUser({ ...editingUser, company: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Operational Role</label>
                  <select
                    value={editingUser.role}
                    onChange={e => setEditingUser({ ...editingUser, role: e.target.value as User["role"] })}
                    className="w-full bg-[#0C0C1F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/40 cursor-pointer"
                  >
                    <option value="SUPER_ADMIN">SUPER ADMIN</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="CLIENT">CLIENT</option>
                    <option value="USER">USER</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.05]">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/[0.02] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingEdit}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-emerald-400 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {isSubmittingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: EDIT TESTIMONIAL ────────────────────────────────── */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg p-8 rounded-3xl bg-[#090911]/90 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.05)] overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-500/[0.03] rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black uppercase tracking-[0.25em] text-purple-400">Edit Testimonial Details</h3>
              <button 
                onClick={() => setEditingTestimonial(null)}
                className="p-1.5 rounded-full bg-white/[0.02] border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleEditTestimonialSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Author Name</label>
                  <input
                    type="text"
                    value={editingTestimonial.authorName}
                    onChange={e => setEditingTestimonial({ ...editingTestimonial, authorName: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Author Title</label>
                  <input
                    type="text"
                    value={editingTestimonial.authorTitle}
                    onChange={e => setEditingTestimonial({ ...editingTestimonial, authorTitle: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Company</label>
                  <input
                    type="text"
                    value={editingTestimonial.company}
                    onChange={e => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Rating (1-5 Stars)</label>
                  <select
                    value={editingTestimonial.rating}
                    onChange={e => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                    className="w-full bg-[#0C0C1F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/40 cursor-pointer"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Publish Status</label>
                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    checked={editingTestimonial.isPublished}
                    onChange={e => setEditingTestimonial({ ...editingTestimonial, isPublished: e.target.checked })}
                    className="h-4 w-4 bg-white/5 border border-white/10 rounded text-cyan-500 focus:ring-cyan-500/50"
                  />
                  <span className="text-xs text-white/60">Visible on Public Website</span>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Feedback / Content</label>
                <textarea
                  value={editingTestimonial.content}
                  onChange={e => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })}
                  rows={4}
                  className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.05]">
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/[0.02] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingEdit}
                  className="px-5 py-2.5 rounded-xl bg-purple-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-purple-400 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {isSubmittingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: EDIT PRODUCT ────────────────────────────────────── */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg p-8 rounded-3xl bg-[#090911]/90 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.05)] overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/[0.03] rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black uppercase tracking-[0.25em] text-indigo-400">Edit Product Ecosystem</h3>
              <button 
                onClick={() => setEditingProduct(null)}
                className="p-1.5 rounded-full bg-white/[0.02] border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleEditProductSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Product Title</label>
                  <input
                    type="text"
                    value={editingProduct.title}
                    onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Status Badge</label>
                  <input
                    type="text"
                    value={editingProduct.badge ?? ""}
                    onChange={e => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Product Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3}
                  className="w-full bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase text-white/30 tracking-widest mb-1.5">Features List (One per line)</label>
                <textarea
                  value={editingProduct.features}
                  onChange={e => setEditingProduct({ ...editingProduct, features: e.target.value })}
                  rows={4}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  className="w-full bg-white/[0.02] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.04] px-4 py-3 rounded-xl resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.05]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/[0.02] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingEdit}
                  className="px-5 py-2.5 rounded-xl bg-indigo-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-indigo-400 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {isSubmittingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
