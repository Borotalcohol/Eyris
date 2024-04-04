import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const TertiaryButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className="px-5 py-2 rounded-full flex items-center justify-center gap-1 bg-white/10 text-white font-avenir font-[500] text-lg"
      {...rest}
    >
      {children}
    </button>
  );
};

export default TertiaryButton;
