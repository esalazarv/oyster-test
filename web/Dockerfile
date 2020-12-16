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
# TODO: implement astage for build a production distribution