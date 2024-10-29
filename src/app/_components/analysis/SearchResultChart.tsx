"use client";

import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import type { NaverResponseData } from "~/common/types";
import { Box } from "@mui/material";
import { orangeBrown } from "~/styles/colors";

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
        paddingTop: { xs: "70%", sm: "33%" }, // 16:9 비율을 유지하고 싶다면 padding-top을 56.25%로 설정
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "100%", sm: "80%" },
          height: { xs: "100%", sm: "80%" },
        }}
      >
        {searchData ? (
          // <p>call</p>
          <BarChart
            borderRadius={10}
            dataset={searchData as []}
            xAxis={[{ scaleType: "band", dataKey: "period" }]}
            series={[
              {
                dataKey: "ratio",
                label: "검색비율",
                color: orangeBrown,
              },
            ]}
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
