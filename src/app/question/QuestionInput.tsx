"use client";

import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { api } from "~/trpc/react";
import type { Session } from "next-auth";

interface QuestionInputProps {
  session: Session | null;
}
const QuestionInput = ({ session }: QuestionInputProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const utils = api.useUtils();
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.getList.invalidate();
      await utils.post.getList.refetch();
    },
    onError: async (err) => {
      console.log(err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 문의 내용을 처리할 로직 추가
    console.log({ title, message: content });
    if (session)
      createPost.mutate({
        title,
        content,
      });
    // 예: 서버로 전송 또는 상태 업데이트
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" color="primary" fontWeight="bold">
        문의하기
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        sx={{ mt: 5 }}
      >
        <TextField
          label="제목"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="문의 내용"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ padding: "10px", fontWeight: "bold" }}
        >
          제출하기
        </Button>
      </Box>
    </Container>
  );
};

export default QuestionInput;
