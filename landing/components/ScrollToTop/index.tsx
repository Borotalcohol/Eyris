"use client";

import useScroll from "@/hooks/useScroll";
import { ChevronUpIcon } from "@heroicons/react/16/solid";

function ScrollToTop() {
  const { isScrolled, yOffset } = useScroll();

  const hoverEffect =
    "overflow-hidden transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-white before:duration-500 before:ease-out hover:before:h-56 hover:before:w-56";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isScrolled) return <></>;
  else
    return (
      <button
        onClick={scrollToTop}
        className={
          "fixed flex items-center justify-center w-16 h-16 bg-[#EEE] rounded-full z-[2] cursor-pointer bottom-10 right-10 " +
          hoverEffect
        }
      >
        <ChevronUpIcon className="w-8 h-8 text-darkest-gray z-[3]" />
      </button>
    );
}

export default ScrollToTop;
