FROM node:18

RUN mkdir -p /home/node/video-processor/node_modules && chown -R node:node /home/node/video-processor

WORKDIR /home/node/video-processor

COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma/ ./prisma/

USER node

COPY --chown=node:node . .

RUN yarn install && \
  yarn build && \
  npx prisma generate

EXPOSE 3000

CMD ["yarn", "start"]