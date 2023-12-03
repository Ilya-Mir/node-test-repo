FROM node:18-alpine as build

  # Устанавливаем рабочую директорию
WORKDIR /app

  # Копируем package.json и package-lock.json
COPY package*.json ./

  # Устанавливаем зависимости
RUN npm ci

  # Копируем все файлы проекта
COPY . .

  # Собираем приложение в каталог build
RUN npm run build

  # Этап 2: создаем окончательный образ на основе образа "node:14-alpine"
FROM node:18-alpine

  # Устанавливаем рабочую директорию
WORKDIR /app

  # Копируем зависимости с временного образа ("build")
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules/ ./node_modules/

  # Копируем собранный проект из временного образа
COPY --from=build /app/build/ ./build/

  # Устанавливаем необходимые переменные окружения
ENV NODE_ENV production
ENV PORT 3000

  # Открываем порт 3000 для внешнего использования
EXPOSE 3000

  # Запускаем приложение
CMD ["node", "build/index.js"]
