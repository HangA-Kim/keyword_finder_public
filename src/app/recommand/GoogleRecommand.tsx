"use client";

import {
  Stack,
  FormControl,
  IconButton,
  InputBase,
  Paper,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import InputKeyword from "../_components/recommand/InputKeyword";
import { useSnackbar } from "~/app/_context/SnackbarContext";
import InputSearch from "../_components/analysis/InputSearch";
import type { NaverRequestType } from "~/common/types";
import SearchIcon from "@mui/icons-material/Search";
function GoogleRecommand() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const { showSnackbar } = useSnackbar();

  const [searchWord, setSearchWord] = useState("");
  const [inputText, setInputText] = React.useState('');

  const handleSearch = () => {
  };

  return (
    <Box sx={{ m: { xs: 1, sm: 3 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // 모바일: 세로, PC: 가로
          justifyContent: "center", // 가운데 정렬
          alignItems: { xs: "stretch", sm: "center" }, // 모바일: 가로 꽉 채움, PC: 가운데 정렬
        }}
      >
      <Paper
            variant="outlined"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", sm: 500 }, // 모바일: 100%, PC: 500px
              mr: { sm: 2 }, // PC: 오른쪽 여백 추가
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Keyword"
              inputProps={{ "aria-label": "search keyword" }}
              autoFocus={true}
              defaultValue={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon onClick={handleSearch} />
            </IconButton>
          </Paper>
          </Box>
    </Box>
  );
}

export default MainReco;
