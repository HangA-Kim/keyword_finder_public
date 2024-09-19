"use client";

import * as React from "react";
import {
  Typography,
  Stack,
  AppBar,
  Container,
  Toolbar,
  Box,
} from "@mui/material";
import { Session } from "next-auth";

import LogoutState from "./auth/LogoutState";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { usePathname } from "next/navigation";
import LoginState from "./auth/LoginState";
import TabMenu from "./TabMenu";
import MobileLoginState from "./auth/MobileLoginState";
import MobileLogoutState from "./auth/MobileLogoutState";

interface TopAppBarProps {
  session: Session | null;
}
function TopAppBar({ session }: TopAppBarProps) {
  const pathName = usePathname();
  console.log(pathName);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const pages = ["키워드 분석", "키워드 추천"];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      {pathName === "/errAuth" ? (
        <></>
      ) : (
        <>
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <LocationSearchingIcon sx={{ mr: 1 }} />
                <Typography
                  variant="h5"
                  fontWeight={"bold"}
                  component="a"
                  href="/"
                  color="#f6dba6"
                  sx={{ ml: 2 }}
                >
                  KEYWORD FINDER
                </Typography>
                <Box sx={{ display: { md: "none", sx: "flex" }, ml: "auto" }}>
                  {session ? (
                    <MobileLoginState imgPath={session.user.image} />
                  ) : (
                    <MobileLogoutState />
                  )}
                </Box>

                <Stack
                  direction="row"
                  spacing={2}
                  flexGrow={1}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    ml: 2,
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  <div></div>
                  <TabMenu />
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
              </Toolbar>
            </Container>
            {/* <Container>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <TabMenu />
              </Box>
            </Container> */}
          </AppBar>
        </>
      )}
    </>
  );
}
export default TopAppBar;
