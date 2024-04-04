import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const PrimaryButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className="px-5 py-2 rounded-full bg-accent flex items-center justify-center gap-1 text-darkest-gray shadow-[0_0_30px_5px_rgba(30,215,96,0.2)] font-avenir font-[500] text-lg"
      {...rest}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
