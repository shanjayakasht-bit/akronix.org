import ContactPage from "@/components/pages/contact-page";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ContactForm from "@/components/ContactForm"; 

import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Navigation />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <ContactPage />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
