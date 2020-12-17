FROM node:lts-alpine as base
WORKDIR /var/www/html
COPY . .

# For development stage
FROM node:lts-alpine as development
WORKDIR /var/www/html
COPY --from=base /var/www/html /var/www/html/
RUN npm i -g @nestjs/cli && npm install
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start:dev"]

# For build stage
FROM base as build
RUN npm i -g @nestjs/cli
RUN npm run build
ENTRYPOINT ["tail", "-f", "/dev/null"]


# For production stage
FROM node:lts-alpine as production
ENV APP_PORT=80
WORKDIR /var/www/html
COPY --from=build /var/www/html/dist /var/www/html
EXPOSE $APP_PORT
ENTRYPOINT ["npm" ,"run", "start:prod"]