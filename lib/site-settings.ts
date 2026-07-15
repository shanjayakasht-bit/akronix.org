import { db } from "./db";

export const DEFAULT_HOMEPAGE: Record<string, string> = {
  "homepage.hero.badge": "Empowering Startups, Businesses & Institutions",
  "homepage.hero.description":
    "Akronix is your complete business growth ecosystem. We deliver software solutions, digital marketing, business networking, mentorship and innovation — under one roof.",
  "homepage.hero.cta1.text": "Get Started",
  "homepage.hero.cta1.href": "/contact?type=project",
  "homepage.hero.cta2.text": "Explore Products",
  "homepage.hero.cta2.href": "/services",
  "homepage.stats": JSON.stringify([
    { value: "500+", label: "Businesses Empowered" },
    { value: "15+", label: "Valuable Partnerships" },
    { value: "98%", label: "Client Retention" },
    { value: "60%", label: "Avg. Efficiency Gain" },
  ]),
  "homepage.partners": JSON.stringify([
    "ZOHO", "Microsoft", "AWS", "HubSpot", "Google", "BNI", "Meta", "GitHub", "Hostinger",
  ]),
  "homepage.cta.headline": "Ready to Build the Future of Your Business?",
  "homepage.cta.description":
    "Let's build software that matters, expand your network and unlock new opportunities — together.",
  "homepage.testimonials.label": "4.9/5 from 100+ reviews",
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
