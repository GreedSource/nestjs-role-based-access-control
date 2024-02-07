FROM node:20.5-alpine3.17 as production

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn build

# Expose the port your NestJS app is running on
EXPOSE 3337

# Start the server using the production build
CMD yarn migration:run ; yarn start:prod