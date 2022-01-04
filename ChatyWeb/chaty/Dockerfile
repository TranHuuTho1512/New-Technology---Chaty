FROM node:latest
WORKDIR /chaty
COPY package.json /chaty
RUN npm install
COPY . /chaty
EXPOSE 5000
CMD [ "npm","start" ]