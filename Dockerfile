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
RUN npm install

##### BUILDER
# builder : deps 에서 Node 모듈 폴더를 복사하고 모든 프로젝트 폴더와 파일을 복사한 후 프로덕션을 위한 애플리케이션을 빌드한다.
# SKIP_ENV_VALIDATION=1 >> ENV 파일안쓰려고.
FROM --platform=linux/amd64 node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build the application using npm
RUN \
    if [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm ci; \
    else echo "package-lock.json not found." && exit 1; \
    fi
RUN npm run build
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
COPY .env .env
EXPOSE 3000
ENV PORT 3000

CMD ["server.js"]