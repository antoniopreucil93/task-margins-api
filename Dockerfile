FROM node:16.15.0

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run tsc

EXPOSE 3000

CMD ./run/run.sh && npm run start