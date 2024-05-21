FROM node:21

WORKDIR /proynodjs
COPY package*.json ./
RUN npm install
EXPOSE 4000
COPY . .
CMD [npm start]