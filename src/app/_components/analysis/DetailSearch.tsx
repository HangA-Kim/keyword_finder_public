"use client";

import React, { Component } from "react";
import {
  Box,
} from "@mui/material";
import { type Dayjs } from "dayjs";
import DefaultWithMobile from "../select/SelectDefaultWithMobile";
import SelectDate from "../date/SelectDate";
import RadioButtons from "../radio/RadioButtons";

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
export class DetailSearch extends Component<DetailSearchProps> {
  render() {
    const menuItems = [
      { value: "date", label: "일간 기준검색" },
      { value: "week", label: "주간 기준검색" },
      { value: "month", label: "월간 기준검색" },
    ];
  
    const deviceRadioArray = [
      {value: "pc", label: "PC"},
      {value: "mo", label: "모바일"}
    ]
  
    const genderRadioArray = [
      {value: "m", label: "남성"},
      {value: "f", label: "여성"}
    ]

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
          <DefaultWithMobile defaltValue={this.props.timeUnit} setValue={this.props.setTimeUnit} menuItems={menuItems} />
          <SelectDate startDate={this.props.startDate} setStartDate={this.props.setStartDate}/>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "row" }, // 모바일과 PC 모두 가로로 배치
            gap: 2, // 컴포넌트 간의 간격 설정
            justifyContent: "center", // 가로 가운데 정렬
          }}
        >
          <RadioButtons label={'디바이스'} radioArray={deviceRadioArray} value={this.props.device} onChange={this.props.setDevice}/>
          <RadioButtons label={'성별'} radioArray={genderRadioArray} value={this.props.gender} onChange={this.props.setGender}/>
        </Box>
      </Box>
    );
  }
};

export default DetailSearch;
