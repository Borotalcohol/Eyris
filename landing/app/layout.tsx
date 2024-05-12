import { Suspense } from "react";

import Header from "@/components/Navigation/Header";
import Footer from "@/components/Navigation/Footer";

import { inter, gotham } from "./fonts";
import { Metadata } from "next";
import { ReCaptchaProvider } from "next-recaptcha-v3";

import GoogleAnalytics from "@/components/google-analytics";
import PayPalDonate from "@/utils/PayPalDonate";

import "./globals.css";
import { DialogProvider } from "@/utils/DialogContext";
import HeroDialog from "@/components/Dialog";

declare global {
  interface Window {
    PayPal: Record<string, any>;
    gtag: (...args: any[]) => void;
  }
}

export const metadata: Metadata = {
  title: "SpotifEye",
  description: "Control Spotify Song Reproduction using your Eyes!",
  keywords:
    "Spotify, Eye Tracking, Song, Music, Artificial Intelligence, AI, Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      useEnterprise={true}
    >
      <html lang="en" className="scroll-smooth">
        <PayPalDonate />
        <Suspense fallback={<div></div>}>
          <GoogleAnalytics
            GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""}
          />
        </Suspense>
        <body
          className={
            inter.className +
            " " +
            gotham.className +
            " bg-dark-gray font-inter grid grid-cols-12 gap-4"
          }
        >
          <DialogProvider>
            <>
              <Header />
              {children}
              <Footer />
              <HeroDialog />
            </>
          </DialogProvider>
        </body>
      </html>
    </ReCaptchaProvider>
  );
}
