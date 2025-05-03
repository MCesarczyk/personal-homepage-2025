###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:23.11.0-bullseye AS development
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
