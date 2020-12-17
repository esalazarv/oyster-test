FROM node:lts-alpine as base
WORKDIR /var/www/html
RUN npm i -g @nestjs/cli
COPY . .

# For development stage
FROM node:lts-alpine as development
WORKDIR /var/www/html
COPY --from=base /var/www/html /var/www/html/
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start:dev"]

# For build stage
FROM node:lts-alpine as production
WORKDIR /var/www/html
COPY . .
RUN npm install
RUN npm run build
ENV APP_PORT=80
EXPOSE $APP_PORT
ENTRYPOINT ["npm" ,"run", "start:prod"]