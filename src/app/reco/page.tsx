import React from "react";
import Box from "@mui/material/Box";
import MainReco from "./MainReco";
import { getServerAuthSession } from "~/server/auth";
import FailLogin from "./FailLogin";

const KeywordReco = async () => {
  const session = await getServerAuthSession();
  return (
    <Box sx={{ alignContent: "center", width: "100%" }}>
      {session ? <MainReco /> : <FailLogin />}
    </Box>
  );
};

export default KeywordReco;
