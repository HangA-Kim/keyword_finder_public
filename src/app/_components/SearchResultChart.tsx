"use client";

import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { NaverResponseData } from "~/common/types";
import { Box } from "@mui/material";

interface SearchResultChartProps {
  searchData: NaverResponseData[];
}

const SearchResultChart = ({ searchData }: SearchResultChartProps) => {
  // console.log(typeof searchData);
  // console.log(searchData);
  // searchData.map((data, idx) => {
  //   console.log("[", idx, "]", data);
  // });
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 0,
        paddingTop: "45%", // 16:9 비율을 유지하고 싶다면 padding-top을 56.25%로 설정
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {searchData ? (
          // <p>call</p>
          <BarChart
            borderRadius={10}
            dataset={searchData as []}
            xAxis={[{ scaleType: "band", dataKey: "period" }]}
            series={[{ dataKey: "ratio", label: "비율" }]}
            grid={{ horizontal: true }}
          />
        ) : (
          "not data"
        )}
      </Box>
    </Box>
  );
};

export default SearchResultChart;
