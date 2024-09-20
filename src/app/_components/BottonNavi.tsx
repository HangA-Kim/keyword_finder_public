"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BarChartIcon from "@mui/icons-material/BarChart";
import RecommendIcon from "@mui/icons-material/Recommend";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const pathName = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    setValue(pathName === "/reco" ? 1 : 0);
  }, [pathName]);

  const handleNavigation = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      router.push("/"); // '키워드 분석' 클릭 시
    } else if (newValue === 1) {
      router.push("/reco"); // '키워드 추천' 클릭 시
    }
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "flex", sm: "none" },
        justifyContent: "center", // 중앙 정렬
        alignItems: "center", // 수직 중앙 정렬
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigation}
        sx={{ width: "100%" }}
      >
        <BottomNavigationAction label="키워드 분석" icon={<BarChartIcon />} />
        <BottomNavigationAction label="키워드 추천" icon={<RecommendIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
