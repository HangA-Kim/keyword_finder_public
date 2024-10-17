"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#66796B",
    },
    secondary: {
      main: "#BA8E7A",
    },
    background: {
      default: "#EFDFCC",
      paper: "#d4c2ad",
    },
    text: {
      primary: "#5d4037",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
