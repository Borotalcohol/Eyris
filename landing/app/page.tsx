import { Metadata } from "next";

import Authors from "@/sections/Authors";
import Description from "@/sections/Description";
import FAQ from "@/sections/FAQ";
import GetInTouch from "@/sections/GetInTouch";
import Hero from "@/sections/Hero";
import HowItsMade from "@/sections/HowItsMade";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "SpotifEye",
  description: "Control Spotify Song Reproduction using your Eyes!",
};

function Home() {
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

export default Home;
