"use client";

import * as React from "react";
import {
  Tabs,
  Box,
  Tab,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Divider,
  Stack,
  AppBar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { Session } from "next-auth";
import RecommendIcon from "@mui/icons-material/Recommend";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutState from "./auth/LogoutState";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { usePathname } from "next/navigation";
import LoginState from "./auth/LoginState";

interface TopAppBarProps {
  session: Session | null;
}
function TopAppBar({ session }: TopAppBarProps) {
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
    <>
      {pathName === "/errAuth" ? (
        <></>
      ) : (
        <AppBar position="static">
          <Stack
            direction="row"
            spacing={2}
            flexGrow={1}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              ml: 2,
              mr: 2,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <LocationSearchingIcon />
              <Typography
                variant="h5"
                fontWeight={"bold"}
                noWrap
                component="div"
                color="#f6dba6"
                sx={{ ml: 2 }}
              >
                KEYWORD FINDER
              </Typography>
            </Stack>
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="secondary"
              centered
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
            {session ? (
              <LoginState
                name={session.user.name}
                imgPath={session.user.image}
              />
            ) : (
              <LogoutState
                isDark={true}
                isFontLarge={false}
                isOnlyLogin={false}
              />
            )}
          </Stack>
        </AppBar>
      )}
    </>
  );
}
export default TopAppBar;
