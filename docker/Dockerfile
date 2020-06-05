# ビルド環境
FROM node:13 as build-stage
ENV VUE_APP_API_ENDPOINT http://localhost:8081
ENV VUE_APP_LOGIN_EMAIL create_check123400000@local.tat
ENV VUE_APP_LOGIN_PASSWORD snd1231abc

ARG CLOUDINARY_API_KEY
ARG CLOUD_NAME
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
COPY nginx_config/front.conf /etc/nginx/conf.d/front.conf

EXPOSE 80

