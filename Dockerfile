FROM node:16-alpine3.11
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
CMD ["yarn", "run" ,"start"]
EXPOSE 3000
