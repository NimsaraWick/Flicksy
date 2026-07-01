FROM node:latest  

WORKDIR /app 

COPY backend ./backend/ 
COPY package*.json ./
COPY package-lock.json ./

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["npm","start"]

