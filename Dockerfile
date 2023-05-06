# FROM arm64v8/node:16-alpine
FROM node:16-alpine

ARG WORKDIR

EXPOSE 3000
ENV HOST 0.0.0.0 \
    HOME=/${WORKDIR}

WORKDIR /front

RUN apk update && \
    apk add --no-cache python3 make g++ && \
    apk add git

COPY . ./