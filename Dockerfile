##### DEPENDENCIES
# deps : 노드 종속성을 설치한다.
FROM --platform=linux/amd64 node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY prisma ./
COPY package.json package-lock.json* ./
# Use npm ci if package-lock.json exists, otherwise use npm install
RUN \
    if [ -f package-lock.json ]; then npm ci; \
    else echo "Lockfile not found." && exit 1; \
    fi

##### BUILDER
# builder : deps 에서 Node 모듈 폴더를 복사하고 모든 프로젝트 폴더와 파일을 복사한 후 프로덕션을 위한 애플리케이션을 빌드한다.
FROM --platform=linux/amd64 node:20-alpine AS builder
ARG DATABASE_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG NAVER_ID
ARG NAVER_SECRET
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build the application using npm
RUN npx next telemetry disable
# RUN npm run build
RUN \
    if [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
    else echo "package-lock.json not found." && exit 1; \
    fi

##### RUNNER
# runner : 사용자와 그룹을 정의하고 사용자를 모든 파일의 소유자로 설정한다. 루트사용자로 이미지를 실행하는 것을 방지
# FROM --platform=linux/amd64 gcr.io/distroless/nodejs20-debian12 AS runner
# WORKDIR /app
# ENV NODE_ENV production

FROM nginx:1.23-alpine AS runner

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# nginx 디폴트 접근 파일 설정
WORKDIR /usr/share/nginx/html
# 기존 도커 컨테이너 삭제
# RUN rm -rf *

# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# RUN next build
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
# nginx 실행 할 때 데몬 실행 기능 끔
ENTRYPOINT ["nginx", "-g", "daemon off;"]
# ENV PORT 3000

# CMD ["server.js"]
CMD ["npm", "start"]
