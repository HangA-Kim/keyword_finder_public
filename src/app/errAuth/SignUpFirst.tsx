import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import LogoutState from "../_auth/LogoutState";
import Image from "next/image";

const SignUpFirst = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          color="primary"
          fontWeight={"bold"}
          sx={{
            mt: { xs: 3, sm: 10 },
            mb: { xs: 2, sm: 5 },
            fontSize: { xs: "h5.fontSize", sm: "h2.fontSize" },
          }} // 모바일에서 글자 크기 조정
        >
          가입된 회원정보가 없습니다.
        </Typography>

        <LogoutState isDark={false} isFontLarge={true} isOnlyLogin={false} />
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }} // 모바일에서는 세로 배치, PC에서는 가로 배치
        spacing={4}
        sx={{ mt: { xs: 3, sm: 10 } }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "70%" }, // 모바일에서 너비 100%, PC에서는 70%
            mb: { xs: 4, sm: 0 }, // 모바일에서는 아래 여백 추가
          }}
        >
          <Image
            src="/img_graph.jpg"
            width={500} // 실제 이미지의 크기를 지정해야 함
            height={300}
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
            width: { xs: "100%", sm: "auto" }, // 모바일에서 너비 100%, PC에서는 자동
          }}
        >
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            fontWeight={"bold"}
            color="primary"
            sx={{ fontSize: { xs: "h6.fontSize", sm: "h4.fontSize" } }} // 모바일에서 글자 크기 조정
          >
            맞춤형 키워드 추천
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              mb: 10,
              fontSize: { xs: "body2.fontSize", sm: "h5.fontSize" },
            }} // 모바일에서 글자 크기 조정
          >
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
            sx={{ fontSize: { xs: "h6.fontSize", sm: "h4.fontSize" } }} // 모바일에서 글자 크기 조정
          >
            저장된 검색 기록
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "body2.fontSize", sm: "h5.fontSize" },
            }} // 모바일에서 글자 크기 조정
          >
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
