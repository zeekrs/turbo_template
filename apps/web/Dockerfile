FROM node:20-alpine AS base 
ENV CI=true
ENV PNPM_HOME=/usr/local/bin
# Install dependencies only when needed
FROM base AS builder
RUN corepack enable pnpm
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

RUN pnpm add -g turbo

COPY . .

RUN turbo prune web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN corepack enable pnpm
RUN apk update
RUN apk add --no-cache libc6-compat git
WORKDIR /app
# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install --ignore-scripts

# Build the project
COPY --from=builder /app/out/full/ .

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN
#
RUN pnpm turbo build

FROM base AS runner
WORKDIR /app


# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


RUN echo '#!/bin/sh' > /app/start.sh && \
  echo 'if [ -z "$DATABASE_URL" ]; then' >> /app/start.sh && \
  echo '  echo "Error: DATABASE_URL environment variable is not set"' >> /app/start.sh && \
  echo '  exit 1' >> /app/start.sh && \
  echo 'fi' >> /app/start.sh && \
  echo 'npx prisma migrate deploy && node apps/web/server.js' >> /app/start.sh && \
  chmod +x /app/start.sh && \
  chown nextjs:nodejs /app/start.sh


USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# run prisma deploy
COPY --from=installer --chown=nextjs:nodejs /app/packages/database/generated ./packages/database/generated
COPY --from=installer --chown=nextjs:nodejs /app/packages/database/prisma ./prisma



EXPOSE 3000
ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"

CMD ["/app/start.sh"]
