import PrimaryButton from "@/components/Button/Primary";
import SecondaryButton from "@/components/Button/Secondary";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <div className="relative grid col-span-12 grid-cols-subgrid">
      <section className="flex flex-col justify-center col-span-5 col-start-2 gap-12 py-[200px]">
        <h1 className="font-black text-white text-7xl font-gotham">
          Eye-Gaze
          <br /> Controlled Spotify
          <br /> Song Reproduction
        </h1>
        <p className="text-lg text-white font-avenir">
          Use your eyes to control song reproduction: visualize current playing
          song, pause, resume, skip to the previous song, skip to the next, all
          using your eyes.
        </p>
        <div className="flex items-center gap-4">
          <PrimaryButton>Try Demo</PrimaryButton>
          <Link href="#how-its-made">
            <SecondaryButton>How It Works</SecondaryButton>
          </Link>
        </div>
      </section>
      <div className="col-span-7" />
      <Image
        className="z-[-1] h-full w-auto absolute top-0 right-0"
        style={{
          maskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
        src="/Background.png"
        alt="Background Image"
        width={600}
        height={400}
      />
      <div className="w-full pointer-events-none h-full absolute top-0 left-0 z-[-2] bg-gradient-to-br from-25% from-darkest-gray to-[#134324]" />
    </div>
  );
}

export default Hero;
