import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import TestimonialsPage from "@/components/pages/testimonials-page";

export const metadata = {
  title: "Testimonials | Akronix",
  description: "See what our clients say about the premium web and software solutions built by Akronix.",
};

export default function Page() {
  return (
    <>
      <Navigation />
      <main>
        <TestimonialsPage />
      </main>
      <Footer />
    </>
  );
}
