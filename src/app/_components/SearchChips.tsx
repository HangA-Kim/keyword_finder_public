"use client";

import { Chip, Stack } from "@mui/material";
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
