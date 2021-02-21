FROM node:lts-buster as build

ARG REACT_APP_OKTA_CLIENT_ID
ARG REACT_APP_OKTA_DOMAIN
ARG REACT_APP_API_URL
ARG REACT_APP_UPLOADS_URL

ENV REACT_APP_OKTA_CLIENT_ID=$REACT_APP_OKTA_CLIENT_ID
ENV REACT_APP_OKTA_DOMAIN=$REACT_APP_OKTA_DOMAIN
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_UPLOADS_URL=$REACT_APP_UPLOADS_URL

WORKDIR /app
COPY . /app
ENV PATH /app/node_modules/.bin:$PATH
RUN yarn
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
