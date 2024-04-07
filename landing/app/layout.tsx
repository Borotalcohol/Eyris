"use client";

import Header from "@/components/Navigation/Header";
import Footer from "@/components/Navigation/Footer";

import Script from "next/script";

import { inter, gotham } from "./fonts";

import "./globals.css";

declare global {
  interface Window {
    PayPal: Record<string, any>;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <Script
        src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"
        strategy="lazyOnload"
        onLoad={(e) => {
          if (window.PayPal && window.PayPal.Donation) {
            window.PayPal.Donation.Button({
              env: "production",
              hosted_button_id: "S7Y2QBUEZKZWW",
              image: {
                src: "https://www.paypalobjects.com/en_US/IT/i/btn/btn_donateCC_LG.gif",
                alt: "Donate with PayPal button",
                title: "PayPal - The safer, easier way to pay online!",
              },
            }).render("#donate-button");
          }
        }}
      />
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
