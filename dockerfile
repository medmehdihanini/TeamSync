FROM node:18-alpine

WORKDIR ./

COPY package*.json ./

COPY .env ./.env

RUN npm i --legacy-peer-deps

COPY . .

RUN npm run build

ENV  EMAIL_CONFIRMATION_URL=https://30d9-196-178-186-0.ngrok-free.app/auth/confirm

EXPOSE 3000

CMD ["npm", "start"]
