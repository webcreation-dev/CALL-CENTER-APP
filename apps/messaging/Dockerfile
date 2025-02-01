FROM node:18 as development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# Définir NODE_OPTIONS pour ignorer les warnings pendant le build
ENV NODE_OPTIONS="--no-warnings"

RUN npm install -g pnpm

RUN pnpm install

COPY apps/messaging apps/messaging
COPY libs libs

RUN pnpm build messaging

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/messaging/src/main"]