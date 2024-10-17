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
RUN \
    if [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
    else echo "package-lock.json not found." && exit 1; \
    fi

##### RUNNER
FROM --platform=linux/amd64 node:20-alpine AS server
WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV NODE_ENV production
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]

