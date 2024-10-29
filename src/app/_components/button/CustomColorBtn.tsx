import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { whiteColor } from "~/styles/colors";

interface CustomColorBtnProps {
  link: string;
  text: string;
  color: string;  
}
const CustomColorBtn = (props: CustomColorBtnProps) => {
  return (
    <Button sx={{ color: props.color }}>
      <Link href={props.link}>{props.text} </Link>
    </Button>
  );
};

export default CustomColorBtn;
