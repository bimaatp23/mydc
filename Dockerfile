FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN echo "DB_HOST=$DB_HOST" > .env \
    && echo "DB_PORT=$DB_PORT" >> .env \
    && echo "DB_USER=$DB_USER" >> .env \
    && echo "DB_PASSWORD=$DB_PASSWORD" >> .env \
    && echo "DB_NAME=$DB_NAME" >> .env

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]