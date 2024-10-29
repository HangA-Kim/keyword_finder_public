"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { lightGreen, brown, bgColor, paperColor, textColor } from "~/styles/colors";
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightGreen,
    },
    secondary: {
      main: brown,
    },
    background: {
      default: bgColor,
      paper: paperColor,
    },
    text: {
      primary: textColor,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
