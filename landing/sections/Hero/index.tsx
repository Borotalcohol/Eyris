import PrimaryButton from "@/components/Button/Primary";
import SecondaryButton from "@/components/Button/Secondary";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <div className="relative grid col-span-12 px-6 grid-cols-subgrid">
      <section className="flex flex-col col-span-12 justify-center items-center text-center xl:items-start py-[100px] xl:text-left xl:col-span-7 2xl:col-span-5 xl:col-start-2 2xl:col-start-2 gap-12 xl:py-[150px] 2xl:py-[200px]">
        <h1 className="text-5xl font-black text-white xl:text-7xl font-gotham">
          Eye-Gaze
          <br /> Controlled Spotify
          <br /> Song Reproduction
        </h1>
        <p className="max-w-lg text-white text-md xl:text-lg font-avenir xl:max-w-none">
          Use your eyes to control song reproduction: visualize current playing
          song, pause, resume, skip to the previous song, skip to the next, all
          using your eyes.
        </p>
        <div className="flex flex-col items-center gap-4 md:flex-row w-max">
          <PrimaryButton className="w-full md:w-auto">Try Demo</PrimaryButton>
          <Link href="#how-its-made" className="w-full md:w-auto">
            <SecondaryButton>How It Works</SecondaryButton>
          </Link>
        </div>
      </section>
      <div className="col-span-7" />
      <Image
        className="z-[-1] h-full w-auto absolute object-cover top-0 right-0"
        style={{
          maskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
        src="/Background.png"
        alt="Background Image"
        width={600}
        height={400}
        priority
      />
      <div className="w-full pointer-events-none h-full absolute top-0 left-0 z-[-2] bg-gradient-to-t xl:bg-gradient-to-br from-10% xl:from-25% from-darkest-gray to-[#134324]" />
    </div>
  );
}

export default Hero;
