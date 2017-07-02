const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const v4 = '/client/dist';
const port = process.env.PORT || 8080;

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(helmet()) // Applies security precautions
  .use(compression()) // gzip compress
  .use('/', express.static(__dirname + v4, { maxAge: '20d' }))
  .use('/api', router)

  .use('*', (req, res, next) => {
    res.sendFile(__dirname + v4 + '/index.html');
  })

  .listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });

router
  .get('/', (req, res) => {
    const BASE = `http://localhost:${port}`;

    res.json({
      welcome: 'Welcome to the Rametta Garduino API',
      routes: [
        {
          type: 'GET',
          route: `${BASE}/api/gardens`,
          returns: 'An array of garden objects'
        },
        {
          type: 'GET',
          route: `${BASE}/api/garden/{ID}`,
          returns: 'One garden object'
        },
        {
          type: 'POST',
          route: `${BASE}/api/garden/{ID}`,
          returns: 'Insert/update a new/existing garden'
        },
        {
          type: 'DELETE',
          route: `${BASE}/api/garden/{ID}`,
          returns: 'Delete a garden object'
        }
      ]
    });
  })

  .get('/gardens', (req, res) => {
    res.json([
      {
        _id: 1,
        date: new Date().toISOString(),
        temperature: 3.2233423,
        humidity: 1.123235,
        moisture: 34.234,
        light: 4
      },
      {
        _id: 2,
        date: new Date().toISOString(),
        temperature: 3.2233423,
        humidity: 1.123235,
        moisture: 34.234,
        light: 5
      }
    ]);
  });