"use client";

import { Button, Stack } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
import { whiteColor, brown } from "~/styles/colors";

import {
  AUTH_INTENT,
  INTENT_LOGIN,
  INTENT_SIGNUP,
  URL_SIGN_IN,
} from "~/common/constant";

export const buttonStyles = (isDark: boolean, isFontLarge: boolean) => ({
  color: isDark ? whiteColor : brown,
  fontWeight: isFontLarge ? "bold" : "",
  fontSize: isFontLarge ? "30px" : "",
});

interface LogoutStateProps {
  isDark: boolean;
  isFontLarge: boolean;
  isOnlyLogin: boolean;
}
const LogoutState = ({
  isDark,
  isFontLarge,
  isOnlyLogin,
}: LogoutStateProps) => {
  const router = useRouter();

  const handleSignin = (intent: string) => {
    Cookies.set(AUTH_INTENT, intent);
    router.push(URL_SIGN_IN);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        sx={buttonStyles(isDark, isFontLarge)}
        onClick={() => handleSignin(INTENT_LOGIN)}
      >
        LOGIN
      </Button>
      {!isOnlyLogin && (
        <Button
          sx={buttonStyles(isDark, isFontLarge)}
          onClick={() => handleSignin(INTENT_SIGNUP)}
        >
          SIGNUP
        </Button>
      )}
    </Stack>
  );
};

export default LogoutState;
