"use client";

import React, { Component, useEffect } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import dayjs, { type Dayjs } from "dayjs";
import DetailSearch from "./DetailSearch";
import type { NaverRequestType } from "~/common/types";


interface InputSearchProps {
  search(requestData: NaverRequestType): void;
  keyword: string;
}
export class InputSearch extends Component<InputSearchProps> {
  render() {
      
    const [inputText, setInputText] = React.useState(this.props.keyword);
    const [detailSearchCheck, setDetaileSearchCheck] = React.useState(false);

    const [startDate, setStartDate] = React.useState<Dayjs>(
      dayjs().subtract(1, "month")
    );
    const [timeUnit, setTimeUnit] = React.useState("date");
    const [device, setDevice] = React.useState("pc");
    const [gender, setGender] = React.useState("f");
    // const [ages, setAges] = React.useState("5");


    useEffect(() => {
      setInputText(this.props.keyword);
    }, [this.props.keyword]);

    const handleSearch = () => {
      console.log("input text ", inputText);
      const requestData: NaverRequestType = {
        searchText: inputText,
        startDate: startDate.format("YYYY-MM-DD"),
        timeUnit,
        device,
        gender,
      };
      if (detailSearchCheck) this.props.search(requestData);
      else
        this.props.search({
          ...requestData,
          timeUnit: "date",
          device: "",
          gender: "",
        });
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
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "row" }, // 모바일: Select와 Paper 가로로 배치
              justifyContent: { xs: "space-between", sm: "flex-start" }, // 모바일: 양 끝 정렬
              width: { xs: "100%", sm: "auto" }, // 모바일: 가로 100%
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
                placeholder="Search Keyword"
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

          <FormControlLabel
            sx={{ mt: { xs: 2, sm: 0 } }} // 모바일: 위쪽 여백
            control={
              <Checkbox
                checked={detailSearchCheck}
                onChange={(e) => setDetaileSearchCheck(e.target.checked)}
              />
            }
            label="상세검색"
          />
        </Box>
        {detailSearchCheck && (
          <DetailSearch
            startDate={startDate}
            setStartDate={setStartDate}
            timeUnit={timeUnit}
            setTimeUnit={setTimeUnit}
            device={device}
            setDevice={setDevice}
            gender={gender}
            setGender={setGender}
          />
        )}
      </Box>
    );
  }
};

export default InputSearch;
