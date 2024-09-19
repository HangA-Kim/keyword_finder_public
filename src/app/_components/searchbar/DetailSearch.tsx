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
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // 모바일에서는 세로, PC에서는 가로
        alignItems: { xs: "flex-start", sm: "center" }, // 모바일에서는 위쪽 정렬, PC에서는 가운데 정렬
        justifyContent: { xs: "flex-start", sm: "center" }, // 모바일에서는 왼쪽 정렬, PC에서는 가운데 정렬
        gap: 2, // 컴포넌트 간의 간격 설정
        px: { sm: 2 }, // PC 화면에서 좌우 패딩 추가
        mt: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // 모바일과 PC 모두 가로로 배치
          gap: {xs:1, sm:2}, // 컴포넌트 간의 간격 설정
          mb: { xs: 2, sm: 0 }, // 모바일에서 아래 여백 추가
          justifyContent: "center", // 가로 가운데 정렬
          alignContent: "center",
        }}
      >
        <Select
          value={props.timeUnit}
          onChange={(e) => props.setTimeUnit(e.target.value)}
          sx={{
            mr: { sm: 2 },
          }}
        >
          <MenuItem value={"date"} selected={true}>
            일간 기준검색
          </MenuItem>
          <MenuItem value={"week"}>주간 기준검색</MenuItem>
          <MenuItem value={"month"}>월간 기준검색</MenuItem>
        </Select>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
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
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "row" }, // 모바일과 PC 모두 가로로 배치
          gap: 2, // 컴포넌트 간의 간격 설정
          justifyContent: "center", // 가로 가운데 정렬
        }}
      >
        <FormControl
          sx={{
            mr: { sm: 1 }, // PC에서 오른쪽 여백 추가
            pl: 1,
            pr: 1,
          }}
        >
          <FormLabel id="demo-row-radio-buttons-group-label">
            디바이스
          </FormLabel>
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
            mr: { sm: 2 }, // PC에서 오른쪽 여백 추가
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
    </Box>
  );
};

export default DetailSearch;
