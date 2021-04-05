FROM node:lts-buster as build

ARG REACT_APP_UPLOADS_URL
ARG ROBOTS_DISALLOW

ENV REACT_APP_UPLOADS_URL=$REACT_APP_UPLOADS_URL

WORKDIR /app
COPY . /app

# Append a disallow rule to robots.txt to prevent indexing uploads
ENV ROBOTS_DISALLOW=$ROBOTS_DISALLOW
RUN echo "Disallow: $ROBOTS_DISALLOW" >> /app/public/robots.txt

ENV PATH /app/node_modules/.bin:$PATH
RUN yarn
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
