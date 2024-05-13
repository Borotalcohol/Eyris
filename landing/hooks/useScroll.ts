import { useState, useEffect } from "react";

const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [yOffset, setYOffset] = useState(0);

  const debounce = (func: any, delay: number) => {
    let timeoutId: any;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const onScroll = debounce(() => {
    const scrollY = window.scrollY;
    setYOffset(scrollY);
    setIsScrolled(scrollY > 0);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (yOffset > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, [yOffset]);

  return { isScrolled, yOffset };
};

export default useScroll;
