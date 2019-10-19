FROM node:10

RUN mkdir /app
RUN npm install -g nodemon

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "run dev"]
