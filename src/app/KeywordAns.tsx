"use client";

import React, { useState, useEffect } from "react";
import InputSearch from "./_components/searchbar/InputSearch";
import { Box } from "@mui/material";
import { api } from "~/trpc/react";
// import SearchResultChart from "./SearchResultChart";
import { useSearchParams } from "next/navigation";
import { useSnackbar } from "~/app/_context/SnackbarContext";
import SearchResultChart from "./_components/SearchResultChart";
import { NaverRequestType, NaverResponseResult } from "~/common/types";
import { PARAM_ALEADY_USER, PARAM_NOT_SAVED_USER } from "~/common/constant";
import { Session } from "next-auth";
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
  const searchParams = useSearchParams();
  const { showSnackbar } = useSnackbar();

  const saveKeyword = api.analysis.saveKeyword.useMutation({
    onSuccess: async () => {
      await utils.analysis.getKeywordList.invalidate();
      await utils.analysis.getKeywordList.refetch();
    },
    onError: async (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    const intent = searchParams.get("intent");
    console.log("intent:", intent);
    if (intent === PARAM_ALEADY_USER) {
      const email = searchParams.get("email");
      showSnackbar(`${email} 는 이미 가입되어 있습니다.`, "error");
    } else if (intent === PARAM_NOT_SAVED_USER) {
      showSnackbar("회원가입을 먼저 진행해 주세요", "error");
    }
  }, []);

  const search = async (requestData: NaverRequestType) => {
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
      <InputSearch search={search} keyword={searchWord} />
      
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
