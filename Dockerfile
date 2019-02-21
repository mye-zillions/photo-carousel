FROM node:7.6-alpine
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN npm install
RUN npm run build-production
EXPOSE 80
CMD ["npm", "run", "start-production"] 