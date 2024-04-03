import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const SecondaryButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className="px-6 py-2 rounded-full bg-white text-darkest-gray shadow-[0_0_30px_5px_rgba(255,255,255,0.2)] font-avenir font-[500] text-lg"
      {...rest}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
