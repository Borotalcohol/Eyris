import Image from "next/image";

function Footer() {
  return (
    <footer className="flex flex-col items-center col-span-12 pt-12 pb-24 text-center text-white bg-darkest-gray">
      <div className="flex items-center gap-3">
        <Image
          src="/LogoWhite.svg"
          alt="SpotifEye Logo"
          width={42}
          height={42}
        />
        <h3 className="text-3xl font-[800] text-white font-gotham !mb-2">
          SpotifEye
        </h3>
      </div>
      <p className="max-w-5xl mt-6 text-md font-avenir">
        Control Spotify song reproduction with your eyes.
      </p>
      <hr className="w-full h-px max-w-lg my-6 border-none bg-white/20" />
      <p className="max-w-5xl text-md font-avenir">
        You liked the project? Consider donating to support us
        <br /> and to allow us to keep this website running
      </p>
    </footer>
  );
}

export default Footer;
