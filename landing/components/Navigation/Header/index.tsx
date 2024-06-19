"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import PrimaryButton from "@/components/Button/Primary";
import Image from "next/image";
import Link from "next/link";

import useScroll from "@/hooks/useScroll";
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

import { useDialog } from "@/utils/DialogContext";

function Header() {
  const router = useRouter();
  const { isScrolled, yOffset } = useScroll();
  const { openDialog } = useDialog();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: "-100%" },
  };

  return (
    <div
      className={
        "fixed grid z-[4] w-full grid-cols-12 top transition-colors duration-300" +
        (isScrolled ? " bg-darkest-gray/90" : " bg-darkest-gray/0")
      }
    >
      <header
        className={
          "grid h-12 xl:h-fit col-span-12 px-6 xl:pt-5 xl:pb-3 xl:px-0 xl:col-span-10 xl:col-start-2 transition-colors duration-300 ease-in-out grid-cols-subgrid " +
          (isMobileMenuOpen ? " bg-dark-gray" : "")
        }
      >
        <div className="flex items-center justify-between col-span-12 xl:justify-start xl:col-span-7 xl:gap-12">
          <button
            onClick={handleMobileMenuToggle}
            className="flex items-center justify-center xl:hidden"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <Bars3BottomLeftIcon className="w-6 h-6 text-white" />
            )}
          </button>
          <div className="flex items-center gap-3">
            <Image
              className="w-8 xl:w-10 !mb-2"
              src="/Logo.svg"
              alt="Eyris Logo"
              width={42}
              height={42}
            />
            <h3 className="text-2xl xl:text-3xl font-[800] text-white font-gotham">
              Eyris
            </h3>
          </div>
          <button className="flex items-center justify-center invisible xl:hidden">
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <Bars3BottomLeftIcon className="w-6 h-6 text-white" />
            )}
          </button>
          <ul className="items-end gap-8 text-lg font-[400] text-white font-avenir hidden xl:flex">
            <li>
              <Link href="#description">What is Eyris</Link>
            </li>
            <li>
              <Link href="#how-its-made">How it&apos;s Made</Link>
            </li>
            <li>
              <Link href="#faq">FAQ</Link>
            </li>
            <li>
              <Link href="#get-in-touch">Get in Touch</Link>
            </li>
          </ul>
        </div>
        <div className="items-center justify-end hidden col-span-3 xl:flex">
          <Link
            href="https://demo.eyris.christianloschiavo.com"
            target="_blank"
          >
            <PrimaryButton>Try Demo</PrimaryButton>
          </Link>
        </div>
      </header>
      <div />
      <hr
        className={
          "h-px border-none bg-white/20 transition-all duration-300 col-span-12 z-[4]" +
          (isScrolled ? " col-span-12" : " xl:col-span-10 xl:col-start-2")
        }
      />
      <div />

      <motion.div
        className="xl:hidden bg-dark-gray text-white w-full h-screen absolute left-0 top-12 z-[15] overflow-y-hidden p-6"
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.25,
        }}
        variants={variants}
      >
        <ul className="flex flex-col gap-6">
          <li>
            <button onClick={() => handleLinkClick("#description")}>
              What is Eyris
            </button>
          </li>
          <li>
            <button onClick={() => handleLinkClick("#how-its-made")}>
              How it&apos;s Made
            </button>
          </li>
          <li>
            <button onClick={() => handleLinkClick("#faq")}>FAQ</button>
          </li>
          <li>
            <button onClick={() => handleLinkClick("#get-in-touch")}>
              Get in Touch
            </button>
          </li>
        </ul>
        <Link href="https://demo.eyris.christianloschiavo.com" target="_blank">
          <PrimaryButton className="w-full mt-8">Try Demo</PrimaryButton>
        </Link>
      </motion.div>
    </div>
  );
}

export default Header;
