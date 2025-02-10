FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma/ ./prisma/

RUN yarn install && \
  mkdir -p node_modules/.prisma/client && \
  chmod -R 777 node_modules/.prisma/client \
  npx prisma generate

COPY src/ ./src/

USER node

EXPOSE 3000

CMD ["yarn", "start"]