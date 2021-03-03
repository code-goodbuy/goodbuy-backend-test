FROM node:12.18-alpine3.12

COPY $PWD /home/node/app

WORKDIR /home/node/app

RUN yarn install --prod;

EXPOSE 1337

CMD ["/bin/sh", "-c", "yarn start"]