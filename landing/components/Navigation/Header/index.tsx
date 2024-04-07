"use client";

import { useState, useEffect } from "react";

import PrimaryButton from "@/components/Button/Primary";
import Image from "next/image";
import Link from "next/link";

import useScroll from "@/hooks/useScroll";

function Header() {
  const { isScrolled, yOffset } = useScroll();

  return (
    <div
      className={
        "fixed grid z-[2] w-full grid-cols-12 top transition-colors duration-300" +
        (isScrolled ? " bg-darkest-gray/90" : " bg-darkest-gray/0")
      }
    >
      <header className="grid col-span-10 col-start-2 pt-5 pb-3 grid-cols-subgrid">
        <div className="flex items-center col-span-7 gap-12">
          <div className="flex items-center gap-3">
            <Image
              src="/LogoGreenBlack.svg"
              alt="SpotifEye Logo"
              width={42}
              height={42}
            />
            <h3 className="text-3xl font-[800] text-white font-gotham !mb-2">
              SpotifEye
            </h3>
          </div>
          <ul className="flex items-end gap-8 text-lg font-[400] text-white font-avenir">
            <li>
              <Link href="#description">What is SpotifEye</Link>
            </li>
            <li>
              <Link href="#how-its-made">How it's Made</Link>
            </li>
            <li>
              <Link href="#faq">FAQ</Link>
            </li>
            <li>
              <Link href="#get-in-touch">Get in Touch</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-end col-span-3">
          <PrimaryButton>Try Demo</PrimaryButton>
        </div>
      </header>
      <div />
      <hr
        className={
          "h-px border-none bg-white/20 transition-all  duration-300" +
          (isScrolled ? " col-span-12" : " col-span-10 col-start-2")
        }
      />
      <div />
    </div>
  );
}

export default Header;
