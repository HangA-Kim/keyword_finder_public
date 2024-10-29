"use client";

import { Avatar, Chip, Stack } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import CustomColorBtn from "../_components/button/CustomColorBtn";
import { whiteColor } from "~/styles/colors";

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
          <CustomColorBtn link="/api/auth/signout" text="LOGOUT" color={whiteColor} />
        </Stack>
      ) : (
        <CustomColorBtn link="/api/auth/signout" text="LOGOUT" color={whiteColor} />
      )}
    </>
  );
};

export default LoginState;
