FROM node:18

# Instala FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

# Copia código do worker e schema do Prisma
COPY worker/package*.json ./
COPY prisma/ ../prisma/ 
COPY worker/src/ ./src/

# Instala dependências e gera client do Prisma
RUN npm install
RUN npx prisma generate

CMD ["npm", "run", "start:worker"]