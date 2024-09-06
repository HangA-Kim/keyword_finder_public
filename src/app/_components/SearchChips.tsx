"use client";

import { Chip, Stack } from "@mui/material";
import React, { useState } from "react";
import { api } from "~/trpc/react";

interface SearchChipsProps {
  keywordList: { word: string }[];
  deleteKeyword(keyword: string): void;
  clickKeyword(keyword: string): void;
}
const SearchChips = ({
  keywordList = [],
  deleteKeyword,
  clickKeyword,
}: SearchChipsProps) => {
  // console.log("SearchChips:", keywordList);

  return (
    <Stack direction="row" spacing={1}>
      {keywordList.map((keyword, idx) => (
        <Chip
          key={idx}
          label={keyword.word}
          onDelete={(e) => deleteKeyword(keyword.word)}
          onClick={(e) => clickKeyword(keyword.word)}
        />
      ))}
    </Stack>
  );
};

export default SearchChips;
