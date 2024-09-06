import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import styles from "./index.module.css";
import KeywordAns from "./KeywordAns";
import { Stack, Typography } from "@mui/material";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  session && void api.analysis.getKeywordList.prefetch();

  return (
    <HydrateClient>
      <main className={styles.main}>
        <div className={styles.container}>
          <Stack direction="row">
            <Typography variant="h4" color="primary" fontWeight={"bold"}>
              키워드의 검색
            </Typography>
            <Typography variant="h4" color="secondary" fontWeight={"bold"}>
              비율
            </Typography>
            <Typography variant="h4" color="primary" fontWeight={"bold"}>
              은 얼마나 될까?
            </Typography>
          </Stack>
          <KeywordAns session={session} />
        </div>
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
      </main>
    </HydrateClient>
  );
}
