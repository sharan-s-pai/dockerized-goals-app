FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV MONGODB_USERNAME=root
ENV MONGODB_PASS=root

EXPOSE 80

CMD ["npm","start"]
