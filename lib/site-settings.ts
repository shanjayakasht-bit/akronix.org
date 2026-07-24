import { db } from "./db";

export const DEFAULT_HOMEPAGE: Record<string, string> = {
  "homepage.hero.badge": "Software, Marketing & Networking for Growing Businesses",
  "homepage.hero.description":
    "We help startups and growing companies build reliable software, run practical marketing, and connect with the right people — software development, digital marketing, business networking and mentorship, from one team.",
  "homepage.hero.cta1.text": "Get Started",
  "homepage.hero.cta1.href": "/contact?type=project",
  "homepage.hero.cta2.text": "Explore Products",
  "homepage.hero.cta2.href": "/products",
  "homepage.partners": JSON.stringify([
    "ZOHO", "Microsoft", "AWS", "HubSpot", "Google", "BNI", "Meta", "GitHub", "Hostinger",
  ]),
  "homepage.cta.headline": "Ready to Talk About Your Project?",
  "homepage.cta.description":
    "Tell us what you're building or trying to fix — we'll tell you honestly whether and how we can help.",
  "homepage.products": JSON.stringify([
    { name: "Akronix CRM", desc: "Manage leads and customers", tag: "CRM", icon: "Users" },
    { name: "Akronix HRMS", desc: "Simplify HR and employee management", tag: "HRMS", icon: "Building2" },
    { name: "Akronix ERP", desc: "Complete ERP solution for your business", tag: "ERP", icon: "Package" },
    { name: "Akronix Inventory", desc: "Track inventory & stock needs", tag: "INV", icon: "Cpu" },
    { name: "Akronix POS", desc: "Point-of-sale for retail businesses", tag: "POS", icon: "ShieldCheck" },
    { name: "Akronix AI", desc: "A remote assistant with AI Intelligence", tag: "AI", icon: "Zap" },
  ]),
};

export async function getSetting(key: string): Promise<string> {
  try {
    const setting = await db.siteSettings.findUnique({ where: { key } });
    return setting?.value ?? DEFAULT_HOMEPAGE[key] ?? "";
  } catch {
    return DEFAULT_HOMEPAGE[key] ?? "";
  }
}

export async function getHomepageSettings(): Promise<Record<string, string>> {
  try {
    const settings = await db.siteSettings.findMany({
      where: { key: { startsWith: "homepage." } },
    });
    const result: Record<string, string> = { ...DEFAULT_HOMEPAGE };
    for (const s of settings) {
      result[s.key] = s.value;
    }
    return result;
  } catch {
    return { ...DEFAULT_HOMEPAGE };
  }
}

export async function setSetting(key: string, value: string): Promise<void> {
  await db.siteSettings.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function setSettings(settings: Record<string, string>): Promise<void> {
  await Promise.all(Object.entries(settings).map(([k, v]) => setSetting(k, v)));
}

export async function getAllSettings(): Promise<Array<{ key: string; value: string; updatedAt: Date }>> {
  try {
    return await db.siteSettings.findMany({ orderBy: { key: "asc" } });
  } catch {
    return [];
  }
}

export type PublishedTestimonial = {
  id: string;
  authorName: string;
  authorTitle: string;
  company: string;
  content: string;
  rating: number;
  isFeatured: boolean;
};

export async function getPublishedTestimonials(): Promise<PublishedTestimonial[]> {
  try {
    return await db.testimonial.findMany({
      where: { isPublished: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        authorName: true,
        authorTitle: true,
        company: true,
        content: true,
        rating: true,
        isFeatured: true,
      },
    });
  } catch {
    return [];
  }
}
