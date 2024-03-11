###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20.5-alpine3.17  As development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND yarn.lock (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package.json yarn.lock ./

# Install app dependencies
RUN yarn

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:20.5-alpine3.17  As build
WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN yarn --immutable --immutable-cache --check-cache --production

USER node

###################
# PRODUCTION
###################

FROM node:20.5-alpine3.17  As production
# Expose the port your NestJS app is running on
EXPOSE 3337
WORKDIR /usr/src/app

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node package.json ./
COPY --chown=node:node tsconfig.json ./

# Start the server using the production build
CMD yarn migration:show ; yarn migration:run ; yarn start:prod