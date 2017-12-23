FROM node:latest

ENV IP 0.0.0.0
ENV PORT 3000
ENV NODE_ENV production
ENV MONGO_URI mongodb://localhost/website
ENV COOKIE_SECRET change_me
ENV CLOUDINARY_CONIFG change_me_too

EXPOSE 3000

WORKDIR /app
COPY . /app

RUN ["npm", "install", "--production"]

CMD ["node", "keystone"]
