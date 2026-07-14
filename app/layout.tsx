import type { Metadata } from "next";
import "./globals.css";
import GradientBG from "./components/GradientBG";
import TransitionLayout from "./components/gsap/TransitionLayout";

const metadataBaseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl,
  title: "Element Damage Calculator",
  description: "Interactive damage table with global modifiers",
  openGraph: {
    title: "Element Damage Calculator",
    description: "Interactive damage table with global modifiers",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Element Damage Calculator",
    description: "Interactive damage table with global modifiers",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <GradientBG />
        <TransitionLayout>{children}</TransitionLayout>
      </body>
    </html>
  );
}
