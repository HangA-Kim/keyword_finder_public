"use client";

import { Chip, Box } from "@mui/material";
import React from "react";

interface SearchChipsProps {
  keywordList: { word: string }[];
  deleteKeyword(this: void, keyword: string): Promise<void>;
  clickKeyword(this: void, keyword: string): void;
}

const SearchChips: React.FunctionComponent<SearchChipsProps> = ({
  keywordList = [],
  deleteKeyword,
  clickKeyword,
}) => {
  // console.log("SearchChips:", keywordList);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {keywordList.map((keyword, idx) => (
        <Chip
          key={idx}
          label={keyword.word}
          onDelete={() => deleteKeyword(keyword.word)}
          onClick={() => clickKeyword(keyword.word)}
          sx={{ mr: 1, mb: 1 }}
        />
      ))}
    </Box>
  );
};

export default SearchChips;
