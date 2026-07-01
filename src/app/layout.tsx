import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aurum Residences | Premium Apartments",
    template: "%s | Aurum Residences",
  },
  description:
    "Explore Aurum Residences floor by floor — an interactive facade view with real floor plans, gallery, and availability for every apartment layout.",
  openGraph: {
    title: "Aurum Residences | Premium Apartments",
    description:
      "Explore Aurum Residences floor by floor — an interactive facade view with real floor plans, gallery, and availability for every apartment layout.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
