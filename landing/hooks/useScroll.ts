import { useState, useEffect } from "react";

const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [yOffset, setYOffset] = useState(0);

  const onScroll = () => {
    const scrollY = window.scrollY;
    setYOffset(scrollY);
    setIsScrolled(scrollY > 0);
  };

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
