import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import { MdAlternateEmail } from "react-icons/md";

function Authors() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full col-span-12 pt-16 pb-24 text-center text-white">
      <h2 className="text-4xl font-black font-gotham">The Authors</h2>
      <hr className="w-full h-px max-w-lg my-6 border-none bg-white/20" />
      <p className="max-w-5xl text-center text-white font-avenir ">
        We're both MSc students enrolled in the{" "}
        <b>“Artificial Intelligence for Science and Technology”</b> course
        offered by: <b>University of Milan-Bicocca, University of Milan</b> and
        <b>University of Pavia</b>
      </p>
      <div className="flex items-center w-full max-w-4xl mt-16 justify-evenly">
        <div className="relative flex flex-col w-full max-w-[240px]">
          <div className="absolute top-0 left-0 flex justify-end w-full h-24 gap-3 px-4 pt-4 text-white align-bottom rounded-t-lg bg-gradient-to-b from-black/90 to-black/0">
            <Link href="">
              <MdAlternateEmail className="w-6 h-6" />
            </Link>
            <Link href="">
              <FaLinkedin className="w-6 h-6" />
            </Link>
            <Link href="">
              <FaGithub className="w-6 h-6" />
            </Link>
          </div>
          <Image
            src="/Christian.png"
            alt="Christian Loschiavo"
            width={512}
            height={512}
            className="object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 flex flex-col items-center justify-end w-full h-24 align-bottom rounded-b-lg bg-gradient-to-t from-black/90 to-black/0">
            <p className="mb-3 text-xl font-medium text-center text-white font-avenir">
              Christian Loschiavo
            </p>
          </div>
        </div>
        <div className="relative flex flex-col w-full max-w-[240px]">
          <div className="absolute top-0 left-0 flex justify-end w-full h-24 gap-3 px-4 pt-4 text-white align-bottom rounded-t-lg bg-gradient-to-b from-black/90 to-black/0">
            <Link href="">
              <MdAlternateEmail className="w-6 h-6" />
            </Link>
            <Link href="">
              <FaLinkedin className="w-6 h-6" />
            </Link>
            <Link href="">
              <FaGithub className="w-6 h-6" />
            </Link>
          </div>
          <Image
            src="/Alessandro.png"
            alt="Alessandro Ruben Jarach"
            width={512}
            height={512}
            className="object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 flex flex-col items-center justify-end w-full h-24 align-bottom rounded-b-lg bg-gradient-to-t from-black/90 to-black/0">
            <p className="mb-3 text-xl font-medium text-center text-white font-avenir">
              Alessandro Ruben
              <br /> Jarach
            </p>
          </div>
        </div>
      </div>
      <div className="w-full pointer-events-none h-full absolute top-0 left-0 z-[-2] bg-gradient-to-bl from-ochre/30 to-darkest-gray/30" />
    </section>
  );
}

export default Authors;
