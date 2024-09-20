import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import KeywordAns from "./KeywordAns";
import { Card, CardContent, Typography } from "@mui/material";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  if (session) {
    await api.analysis.getKeywordList.prefetch();
  }

  return (
    <HydrateClient>
      <Card
        sx={{ boxShadow: "none", justifyItems: "center", paddingTop: "10px" }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            color="primary"
            fontWeight={"bold"}
            sx={{ display: { xs: "inherit", md: "none" } }}
          >
            키워드의 검색 비율은 얼마나 될까?
          </Typography>
          <Typography
            variant="h4"
            color="primary"
            fontWeight={"bold"}
            sx={{ display: { xs: "none", md: "inherit" } }}
          >
            키워드의 검색 비율은 얼마나 될까?
          </Typography>
        </CardContent>
      </Card>
      {/* <Stack direction="row" sx={{ justifyContent: "center", mt: 5 }}>
        <Typography variant="h4" color="primary" fontWeight={"bold"}>
          키워드의 검색
        </Typography>
        <Typography variant="h4" color="secondary" fontWeight={"bold"}>
          비율
        </Typography>
        <Typography variant="h4" color="primary" fontWeight={"bold"}>
          은 얼마나 될까?
        </Typography>
      </Stack> */}
      <KeywordAns session={session} />
      {/* 
          <div className={styles.showcaseContainer}>
            <p className={styles.showcaseText}>
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>

            <div className={styles.authContainer}>
              <p className={styles.showcaseText}>
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className={styles.loginButton}
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>

          {session?.user && <LatestPost />}
        </div> */}
    </HydrateClient>
  );
}
