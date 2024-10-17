import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const LogoutBtn = () => {
  return (
    <Button sx={{ color: "#fff" }}>
      <Link href="/api/auth/signout">LOGOUT </Link>
    </Button>
  );
};

export default LogoutBtn;
