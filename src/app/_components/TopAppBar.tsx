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
import type { Session } from "next-auth";

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

  return (
    <>
      {pathName === "/errAuth" ? (
        <></>
      ) : (
        <Box sx={{
          position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1200, // MUI의 기본 zIndex 값
        }}>
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
        </Box>
      )}
    </>
  );
}
export default TopAppBar;
