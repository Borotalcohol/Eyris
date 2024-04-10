import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import { MdAlternateEmail } from "react-icons/md";
import AuthorCard from "./AuthorCard";

function Authors() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full col-span-12 px-6 pt-10 pb-24 text-center text-white xl:pt-16">
      <h2 className="text-3xl font-black xl:text-4xl font-gotham">
        The Authors
      </h2>
      <hr className="w-full h-px max-w-lg my-6 border-none bg-white/20" />
      <p className="max-w-5xl text-center text-white font-avenir ">
        We're both MSc students enrolled in the{" "}
        <Link
          href="https://www.unimib.it/graduate/artificial-intelligence"
          className="font-bold underline"
          target="_blank"
        >
          “Artificial Intelligence for Science and Technology”
        </Link>{" "}
        course offered by:{" "}
        <b>University of Milan-Bicocca, University of Milan</b> and{" "}
        <b>University of Pavia</b>
      </p>
      <div className="flex flex-col items-center justify-start w-full max-w-4xl gap-12 mt-16 md:flex-row md:justify-evenly">
        <AuthorCard
          emailAddress="loschiavo.christian@gmail.com"
          linkedinProfileUrl="https://www.linkedin.com/in/christian-loschiavo-56059a1b6"
          githubProfileUrl="https://github.com/Borotalcohol"
          profileImageSrc="/Christian.png"
          profileImageAlt="Christian Loschiavo"
          authorName="Christian Loschiavo"
        />
        <AuthorCard
          emailAddress="a.jarach1@campus.unimib.it"
          linkedinProfileUrl="https://www.linkedin.com/in/alessandro-ruben-jarach-502620224/"
          githubProfileUrl="#"
          profileImageSrc="/Alessandro.png"
          profileImageAlt="Alessandro Ruben Jarach"
          authorName="Alessandro Ruben Jarach"
        />
      </div>
      <div className="w-full pointer-events-none h-full absolute top-0 left-0 z-[-2] bg-gradient-to-bl from-ochre/30 to-darkest-gray/30" />
    </section>
  );
}

export default Authors;
