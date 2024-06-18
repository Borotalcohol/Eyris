import { Suspense } from "react";

import Header from "@/components/Navigation/Header";
import Footer from "@/components/Navigation/Footer";

import { inter, gotham, avenirltstd } from "./fonts";
import { Metadata } from "next";
import { ReCaptchaProvider } from "next-recaptcha-v3";

import GoogleAnalytics from "@/components/google-analytics";
import PayPalDonate from "@/utils/PayPalDonate";
import { DialogProvider } from "@/utils/DialogContext";

import { SpeedInsights } from "@vercel/speed-insights/next";

import HeroDialog from "@/components/Dialog";

import "./globals.css";

declare global {
  interface Window {
    PayPal: Record<string, any>;
    gtag: (...args: any[]) => void;
  }
}

export const metadata: Metadata = {
  title: "Eyris: Control Spotify Song Reproduction using your Eyes!",
  description:
    "Unlock the power of your gaze with Eyris! Seamlessly control your Spotify playlist using just your eyes. Explore hands-free music control like never before. Get started today and elevate your Spotify journey with Eyris!",
  keywords:
    "Spotify, Eye Tracking, Song, Music, Artificial Intelligence, AI, Next.js",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
    },
  },
  openGraph: {
    title: "Eyris: Control Spotify Song Reproduction using your Eyes!",
    description:
      "Unlock the power of your gaze with Eyris! Seamlessly control your Spotify playlist using just your eyes. Explore hands-free music control like never before. Get started today and elevate your Spotify journey with Eyris!",
    type: "website",
    locale: "en_US",
    siteName: "Eyris",
    images: ["/opengraph-image.png"],
  },
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
      useRecaptchaNet={true}
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
            "bg-dark-gray font-inter grid grid-cols-12 gap-4 !leading-none " +
            inter.variable +
            " " +
            avenirltstd.variable +
            " " +
            gotham.variable
          }
        >
          <>
            <DialogProvider>
              <>
                <HeroDialog />
                <Header />
                {children}
                <Footer />
              </>
            </DialogProvider>
            <SpeedInsights />
          </>
        </body>
      </html>
    </ReCaptchaProvider>
  );
}
