import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const avenirltstd = localFont({
  src: [
    { path: "./fonts/avenirltstd-light.otf", weight: "300" },
    { path: "./fonts/avenirltstd-normal.otf", weight: "400" },
    { path: "./fonts/avenirltstd-medium.otf", weight: "500" },
  ],
  variable: "--font-avenirltstd",
});
const gotham = localFont({
  src: [
    { path: "./fonts/gotham-thin.otf", weight: "300" },
    { path: "./fonts/gotham-normal.ttf", weight: "400" },
    { path: "./fonts/gotham-bold.ttf", weight: "600" },
    { path: "./fonts/gotham-black.otf", weight: "800" },
  ],
  variable: "--font-gotham",
});

export { inter, avenirltstd, gotham };
