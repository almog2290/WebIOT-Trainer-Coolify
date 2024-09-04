FROM node:16-alpine as builder

## Create app directory
WORKDIR /usr/src/app

## Copy package.json and package-lock.json
COPY ./package.json ./
COPY ./package-lock.json ./

## Install dependencies
RUN npm install

## Copy all files
COPY . .

RUN npm run build

## move build folder to caddy server
FROM caddy:latest

## Copy Caddyfile
COPY ./Caddyfile /etc/caddy/Caddyfile

## Copy build folder to Caddy's web root
COPY --from=builder /usr/src/app/build /usr/share/caddy

## Expose port 3000
EXPOSE 3000