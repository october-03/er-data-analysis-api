FROM node:18.17.1-alpine3.18 As development

WORKDIR /usr/src/app

RUN npm i -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm i --only=development

COPY . .

RUN pnpm run build

FROM node:18.17.1-alpine3.18 As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

RUN npm i -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm i --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/main"]