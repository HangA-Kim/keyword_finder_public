import React from "react";
import Box from "@mui/material/Box";
import MainRecommand from "./MainRecommand";
import { getServerAuthSession } from "~/server/auth";
import FailLogin from "./FailLogin";

const KeywordReco = async () => {
  const session = await getServerAuthSession();
  return (
    <Box sx={{ alignContent: "center", width: "100%" }}>
      {/* {session ? <MainRecommand /> : <FailLogin />} */}
      {/* <GoogleRecommand/> */}
      <MainRecommand/>
    </Box>
  );
};

export default KeywordReco;
