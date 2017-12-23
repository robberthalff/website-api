FROM node:latest

ENV IP 0.0.0.0
ENV PORT 3000
ENV NODE_ENV production
ENV MONGO_URI mongodb://localhost/website

EXPOSE 3000

WORKDIR /app
COPY . /app

RUN ["npm", "install", "--production"]

CMD ["node", "keystone"]
