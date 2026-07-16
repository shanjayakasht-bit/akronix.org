import { PrismaClient, UserRole, ServiceType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hash } from "bcryptjs";
import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Create Super Admin
  const adminPassword = await hash("admin123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@akronix.io" },
    update: {},
    create: {
      email: "admin@akronix.io",
      name: "Akronix Admin",
      hashedPassword: adminPassword,
      role: UserRole.SUPER_ADMIN,
      isActive: true,
    },
  });
  console.log(`✅ Created admin: ${admin.email}`);

  // 2. Create Services
  const services = [
    {
      name: "SaaS Development",
      slug: "saas-development",
      type: ServiceType.SAAS_DEVELOPMENT,
      description: "End-to-end SaaS development from architecture to deployment.",
      shortDesc: "Scalable SaaS solutions.",
      features: ["Multi-tenancy", "Subscription Management", "Cloud Native"],
    },
    {
      name: "MVP Development",
      slug: "mvp-development",
      type: ServiceType.MVP_DEVELOPMENT,
      description: "Rapidly build and launch your minimum viable product.",
      shortDesc: "Launch fast, scale later.",
      features: ["Fast Turnaround", "Core Features Only", "User Feedback Ready"],
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }
  console.log("✅ Created services");

  // 3. Create Pricing Plans
  const plans = [
    {
      name: "Starter",
      slug: "starter",
      description: "Best for early stage startups",
      price: 499,
      features: ["1 Project", "Basic Support", "Standard Hosting"],
    },
    {
      name: "Professional",
      slug: "professional",
      description: "Full-scale product development",
      price: 1999,
      isPopular: true,
      features: ["3 Projects", "Priority Support", "Premium Hosting", "Custom Domain"],
    },
  ];

  for (const plan of plans) {
    await prisma.pricingPlan.upsert({
      where: { slug: plan.slug },
      update: {},
      create: plan,
    });
  }
  console.log("✅ Created pricing plans");

  console.log("🚀 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
