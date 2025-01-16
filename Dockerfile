FROM node:20-alpine

RUN mkdir -p /home/node/porchlight/node_modules && chown -R node:node /home/node/porchlight
WORKDIR /home/node/porchlight

USER node

COPY --chown=node:node package*.json ./
RUN npm install --omit=dev

COPY --chown=node:node app.js ./

CMD ["node", "app.js"]