import ContactPage from "@/components/pages/contact-page";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ContactForm from "@/components/ContactForm"; 

export default function Page() {
  return (
    <>
      <Navigation />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
