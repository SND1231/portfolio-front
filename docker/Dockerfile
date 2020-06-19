# ビルド環境
FROM node:13 as build-stage
ARG API_ENDPOINT
ARG LOGIN_EMAIL
ARG LOGIN_PASSWORD
ARG CLOUDINARY_API_KEY
ARG CLOUD_NAME

ENV VUE_APP_API_ENDPOINT $API_ENDPOINT
ENV VUE_APP_LOGIN_EMAIL $LOGIN_EMAIL
ENV VUE_APP_LOGIN_PASSWORD $LOGIN_PASSWORD
ENV VUE_APP_CLOUDINARY_API_KEY $CLOUDINARY_API_KEY
ENV VUE_APP_CLOUD_NAME $CLOUD_NAME

WORKDIR /app
COPY ./ramen_project/package*.json ./
RUN npm install
RUN npm run vue -v
COPY ./ramen_project ./
RUN npm run build

# 本番環境
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

