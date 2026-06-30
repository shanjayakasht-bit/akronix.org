import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const mockProducts = [
  { id: "mock-p1", title: "Akronix CRM", description: "AI-first CRM for modern sales teams. Pipeline management, deal intelligence, and automated follow-ups that close more deals.", features: ["AI lead scoring & prioritization", "Pipeline automation", "WhatsApp & email integration", "Revenue forecasting", "Mobile-first design"], badge: "Coming Soon", icon: "Briefcase", color: "#9D5BFF" },
  { id: "mock-p2", title: "Akronix HRMS", description: "Complete HR management — payroll, attendance, leaves, appraisals, and compliance automation for growing teams.", features: ["Payroll automation & tax compliance", "Biometric attendance tracking", "Performance review cycles", "Leave management", "Compliance reports"], badge: "Coming Soon", icon: "Users", color: "#9D5BFF" },
  { id: "mock-p3", title: "Akronix AI Assistant", description: "Your business's AI brain — trained on your data to answer queries, automate tasks, and surface actionable insights instantly.", features: ["Custom knowledge base training", "Multi-channel (web, WhatsApp, Slack)", "API integrations with your stack", "Real-time analytics dashboard", "Escalation workflows"], badge: "Coming Soon", icon: "Bot", color: "#9D5BFF" },
  { id: "mock-p4", title: "Akronix Analytics", description: "Unified business intelligence connecting all your data sources into one powerful real-time dashboard with AI anomaly detection.", features: ["Real-time dashboards", "50+ data source connectors", "AI anomaly detection", "Custom report builder", "Alerts and forecasting"], badge: "Coming Soon", icon: "BarChart3", color: "#9D5BFF" },
  { id: "mock-p5", title: "Akronix Booking Engine", description: "White-label travel and appointment booking with AI pricing, real-time inventory sync, and payment orchestration.", features: ["White-label for any business", "AI dynamic pricing engine", "Multi-gateway payment support", "Real-time inventory sync", "B2B and B2C portals"], badge: "Coming Soon", icon: "Plane", color: "#9D5BFF" }
];

export async function GET() {
  try {
    let dbProducts: unknown[] = [];
    try {
      dbProducts = await db.product.findMany({
        orderBy: { createdAt: "desc" }
      });
    } catch {
      console.warn("PostgreSQL server offline, serving mock products.");
    }

    const products = dbProducts.length > 0 ? dbProducts : mockProducts;
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("[GET /api/products] System failure:", error);
    return NextResponse.json(
      { error: "Failed to retrieve products." },
      { status: 500 }
    );
  }
}
