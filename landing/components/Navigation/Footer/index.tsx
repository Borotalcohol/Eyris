import Image from "next/image";

function Footer() {
  return (
    <footer
      id="footer"
      className="flex flex-col items-center col-span-12 px-6 pt-12 pb-24 text-center text-white xl:px-0 bg-darkest-gray"
    >
      <div className="flex items-center gap-3">
        <Image src="/LogoWhite.svg" alt="Eyris Logo" width={42} height={42} />
        <h3 className="text-3xl font-[800] text-white font-gotham !mb-2">
          Eyris
        </h3>
      </div>
      <p className="max-w-5xl mt-6 text-sm xl:text-md font-avenir">
        Control Spotify song reproduction with your eyes.
      </p>
      <hr className="w-full h-px max-w-lg my-6 border-none bg-white/20" />
      <p className="max-w-5xl text-sm xl:text-md font-avenir">
        You liked the project? Consider donating to support us
        <br /> and to allow us to keep this website running
      </p>
      <div id="donate-button-container" className="mt-6">
        <div id="donate-button"></div>
      </div>
    </footer>
  );
}

export default Footer;
