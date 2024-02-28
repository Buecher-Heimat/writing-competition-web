FROM node:20.11.1 as build

WORKDIR /app

ARG VITE_BACKEND_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM alpine:3.12

RUN apk update && apk add nginx && rm -rf /var/cache/apk/*

ADD src /var/www/html
ADD nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /var/www/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;pid /tmp/nginx.pid;"]
