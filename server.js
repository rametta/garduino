const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const v4 = '/client/dist';
const port = 8080;

app
  .use(helmet()) // Applies security precautions
  .use(compression()) // gzip compress

  .use('/', express.static(__dirname + v4, { maxAge: '20d' }))

  .get('/ApiHost', (req, res) => {
    res.json({ ApiHost: proxyUrl });
  })

  .use('*', (req, res, next) => {
    res.sendFile(__dirname + v4 + '/index.html');
  })

  .listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });