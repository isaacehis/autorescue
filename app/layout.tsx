import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Analytics from "./components/Analytics";
import Footer from "./components/Footer";
import LocalBusinessSchema from "./components/LocalBusinessSchema";
import Navbar from "./components/Navbar";
import StickyMobileCTA from "./components/StickyMobileCTA";
import "./globals.css";
import SiteFrame from "./components/SiteFrame";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const socialImage = "https://images.pexels.com/photos/8985860/pexels-photo-8985860.jpeg?auto=compress&cs=tinysrgb&w=1400";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AutoRescue | Roadside Assistance On Demand",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "roadside assistance",
    "mechanic booking",
    "car breakdown",
    "towing service",
    "battery jumpstart",
    "auto repair Nigeria",
    "roadside help",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AutoRescue | Roadside Assistance On Demand",
    description: SITE_DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: socialImage,
        width: 1400,
        height: 933,
        alt: "Mechanic repairing a vehicle in a workshop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoRescue | Roadside Assistance On Demand",
    description: SITE_DESCRIPTION,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full bg-black text-white">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <LocalBusinessSchema />
        <SiteFrame navigation={<Navbar />} footer={<Footer />} sticky={<StickyMobileCTA />}>{children}</SiteFrame>
        <Analytics />
      </body>
    </html>
  );
}
