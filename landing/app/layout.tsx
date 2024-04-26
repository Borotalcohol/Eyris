import Header from "@/components/Navigation/Header";
import Footer from "@/components/Navigation/Footer";

import { inter, gotham } from "./fonts";
import { Metadata } from "next";
import { ReCaptchaProvider } from "next-recaptcha-v3";

import PayPalDonate from "@/utils/PayPalDonate";

import "./globals.css";

declare global {
  interface Window {
    PayPal: Record<string, any>;
  }
}

export const metadata: Metadata = {
  title: "SpotifEye",
  description: "Control Spotify Song Reproduction using your Eyes!",
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
    </ReCaptchaProvider>
  );
}
