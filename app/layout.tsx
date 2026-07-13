import type { Metadata } from "next";
import "./globals.css";
import GradientBG from "./components/GradientBG";
import TransitionLayout from "./components/gsap/TransitionLayout";

export const metadata: Metadata = {
  title: "Element Damage Calculator",
  description: "Interactive damage table with global modifiers",
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
