# FROM node:18
# RUN apt-get update && apt-get install -y ffmpeg
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# CMD ["npm", "run", "dev"]

FROM node:18

WORKDIR /app

# Copia tudo (API + Prisma)
COPY package*.json ./
COPY prisma/ ./prisma/
COPY src/ ./src/

# Instala dependências e gera client do Prisma
RUN npm install
RUN npx prisma generate

CMD ["npm", "run", "start:api"]