"use client";

import React, { useState } from "react";
import InputSearch from "./_components/analysis/InputSearch";
import { Box } from "@mui/material";
import { api } from "~/trpc/react";
// import SearchResultChart from "./SearchResultChart";
import SearchResultChart from "./_components/analysis/SearchResultChart";
import type { NaverRequestType, NaverResponseResult } from "~/common/types";
import type { Session } from "next-auth";
import SearchChips from "./_components/SearchChips";

interface KeywordAnsProps {
  session: Session | null;
}
const KeywordAns = ({ session }: KeywordAnsProps) => {
  const [keywordList] = session
    ? api.analysis.getKeywordList.useSuspenseQuery()
    : [];
  const [searchData, setSearchData] = useState<NaverResponseResult | string>(
    ""
  );
  const [searchWord, setSearchWord] = useState("");
  const utils = api.useUtils();

  const saveKeyword = api.analysis.saveKeyword.useMutation({
    onSuccess: async () => {
      await utils.analysis.getKeywordList.invalidate();
      await utils.analysis.getKeywordList.refetch();
    },
    onError: async (err) => {
      console.log(err);
    },
  });

  const searchNaver = async (requestData: NaverRequestType) => {
    const data = await utils.analysis.reqNaver.fetch(requestData);

    if (session)
      saveKeyword.mutate({
        keyword: requestData.searchText,
      });

    console.log("search", data.result);
    setSearchData(data.result);
    await utils.analysis.reqNaver.invalidate();
  };

  const deleteKeyword = async (keyword: string) => {
    await utils.analysis.deleteKeyword.fetch({ keyword });
    await utils.analysis.deleteKeyword.invalidate();
    await utils.analysis.getKeywordList.refetch();
  };

  const selectKeyword = (keyword: string) => {
    console.log("selectKeyword", keyword);
    setSearchWord(keyword);
  };
  return (
    <Box>
      <InputSearch search={searchNaver} keyword={searchWord} />

      {keywordList ? (
        <SearchChips
          keywordList={keywordList}
          deleteKeyword={deleteKeyword}
          clickKeyword={selectKeyword}
        />
      ) : (
        ""
      )}
      {typeof searchData === "string" ? (
        <p>{searchData}</p>
      ) : (
        <SearchResultChart searchData={searchData.data} />
      )}
    </Box>
  );
};

export default KeywordAns;
