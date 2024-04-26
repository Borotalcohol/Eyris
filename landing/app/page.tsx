"use server";

import Authors from "@/sections/Authors";
import Description from "@/sections/Description";
import FAQ from "@/sections/FAQ";
import GetInTouch from "@/sections/GetInTouch";
import Hero from "@/sections/Hero";
import HowItsMade from "@/sections/HowItsMade";
import ScrollToTop from "@/components/ScrollToTop";

export default async function Home() {
  return (
    <main className="grid min-h-screen col-span-12 grid-cols-subgrid">
      <ScrollToTop />
      <Hero />
      <Description />
      <HowItsMade />
      <FAQ />
      <Authors />
      <GetInTouch />
    </main>
  );
}
