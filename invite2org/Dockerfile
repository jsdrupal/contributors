FROM node:lts

RUN mkdir /app
WORKDIR /app

COPY yarn.lock package.json /app/

RUN yarn install
COPY . /app/

ENTRYPOINT ["npm", "run", "action"]