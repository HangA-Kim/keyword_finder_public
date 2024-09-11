##### DEPENDENCIES
# deps : 노드 종속성을 설치한다.
FROM --platform=linux/amd64 node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
# Install Prisma Client - remove if not using Prisma
COPY prisma ./
# Install dependencies based on the preferred package manager (npm only)
COPY package.json package-lock.json* ./
RUN \
    if [ -f package-lock.json ]; then npm ci; \
    else echo "Lockfile not found." && exit 1; \
    fi
##### BUILDER
# builder : deps 에서 Node 모듈 폴더를 복사하고 모든 프로젝트 폴더와 파일을 복사한 후 프로덕션을 위한 애플리케이션을 빌드한다.
# SKIP_ENV_VALIDATION=1 >> ENV 파일안쓰려고.
FROM --platform=linux/amd64 node:20-alpine AS builder
# env 파일에서 가져오므로 주석처리
# ARG DATABASE_URL
# ARG GOOGLE_CLIENT_ID
# ARG GOOGLE_CLIENT_SECRET
# ARG NAVER_ID
# ARG NAVER_SECRET
# ARG NEXTAUTH_URL
# ARG NEXTAUTH_SECRET
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build the application using npm
RUN \
    if [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm ci; \
    else echo "package-lock.json not found." && exit 1; \
    fi
##### RUNNER
# runner : 사용자와 그룹을 정의하고 사용자를 모든 파일의 소유자로 설정한다. 루트사용자로 이미지를 실행하는 것을 방지
FROM --platform=linux/amd64 gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 80
ENV PORT 3000
# ENV HOSTNAME="0.0.0.0"
CMD ["/app/.next/standalone/server.js"]

## 0911 ADD
# # nginx 이미지
# FROM nginx:1.23-alpine AS runner
# # nginx 디폴트 접근 파일 설정
# WORKDIR /usr/share/nginx/html
# # 기존 도커 컨테이너 삭제
# RUN rm -rf *
# # nginx 디렉토리에 리엑트 빌드 파일 복사
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# # COPY --from=build /app/build .
# # nginx 포트 설정
# # EXPOSE 80
# # nginx 실행 할 때 데몬 실행 기능 끔
# # ENTRYPOINT ["nginx", "-g", "daemon off;"]
# EXPOSE 80
# # ENV PORT 3000

# CMD ["server.js"]