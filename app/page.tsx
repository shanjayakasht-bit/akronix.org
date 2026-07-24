import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import HomePage from "@/components/pages/home-page";
import { getHomepageSettings, getPublishedTestimonials } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [settings, dbTestimonials] = await Promise.all([
    getHomepageSettings(),
    getPublishedTestimonials(),
  ]);

  return (
    <>
      <Navigation />
      <main>
        <HomePage settings={settings} dbTestimonials={dbTestimonials} />
      </main>
      <Footer />
    </>
  );
}
