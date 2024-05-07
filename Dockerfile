FROM node:alpine 
WORKDIR /usr/src/app
COPY package*.json .
#   catinious intergration 
RUN npm ci
COPY . .
CMD ["npm","start"]


