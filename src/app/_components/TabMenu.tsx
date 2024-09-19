"use client";
import { Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import RecommendIcon from "@mui/icons-material/Recommend";
import BarChartIcon from "@mui/icons-material/BarChart";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabMenu = () => {
  const pathName = usePathname();
  console.log(pathName);
  const [selectedTab, setSelectedTab] = React.useState("ans");

  React.useEffect(() => {
    setSelectedTab(pathName === "/reco" ? "reco" : "ans");
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    // console.log("newValue", newValue);
    setSelectedTab(newValue);
  };
  return (
    <Tabs
      value={selectedTab}
      onChange={handleChange}
      textColor="inherit"
      indicatorColor="secondary"
      centered
      sx={{
        width: { xs: "100%", sm: "auto" }, // 모바일에서 가로 꽉 채우기, PC에서는 자동 너비
      }}
    >
      <Tab
        value="ans"
        label={
          <Link href="/">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              키워드 분석
            </Typography>
          </Link>
        }
        icon={<BarChartIcon />}
        iconPosition="start"
      />
      <Tab
        value="reco"
        label={
          <Link href="/reco">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              키워드 추천
            </Typography>
          </Link>
        }
        icon={<RecommendIcon />}
        iconPosition="start"
        sx={{ ml: 3 }}
      />
    </Tabs>
  );
};

export default TabMenu;
