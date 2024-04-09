import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  hasHoverEffect?: boolean;
}

const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  className = "",
  hasHoverEffect = true,
  ...rest
}) => {
  const hoverEffect =
    "relative overflow-hidden transition-all hover:shadow-[0_0_50px_5px_rgba(255,255,255,0.3)] before:absolute before:h-0 before:w-0 before:rounded-full before:bg-white before:duration-500 before:ease-out hover:before:h-56 hover:before:w-56";

  return (
    <button
      className={
        "px-5 py-2 rounded-full bg-[#EEE] flex items-center justify-center gap-1 text-darkest-gray shadow-[0_0_30px_5px_rgba(255,255,255,0.2)] font-avenir font-[500] text-lg " +
        className +
        (hasHoverEffect ? " " + hoverEffect : "bg-white")
      }
      {...rest}
    >
      <span className="relative flex items-center justify-center gap-1 z-2">
        {children}
      </span>
    </button>
  );
};

export default SecondaryButton;
