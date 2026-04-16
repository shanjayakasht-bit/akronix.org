import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import TestimonialsPage from "@/components/pages/testimonials-page";
import { db } from "@/lib/db";

export const metadata = {
  title: "Testimonials | Akronix",
  description: "See what our clients say about the premium web and software solutions built by Akronix.",
};

export default async function Page() {
  const testimonialsData = await db.testimonial.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <>
      <Navigation />
      <main>
        <TestimonialsPage testimonialsData={testimonialsData} />
      </main>
      <Footer />
    </>
  );
}
