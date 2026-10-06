import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Lexend, Red_Hat_Display } from "next/font/google";
import { siteContent } from "@/content/site";
import { SiteFooter } from "@/components/layout/footer/SiteFooter";
import { SiteHeader } from "@/components/layout/header/SiteHeader";
import { MAIN_CONTENT_ID, SkipLink } from "@/components/layout/SkipLink";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.url),
  title: {
    default: siteContent.name,
    template: `%s | ${siteContent.name}`,
  },
  description: siteContent.home.description,
  openGraph: {
    type: "website",
    siteName: siteContent.name,
    title: siteContent.name,
    description: siteContent.home.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${redHatDisplay.variable} ${lexend.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <SiteHeader />
        <main
          id={MAIN_CONTENT_ID}
          tabIndex={-1}
          className="flex-1 outline-none"
        >
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
