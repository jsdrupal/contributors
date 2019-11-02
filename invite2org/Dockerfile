# Container image that runs your code
FROM node:lts

# Copies your code file from your action repository to the filesystem path `/` of the container
COPY yarn.lock /yarn.lock
COPY package.json /package.json

RUN yarn install
COPY . /

WORKDIR /
ENTRYPOINT ["npm", "run", "action"]