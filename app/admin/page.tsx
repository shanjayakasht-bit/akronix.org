import { db } from "@/lib/db";
import AdminDashboardClient from "@/components/admin/dashboard-client";

async function getDashboardData() {
  try {
    const [leadCount, newLeadCount, subscriberCount, testimonialCount, userCount, recentLeads] = await Promise.all([
      db.lead.count(),
      db.lead.count({ where: { status: "NEW" } }),
      db.newsletter.count({ where: { isActive: true } }),
      db.testimonial.count({ where: { isPublished: true } }),
      db.user.count({ where: { isActive: true } }),
      db.lead.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
        select: {
          id: true, firstName: true, lastName: true,
          email: true, serviceType: true, status: true, createdAt: true,
        },
      }),
    ]);
    return { leadCount, newLeadCount, subscriberCount, testimonialCount, userCount, recentLeads };
  } catch {
    return { leadCount: 0, newLeadCount: 0, subscriberCount: 0, testimonialCount: 0, userCount: 0, recentLeads: [] };
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardData();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  return (
    <AdminDashboardClient
      today={today}
      leadCount={data.leadCount}
      newLeadCount={data.newLeadCount}
      subscriberCount={data.subscriberCount}
      testimonialCount={data.testimonialCount}
      userCount={data.userCount}
      recentLeads={data.recentLeads}
    />
  );
}
