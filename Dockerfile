FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma/ ./prisma/

RUN npm install
RUN npx prisma generate

COPY src/ ./src/

EXPOSE 3000

CMD ["npm", "run", "start"]