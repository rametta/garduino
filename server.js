const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const v4 = '/client/dist';
const port = process.env.PORT || 8080;

let gardens = [
  {
    _id: 1,
    date: new Date(2017, 1, 1, 1, 1, 1, 1).toISOString(),
    temperature: 3.2233423,
    humidity: 1.123235,
    moisture: 34.234,
    light: 4
  },
  {
    _id: 2,
    date: new Date(2017, 2, 2, 2, 2, 2, 2).toISOString(),
    temperature: 3.2233423,
    humidity: 1.123235,
    moisture: 34.234,
    light: 5
  },
  {
    _id: 3,
    date: new Date(2017, 3, 3, 3, 3, 3, 3).toISOString(),
    temperature: 3.2233423,
    humidity: 1.123235,
    moisture: 34.234,
    light: 6
  }
];

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
          route: `${BASE}/api/garden/{id}`,
          returns: 'One garden object'
        },
        {
          type: 'POST',
          route: `${BASE}/api/garden/{id}`,
          returns: 'Insert/update a new/existing garden'
        },
        {
          type: 'DELETE',
          route: `${BASE}/api/garden/{id}`,
          returns: 'Delete a garden object'
        }
      ]
    });
  })

// All gardens
router.route('/gardens')
  .get((req, res) => {
    res.json(gardens);
  })
  .post((req, res) => {
    res.json(req.body);
  })

// Delete one garden
router.route('/gardens/delete')
  .post((req, res) => {
    gardens = gardens.filter(g => g._id != req.body.id);
    res.json(true);
  })

// Get/Update one garden
router.route('/gardens/:id')
  .get((req, res) => {
    res.json(gardens.find(g => g._id == req.params.id));
  })
  .post((req, res) => {

  })

