FROM node:16.14.2-alpine

# vi tri thu muc
WORKDIR /app

COPY /package.json ./

RUN yarn

RUN npm install -g @angular/cli

# cau lenh run

# coppy source
COPY . .

EXPOSE 4200

CMD [ "yarn", "start" ]
