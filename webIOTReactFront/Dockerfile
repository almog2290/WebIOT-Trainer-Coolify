FROM node:16-alpine as builder

## Create app directory
WORKDIR /usr/src/app

## Copy package.json and package-lock.json
COPY ./package.json ./
COPY  ./package-lock.json ./

## Install dependencies
RUN npm install 

## Copy all files
COPY . .

RUN npm run build

## move build folder to nginx server
FROM nginx:latest

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html