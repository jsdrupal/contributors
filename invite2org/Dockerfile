# Container image that runs your code
FROM node:lts

# Copies your code file from your action repository to the filesystem path `/` of the container

WORKDIR  /github/workspace/invite2org

RUN yarn install

ENTRYPOINT ["npm", "run", "action"]