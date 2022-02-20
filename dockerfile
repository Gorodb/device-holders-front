FROM node:16.2-alpine
ARG APP_DIR=/apt/app/device-mon-frontend
EXPOSE 4000:4000

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY . $APP_DIR
ENV NODE_PATH /usr/lib/node_modules
RUN yarn
RUN yarn build
RUN npm prune --production
RUN chmod -Rf 777 .
CMD ["yarn","start"]
