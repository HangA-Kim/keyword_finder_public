"use client";

import {
  Stack,
  FormControl,
  TextField,
  FormGroup,
  Button,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import InputKeyword from "../_components/recommand/InputKeyword";
import { useSnackbar } from "~/app/_context/SnackbarContext";

function MainRecommand() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const { showSnackbar } = useSnackbar();

  const addKeyword = (keyword: string) => {
    console.log(keyword);
    setKeywords([...keywords, keyword]);
  };

  const handleSearch = () => {
    if (category.length === 0) {
      showSnackbar("카테고리를 입력하세요", "warning");
      return;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "70vh",
        padding: "50px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
            <TextField
              id="outlined-search"
              label="카테고리"
              type="search"
              onChange={(e) => setCategory(e.target.value)}
            />
            <Box display="flex" flexDirection="column">
              {keywords.map((keyword, idx) => (
                <TextField
                  key={idx}
                  id="outlined-search"
                  type="search"
                  defaultValue={keyword}
                  disabled
                  sx={{ mb: 1 }}
                />
              ))}
              <InputKeyword addKeyword={addKeyword} />
            </Box>
            <Box height={"100%"}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSearch}
                sx={{ mt: 1 }}
              >
                검색
              </Button>
            </Box>
          </Stack>
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default MainRecommand;
