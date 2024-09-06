"use client";

import React from "react";
import {
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  MenuItem,
  Box,
  Select,
  FormControlLabel,
} from "@mui/material";
import { type Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DetailSearchProps {
  startDate: Dayjs;
  setStartDate(day: Dayjs): void;
  timeUnit: string;
  setTimeUnit(timeunit: string): void;
  device: string;
  setDevice(device: string): void;
  gender: string;
  setGender(gender: string): void;
  // ages:string[];
  // setAges(ages:string[]):void;
}
const DetailSearch = (props: DetailSearchProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Select
        value={props.timeUnit}
        onChange={(e) => props.setTimeUnit(e.target.value)}
        sx={{ mr: 2 }}
      >
        <MenuItem value={"date"} selected={true}>
          일간 기준검색
        </MenuItem>
        <MenuItem value={"week"}>주간 기준검색</MenuItem>
        <MenuItem value={"month"}>월간 기준검색</MenuItem>
      </Select>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={["DatePicker"]}
          sx={{ mr: 2, height: "100%" }}
        >
          <DatePicker
            name="date"
            label="검색 시작 날짜"
            defaultValue={props.startDate}
            onChange={(newValue: Dayjs | null) => {
              if (newValue) props.setStartDate(newValue);
            }}
            format="YYYY-MM-DD"
          />
        </DemoContainer>
      </LocalizationProvider>
      <FormControl
        sx={{
          mr: 1,
          pl: 1,
          pr: 1,
        }}
      >
        <FormLabel id="demo-row-radio-buttons-group-label">디바이스</FormLabel>
        <RadioGroup
          row
          value={props.device}
          onChange={(e) => props.setDevice(e.target.value)}
        >
          <FormControlLabel value="pc" control={<Radio />} label="PC" />
          <FormControlLabel value="mo" control={<Radio />} label="모바일" />
        </RadioGroup>
      </FormControl>
      <FormControl
        sx={{
          mr: 2,
          pl: 1,
          pr: 1,
        }}
      >
        <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
        <RadioGroup
          row
          value={props.gender}
          onChange={(e) => props.setGender(e.target.value)}
        >
          <FormControlLabel value="m" control={<Radio />} label="남성" />
          <FormControlLabel value="f" control={<Radio />} label="여성" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default DetailSearch;
