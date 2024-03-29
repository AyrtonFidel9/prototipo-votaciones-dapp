FROM node:18-alpine3.16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+) and yarn.lock because we are using yarn
COPY package*.json yarn.lock ./


ENV DATABASE_USER=postgres
ENV DATABASE_PASSWORD=postgres
ENV DATABASE_URL=localhost
ENV DATABASE_NAME=vote-coac
ENV SECRET_KEY_DATABASE=
ENV SECRET_KEY_PASSWORD=key-caycne-189321

RUN apk add --no-cache git

# Run yarn without generating a yarn.lock file
RUN yarn --pure-lockfile

# Bundle app source
COPY . .

# Use the port used by our server.js configuration
EXPOSE 8080

# This will run `yarn start` when the docker image is ran
CMD [ "yarn", "start" ]