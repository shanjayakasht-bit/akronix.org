import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import TestimonialsPage from "@/components/pages/testimonials-page";
import { db } from "@/lib/db";
import { getSetting } from "@/lib/site-settings";

export const metadata = {
  title: "Testimonials | Akronix",
  description: "See what our clients say about the premium web and software solutions built by Akronix.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  let testimonialsData: { id: string; content: string; authorName: string; authorTitle: string; rating: number; company: string }[] = [];
  try {
    testimonialsData = await db.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB unavailable — fall back to static testimonials in the component
  }

  let successStories: { category: string; title: string; highlight: string; highlightLabel: string; desc: string; color: string; bg: string }[] = [];
  try {
    successStories = JSON.parse(await getSetting("homepage.success_stories"));
  } catch {
    // fall back to static stories in the component
  }

  return (
    <>
      <Navigation />
      <main>
        <TestimonialsPage testimonialsData={testimonialsData} successStories={successStories} />
      </main>
      <Footer />
    </>
  );
}
