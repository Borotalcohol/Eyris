import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <button
      className={
        "px-5 py-2 rounded-full bg-white flex items-center justify-center gap-1 text-darkest-gray shadow-[0_0_30px_5px_rgba(255,255,255,0.2)] font-avenir font-[500] text-lg " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
