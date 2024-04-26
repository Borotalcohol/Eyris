import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Box, CircularProgress } from "@mui/material";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  className = "",
  loading = false,
  ...rest
}) => {
  const hoverEffect =
    "relative overflow-hidden text-darkest-gray transition-all hover:shadow-[0_0_50px_5px_rgba(30,215,96,0.3)] before:absolute before:h-0 before:w-0 before:rounded-full before:bg-dark-accent before:text-white before:duration-500 before:ease-out hover:before:text-white hover:before:h-56 hover:before:w-56";

  return (
    <button
      className={
        "px-5 py-2 rounded-full bg-accent flex items-center justify-center gap-1 shadow-[0_0_30px_5px_rgba(30,215,96,0.2)] font-avenir font-[500] text-md xl:text-lg " +
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
        <span className="relative flex items-center justify-center gap-1 z-2">
          {children}
        </span>
      )}
    </button>
  );
};

export default PrimaryButton;
