import { ButtonGroup, Box, Button, Stack, Typography } from "@mui/material";
import QuestionList from "./QuestionList";

export default async function Admin() {
  return (
    <Box margin={"20px"}>
      <Stack
        direction="row"
        width={"100%"}
        justifyContent="space-between"
        alignItems="center"
        padding={"20px"}
      >
        <Typography variant="h5" color="primary" fontWeight={"bold"}>
          1:1문의
        </Typography>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button variant="contained">전체보기</Button>
          <Button>대기</Button>
          <Button>답변완료</Button>
        </ButtonGroup>
      </Stack>
      <QuestionList />
    </Box>
  );
}
