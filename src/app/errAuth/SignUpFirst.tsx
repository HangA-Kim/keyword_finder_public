import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import styles from "~/app/index.module.css";
import LogoutState from "../_components/auth/LogoutState";

const SignUpFirst = () => {
  return (
    <div className={styles.main}>
      <Typography
        variant="h2"
        color="primary"
        fontWeight={"bold"}
        sx={{ mt: 10, mb: 5 }}
      >
        가입된 회원정보가 없습니다.
      </Typography>
      <LogoutState isDark={false} isFontLarge={true} isOnlyLogin={false} />
      <Stack direction="row" spacing={4} sx={{ mt: 10 }}>
        <Box sx={{ width: "70%" }}>
          <img
            src="/img_graph.jpg"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "0 30px 30px 0",
            }}
            alt="graph"
          />
        </Box>
        <Box
          sx={{
            p: 3,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            fontWeight={"bold"}
            color="primary"
          >
            맞춤형 키워드 추천
          </Typography>
          <Typography variant="h5" sx={{ color: "text.secondary", mb: 10 }}>
            회원가입을 통해 사용자의 검색 이력이나 관심사를 기반으로 맞춤형
            키워드를 추천받을 수 있습니다. 로그인된 상태에서는 사용자의 행동을
            학습해 점점 더 정확한 키워드를 제안할 수 있습니다.
          </Typography>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            fontWeight={"bold"}
            color="primary"
          >
            저장된 검색 기록
          </Typography>
          <Typography variant="h5" sx={{ color: "text.secondary" }}>
            검색한 키워드와 관련 데이터를 저장해두고, 이후에 쉽게 접근할 수
            있습니다. 이전 검색 기록을 바탕으로 새로운 추천 키워드를 제공받을
            수도 있습니다.
          </Typography>
        </Box>
      </Stack>
    </div>
  );
};

export default SignUpFirst;
