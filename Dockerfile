# Dockerfile

# Используем официальный образ Node.js
FROM node:18.15

COPY .env /usr/src/app/
# Устанавливаем зависимости из общих файлов package*.json
COPY package*.json ./
RUN npm install

# Копируем общий код в контейнер
COPY . .

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# CMD команда будет указана в docker-compose.yml
