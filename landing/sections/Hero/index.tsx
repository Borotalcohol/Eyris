import PrimaryButton from "@/components/Button/Primary";
import SecondaryButton from "@/components/Button/Secondary";

function Hero() {
  return (
    <div className="flex flex-col justify-center col-span-5 col-start-2 gap-12">
      <h1 className="font-black text-white text-7xl font-gotham">
        Eye-Gazed
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
        <SecondaryButton>How It Works</SecondaryButton>
      </div>
    </div>
  );
}

export default Hero;
