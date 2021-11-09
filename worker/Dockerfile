FROM node:alpine
WORKDIR "/worker"
COPY ./package.json ./
RUN npm install
COPY . . 
CMD ["npm","start"]