FROM node:lts-alpine as base
WORKDIR /var/www/html
COPY . .

# For development stage
FROM node:lts-alpine as development
WORKDIR /var/www/html
COPY --from=base /var/www/html /var/www/html/
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]

# For production stage
FROM base as build
RUN npm install
RUN npm run build
ENTRYPOINT ["tail", "-f", "/dev/null"]


# For production stage
FROM nginx:alpine as production
ENV APP_PORT=80
WORKDIR /usr/share/nginx/html
COPY --from=build /var/www/html/build /usr/share/nginx/html
EXPOSE $APP_PORT
CMD ["nginx", "-g", "daemon off;"]