import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import LoadingScreen from "@/components/ui/loading-screen";

export const metadata: Metadata = {
  title: {
    default: "Akronix — Build & Scale Your Digital Product",
    template: "%s | Akronix",
  },
  description:
    "Akronix helps SMEs and startups build, launch, and scale premium digital products — from SaaS platforms to MVPs and high-converting landing pages.",
  keywords: [
    "SaaS development",
    "MVP development",
    "startup tech",
    "landing page development",
    "digital products",
    "Akronix",
  ],
  authors: [{ name: "Akronix", url: "https://akronix.io" }],
  creator: "Akronix",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akronix.io",
    siteName: "Akronix",
    title: "Akronix — Build & Scale Your Digital Product",
    description:
      "Akronix helps SMEs and startups build, launch, and scale premium digital products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akronix — Build & Scale Your Digital Product",
    description:
      "Akronix helps SMEs and startups build, launch, and scale premium digital products.",
    creator: "@akronix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head />
      <body className="antialiased">
        <LoadingScreen />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
