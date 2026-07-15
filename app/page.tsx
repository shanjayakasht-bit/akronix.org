import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import HomePage from "@/components/pages/home-page";
import { getHomepageSettings } from "@/lib/site-settings";

export default async function Page() {
  const settings = await getHomepageSettings();

  return (
    <>
      <Navigation />
      <main>
        <HomePage settings={settings} />
      </main>
      <Footer />
    </>
  );
}
