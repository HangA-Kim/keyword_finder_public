import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import React from "react";

const FailLogin = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        mt: 5,
      }}
    >
      <Typography
        variant="h4"
        color="primary"
        fontWeight={"bold"}
        sx={{
          fontSize: { xs: "h6.fontSize", sm: "h4.fontSize" },
          mb: { xs: 5, sm: 10 },
        }}
      >
        로그인이 필요한 기능입니다.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
        <Card sx={{ maxWidth: 500 }}>
          <CardMedia
            sx={{ height: 200 }}
            image="/img_graph.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              맞춤형 키워드 추천
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              회원가입을 통해 사용자의 검색 이력이나 관심사를 기반으로 맞춤형
              키워드를 추천받을 수 있습니다. 로그인된 상태에서는 사용자의 행동을
              학습해 점점 더 정확한 키워드를 제안할 수 있습니다.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 500 }}>
          <CardMedia
            sx={{ height: 200 }}
            image="/img_list.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              저장된 검색 기록
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              검색한 키워드와 관련 데이터를 저장해두고, 이후에 쉽게 접근할 수
              있습니다. 이전 검색 기록을 바탕으로 새로운 추천 키워드를 제공받을
              수도 있습니다.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default FailLogin;
