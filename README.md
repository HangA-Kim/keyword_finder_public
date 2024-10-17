# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

프로젝트 생성 : npm create t3-app@latest
이용 라이브러리 및 언어 : TypeScript, MUI, tRPC, Prisma, Next.js App Router, postgreSQL

## links

- [Prisma](https://prisma.io)
- [prismaModel](https://velog.io/@ltnscp9028/Prisma-Model-%EB%84%8C-%EB%88%84%EA%B5%AC%EB%8B%88)
- [prismaCommand](https://defineall.tistory.com/1052)
- [nextauthjsExm](https://github.com/nextauthjs/next-auth/blob/main/apps/examples/nextjs/auth.ts)
- [nextauthStruct](https://all-dev-kang.tistory.com/entry/Nextjs-NextAuth%EC%99%80-Prisma%EB%A1%9C-%EC%9D%B8%EC%A6%9D-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
- [nextauthCallback](https://next-auth.js.org/configuration/callbacks)
- [nextauthCallbackKor](https://velog.io/@j_wisdom_h/next-auth)

https://datamoney.tistory.com/339
https://yeko90.tistory.com/entry/how-to-use-google-trend-api
https://tagmanager.kr/google-trends-api-data-analysis/
https://github.com/GeneralMills/pytrends

## comment

- npx prisma migrate dev : sql 파일 생성 및 DB 적용
  √ We need to reset the "public" schema at "db경로-aws 의 end point"
  Do you want to continue? All data will be lost. ... yes

√ Enter a name for the new migration: ... key_finder
prisma > migrations > key_finder > migration.sql 생성됨

- next auth 에서 signin 할때 DB 저장이 안된 사용자의 경우
  user {
  id: '0000-0000-0000-0000',
  name: 'HangA Kim',
  email: '---@gmail.com',
  image: '---'
  }

- next auth 에서 signin 할때 DB 저장된 사용자의 경우
  user {
  id: [server id],
  createdAt: 2024-08-27T07:24:53.836Z,
  email: '---@gmail.com',
  name: '---',
  role: 'USER',
  emailVerified: null,
  image: '----',
  updatedAt: 2024-08-27T07:24:53.836Z
  }

## next auth

src > server > auth.ts
NextAuthOptions 에서 pages 설정 ( custom 화면 꾸밀 경우 )
...
pages: {
signIn: '/auth/signin',
signOut: '/auth/signout',
error: '/auth/error', // Error code passed in query string as ?error=
verifyRequest: '/auth/verify-request', // (used for check email message)
newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
}
...

NextAuthOptions 에서 callbacks 설정 (signIn 에서 return 값 수정했음.)
return 값 true 만 성공
false, string 값 리턴 가능 -> string 값으로 url 넘기면 해당 url 로 이동됨.
...
callbacks: {
async signIn({ user, account, profile, email, credentials }) {
return true
},
async redirect({ url, baseUrl }) {
return baseUrl
},
async session({ session, user, token }) {
return session
},
async jwt({ token, user, account, profile, isNewUser }) {
return token
}
...
}

## router

네이버 키워드 조회 부분: src > server > api > routers > analysis.ts

## 속도 느려짐

next.config.js 수정

## 배포방식

1. github source push
2. github > action ( .github/workflows/cicd.yml)
3. docker-compose.yml app & nginx build > push ( ./Dockerfile, ./nginx/Dockerfile )
4. deploy : docker-compose.yml app pull > up
5. 3000 port : app / 80 port : nginx

- output dir : standalone
  nginx 가 80 으로 listen 하고 있고 app 의 3000번으로 프록시 패스 하는 방식임.

## 자동배포환경

- github action
- docker
- aws ubuntu instance

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)
- [docker](https://create.t3.gg/en/deployment/docker)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
