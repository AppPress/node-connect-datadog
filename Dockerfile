FROM node:10.15-slim
RUN apt-get update && apt-get install -y git

WORKDIR /app

ADD package.json yarn.lock .npmrc ./
RUN yarn install

ADD . .

WORKDIR /app

RUN git config user.name 'Jenkins'
RUN git config user.email 'jenkins@acuris.com'

ENTRYPOINT ["sh", "/app/publish.sh"]
