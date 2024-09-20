import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import type { AdapterUser, Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";

import { env } from "~/env";
import { db } from "~/server/db";

import { type Account, type User } from "next-auth";
import { cookies } from "next/headers";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {
  AUTH_INTENT,
  INTENT_LOGIN,
  INTENT_SIGNUP,
  PARAM_ALEADY_USER,
  PARAM_NOT_SAVED_USER,
} from "~/common/constant";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: User | AdapterUser;
      account: Account | null;
    }): Promise<boolean | string> {
      console.log("user", user);
      console.log("account", account);
      const cookieStore = cookies();
      const authIntent: RequestCookie | undefined =
        cookieStore.get(AUTH_INTENT);
      const intent = authIntent?.value ?? INTENT_LOGIN;
      if (account === null) return false;
      if (account.provider === "google") {
        if (intent === INTENT_LOGIN) {
          if (user.id === account.providerAccountId)
            // db 에 저장된 사용자가 없을 경우
            return Promise.resolve("/errAuth?intent=" + PARAM_NOT_SAVED_USER);
          else return true;
        } else if (intent === INTENT_SIGNUP) {
          if (user.id === account.providerAccountId) return true;
          else
            return Promise.resolve(
              `/errAuth?intent=${PARAM_ALEADY_USER}&email=${user.email}`
            );
        }
      }
      return false; // true 만 정상
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
