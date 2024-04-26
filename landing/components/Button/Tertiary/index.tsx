import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Box, CircularProgress } from "@mui/material";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

const TertiaryButton: React.FC<ButtonProps> = ({
  children,
  className = "",
  loading = false,
  ...rest
}) => {
  const hoverEffect =
    "relative overflow-hidden transition-all hover:shadow-[0_0_50px_5px_rgba(255,255,255,0.1)] before:absolute before:h-0 before:w-0 before:rounded-full before:bg-white/20 before:duration-500 before:ease-out hover:before:h-56 hover:before:w-56";

  return (
    <button
      className={
        "px-5 py-2 rounded-full flex items-center justify-center gap-1 bg-white/10 text-white font-avenir font-[500] text-md xl:text-lg " +
        className +
        " " +
        hoverEffect
      }
      disabled={loading}
      {...rest}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress thickness={4} size={20} color="inherit" />
        </Box>
      ) : (
        <span className="relative z-10 flex items-center justify-center gap-1">
          {children}
        </span>
      )}
    </button>
  );
};

export default TertiaryButton;
