import { Typography, Stack, Box } from "@mui/material";
import React from "react";
import styles from "~/app/index.module.css";
import LogoutState from "./../_components/auth/LogoutState";

interface LoginFirstProps {
  email: string;
}

const LoginFirst = ({ email }: LoginFirstProps) => {
  return (
    <div className={styles.main}>
      <Typography
        variant="h4"
        color="primary"
        fontWeight={"bold"}
        sx={{ mb: 3 }}
      >
        {`[ ${email} ] 계정은 `}
      </Typography>
      <Stack direction="row" sx={{ mb: 5 }}>
        <Typography variant="h4" color="secondary" fontWeight={"bold"}>
          회원가입
        </Typography>
        <Typography variant="h4" color="primary" fontWeight={"bold"}>
          이 되어 있는 상태입니다.
        </Typography>
      </Stack>
      <Box
        sx={{
          border: 1,
          borderRadius: "10px",
          borderColor: "#ddd",
          backgroundColor: "#608294",
          pl: 1,
          pr: 1,
        }}
      >
        <LogoutState isDark={true} isFontLarge={true} isOnlyLogin={true} />
      </Box>
    </div>
  );
};

export default LoginFirst;
