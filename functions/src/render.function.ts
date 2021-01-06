const functions = require('firebase-functions');
const express = require('express');
const fetch = require('node-fetch');
const url = require('url');
const useragent = require('express-useragent');

const APP_URL = 'diary-for-reader.web.app/';
const RENDERTRON_URL = 'https://diary-for-reader-render.uc.r.appspot.com';

const generateUrl = (req: any) => {
  return url.format({
    protocol: 'https',
    host: APP_URL,
    pathname: req.originalUrl,
  });
};

const app = express();

app.use(useragent.express());

app.get('*', async (req: any, res: any) => {
  if (req.useragent.isBot) {
    const response = await fetch(
      `${RENDERTRON_URL}/render/${generateUrl(req)}`
    );
    const body = await response.text();
    res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.set('Vary', 'User-Agent');
    res.send(body.toString());
  } else {
    fetch(`https://${APP_URL}`)
      .then((result: any) => result.text())
      .then((body: any) => {
        res.send(body.toString());
      });
  }
});

export const render = functions.https.onRequest(app);
