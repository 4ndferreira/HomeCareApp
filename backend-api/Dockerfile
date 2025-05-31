FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run tsoa:gen
RUN yarn run build

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "--no-warnings=ExperimentalWarning", "dist/src/server.js"]