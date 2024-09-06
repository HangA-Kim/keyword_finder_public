"use client";

import React, { useEffect } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  FormControl,
  MenuItem,
  Box,
  Select,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import dayjs, { type Dayjs } from "dayjs";
import DetailSearch from "./DetailSearch";
import { NaverRequestType } from "~/common/types";

interface InputSearchProps {
  search(requestData: NaverRequestType): void;
  keyword: string;
}
const InputSearch = (props: InputSearchProps) => {
  console.log("InputSearch:", props.keyword);
  const [engine, setEngine] = React.useState("naver");
  const [inputText, setInputText] = React.useState(props.keyword);
  const [detailSearchCheck, setDetaileSearchCheck] = React.useState(false);

  const [startDate, setStartDate] = React.useState<Dayjs>(
    dayjs().subtract(1, "month")
  );
  const [timeUnit, setTimeUnit] = React.useState("date");
  const [device, setDevice] = React.useState("pc");
  const [gender, setGender] = React.useState("f");
  // const [ages, setAges] = React.useState("5");

  useEffect(() => {
    setInputText(props.keyword);
  }, [props.keyword]);

  const handleChange = (event: SelectChangeEvent) => {
    setEngine(event.target.value);
  };

  const handleSearch = () => {
    console.log("input text ", inputText);
    const requestData: NaverRequestType = {
      searchText: inputText,
      startDate: startDate.format("YYYY-MM-DD"),
      timeUnit,
      device,
      gender,
    };
    if (detailSearchCheck) props.search(requestData);
    else
      props.search({
        ...requestData,
        timeUnit: "date",
        device: "",
        gender: "",
      });
  };
  return (
    <Box sx={{ m: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "center", m: 5 }}>
        <FormControl sx={{ minWidth: 120, mr: 2 }}>
          <Select value={engine} onChange={handleChange}>
            <MenuItem value={"naver"} selected={true}>
              NAVER
            </MenuItem>
            <MenuItem value={"google"}>GOOGLE</MenuItem>
          </Select>
        </FormControl>
        <Paper
          variant="outlined"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 500,
            mr: 2,
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
        <FormControlLabel
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
};

export default InputSearch;
