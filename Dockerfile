FROM node:16.0-alpine3.13

RUN yarn global add nodemon


USER node
# Create app directory
WORKDIR /home/node


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node package.json ./

RUN yarn

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . ./

EXPOSE 3000

# overrite by the docker-compose command
CMD [ "yarn", "dev" ]