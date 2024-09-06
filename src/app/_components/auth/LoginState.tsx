"use client";

import { Avatar, Chip, Stack, Button, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import LogoutBtn from "./LogoutBtn";

interface LoginStateProps {
  name: string | null | undefined;
  imgPath: string | null | undefined;
}
const LoginState = (props: LoginStateProps) => {
  return (
    <>
      {props.name ? (
        <Stack direction="row" spacing={2}>
          <Chip
            avatar={
              <Avatar alt={props.name} src={props.imgPath ? props.imgPath : ""}>
                {props.imgPath ? "" : <PersonIcon />}
              </Avatar>
            }
            label={props.name}
            color="primary"
          />
          <LogoutBtn />
        </Stack>
      ) : (
        <LogoutBtn />
      )}
    </>
  );
};

export default LoginState;
