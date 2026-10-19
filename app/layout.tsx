import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#060A14" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://uniqueiis.com"),
  title: "UNIQUE INSPECTION INTEGRATED SERVICES (Uniqueiis) | A Safer, Stronger Tomorrow",
  description: "Independent Third-Party Inspection, verification, vendor audit, expediting, and NDT engineering services. Inspect • Assure • Deliver • Add Value.",
  keywords: [
    "Unique Inspection Integrated Services",
    "Uniqueiis",
    "Vendor Inspection Department",
    "Vendor Expediting Department",
    "Project Inspection Department",
    "Vendor Survey & Audit",
    "Pipeline & Engineering Services",
    "NDT Solutions",
    "Third Party Inspection",
    "TPI Saudi Arabia",
    "Al-Khobar",
    "ASNT Level III",
    "uniqueiis.com"
  ],
  authors: [{ name: "UNIQUE INSPECTION INTEGRATED SERVICES" }],
  creator: "UNIQUE INSPECTION INTEGRATED SERVICES",
  publisher: "UNIQUE INSPECTION INTEGRATED SERVICES",
  openGraph: {
    title: "UNIQUE INSPECTION INTEGRATED SERVICES | Inspect • Assure • Deliver • Add Value",
    description: "Independent Third-Party Inspection, verification, vendor audit, expediting, and NDT engineering services. A Safer, Stronger Tomorrow.",
    url: "https://uniqueiis.com",
    siteName: "UNIQUE INSPECTION INTEGRATED SERVICES (Uniqueiis)",
    images: [
      {
        url: "/images/uiis/logo_official_complete.png",
        width: 1200,
        height: 630,
        alt: "Uniqueiis - Unique Inspection Integrated Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UNIQUE INSPECTION INTEGRATED SERVICES (Uniqueiis)",
    description: "A Safer, Stronger Tomorrow. Inspect • Assure • Deliver • Add Value.",
    images: ["/images/uiis/logo_official_complete.png"],
  },
  icons: {
    icon: "/images/uiis-logo-transparent.png",
    apple: "/images/uiis-logo-transparent.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://uniqueiis.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
