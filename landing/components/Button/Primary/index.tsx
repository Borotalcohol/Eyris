import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...rest
}) => {
  const hoverEffect =
    "relative overflow-hidden text-darkest-gray transition-all hover:shadow-[0_0_50px_5px_rgba(30,215,96,0.3)] before:absolute before:h-0 before:w-0 before:rounded-full before:bg-dark-accent before:text-white before:duration-500 before:ease-out hover:before:text-white hover:before:h-56 hover:before:w-56";

  return (
    <button
      className={
        "px-5 py-2 rounded-full bg-accent flex items-center justify-center gap-1 shadow-[0_0_30px_5px_rgba(30,215,96,0.2)] font-avenir font-[500] text-lg " +
        className +
        " " +
        hoverEffect
      }
      {...rest}
    >
      <span className="relative z-10 flex items-center justify-center gap-1">
        {children}
      </span>
    </button>
  );
};

export default PrimaryButton;
