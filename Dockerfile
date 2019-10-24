FROM node:latest
RUN mkdir -p /usr/src/app
LABEL maintainer = "André Luiz Hashiguchi"
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install -g nodemon
RUN yarn install
COPY . /usr/src/app
EXPOSE 3000
CMD ["nodemon", "index.js"]