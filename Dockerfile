# Dockerfile

# Используем официальный образ Node.js
FROM node:20.12.1

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y ffmpeg

RUN mkdir -p /usr/src/app/public/resized    

COPY .env /usr/src/app/
# Устанавливаем зависимости из общих файлов package*.json
COPY package*.json ./
RUN npm install

# Копируем общий код в контейнер
COPY . .

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# CMD команда будет указана в docker-compose.yml
