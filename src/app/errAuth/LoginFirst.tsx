import { Typography, Stack, Box } from "@mui/material";
import React from "react";
import LogoutState from "../_auth/LogoutState";
import { lightGray, lightBlue } from "~/styles/colors";

interface LoginFirstProps {
  email: string;
}

const LoginFirst = ({ email }: LoginFirstProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
        p: 5,
      }}
    >
      <Typography
        variant="h4"
        color="primary"
        fontWeight={"bold"}
        sx={{ mb: 3, fontSize: { xs: "h6.fontSize", sm: "h4.fontSize" } }}
      >
        {`[ ${email} ] 계정은 `}
      </Typography>
      <Stack direction="row" sx={{ mb: 5 }}>
        <Typography
          variant="h4"
          color="secondary"
          fontWeight={"bold"}
          sx={{ fontSize: { xs: "h6.fontSize", sm: "h4.fontSize" } }}
        >
          회원가입
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          fontWeight={"bold"}
          sx={{ fontSize: { xs: "h6.fontSize", sm: "h4.fontSize" } }}
        >
          이 되어 있는 상태입니다.
        </Typography>
      </Stack>
      <Box
        sx={{
          border: 1,
          borderRadius: "10px",
          borderColor: lightGray,
          backgroundColor: lightBlue,
          pl: 1,
          pr: 1,
        }}
      >
        <LogoutState isDark={true} isFontLarge={true} isOnlyLogin={true} />
      </Box>
    </Box>
  );
};

export default LoginFirst;
