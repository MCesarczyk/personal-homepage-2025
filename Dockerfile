###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:lts-bookworm-slim AS development
RUN npm install -g npm && npm install --g pnpm

WORKDIR /usr/src/app

ARG ENV
ARG DATABASE_URL
ARG PORT
ARG JWT_SECRET
ARG PUBLIC_URL

ENV ENV=$ENV
ENV DATABASE_URL=$DATABASE_URL
ENV PORT=$PORT
ENV JWT_SECRET=$JWT_SECRET
ENV PUBLIC_URL=$PUBLIC_URL

COPY --chown=node:node pnpm-lock.yaml ./
RUN pnpm fetch --prod

COPY --chown=node:node . .
RUN pnpm install
RUN chown -R node:node /usr/src/app

USER node

COPY --chown=node:node startup.sh ./startup.sh
RUN chmod +x ./startup.sh

EXPOSE 5000

CMD [ "./startup.sh", "pnpm", "start" ]

###################
# BUILD FOR PRODUCTION
###################

FROM node:lts-bookworm-slim AS build
RUN npm install -g pnpm

WORKDIR /usr/src/app

# COPY --chown=node:node pnpm-lock.yaml .env ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN pnpm build

ENV NODE_ENV=production
RUN pnpm install --offline --prod

USER node

###################
# PRODUCTION
###################

FROM node:23.11.0-alpine3.21 AS production
# FROM node:22.12.0 AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
# COPY --chown=node:node --from=development /usr/src/app/prisma ./prisma

# ARG ENV
# ARG DATABASE_URL
# ARG PORT
# ARG JWT_SECRET
# ARG PRODUCTION_URL
# ARG PUBLIC_URL

# ENV ENV=$ENV
# ENV DATABASE_URL=$DATABASE_URL
# ENV PORT=$PORT
# ENV JWT_SECRET=$JWT_SECRET
# ENV PRODUCTION_URL=$PRODUCTION_URL
# ENV PUBLIC_URL=$PUBLIC_URL

EXPOSE 5000

CMD [ "node", "dist/main.js" ]
