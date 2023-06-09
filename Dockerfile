FROM ghcr.io/puppeteer/puppeteer:20.5.0

WORKDIR /home/pptruser/app

USER root
COPY . ./

RUN chown -R pptruser:pptruser /home/pptruser/app

USER pptruser
RUN npm install

CMD [ "npm", "run", "start" ]