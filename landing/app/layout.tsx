import type { Metadata } from "next";

import Header from "@/components/Navigation/Header";
import Footer from "@/components/Navigation/Footer";

import { inter, gotham } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpotifEye",
  description: "Control Spotify Song Reproduction with your Eye Gaze",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " " +
          gotham.className +
          " bg-dark-gray font-inter grid grid-cols-12 gap-4"
        }
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
