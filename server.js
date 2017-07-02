const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
//const Garden = require('./models/garden');

const DB_CONNECTION = 'mongodb://localhost/garden_db';
let Garden;

// Express Static File & API Server
const app = express();
const router = express.Router();
const web = '/client/dist';
const port = process.env.PORT || 8080;

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(helmet()) // Applies security precautions
  .use(compression()) // gzip compress
  .use('/', express.static(__dirname + web, { maxAge: '20d' }))
  .use('/api', router)
  .use('*', (req, res) => res.sendFile(__dirname + web + '/index.html'))

// Mongo database
mongoose.Promise = global.Promise;
mongoose.connect(DB_CONNECTION, { useMongoClient: true });
const db = mongoose.connection.collections;
mongoose.connection
  .once('open', () => {
    console.log('Database connected')

    const Schema = mongoose.Schema;

    const GardenSchema = new Schema({
      date: Date,
      temperature: Number,
      humidity: Number,
      moisture: Number,
      light: Number
    });

    Garden = mongoose.model('garden', GardenSchema);

    // Start the express server after connecting to DB
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  })
  .on('error', () => console.error('Database connection error'));

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

// Insert a new fake document in collection
router.route('/fake')
  .get((req, res) => {

    const g = new Garden({
      date: new Date(),
      temperature: 3.12,
      humidity: 45452.4,
      moisture: 34,
      light: 5.6
    });

    g.save()
      .then(doc => res.json(doc))
      .catch(err => res.json(err));
  })

router.route('/gardens')

  /**
   * Get an array of Gardens, filterable by date
   * @param {Date} date
   * @return {Array<Garden>}
   */ 
  .get((req, res) => {
    //const date = moment(req.params.date).toDate();
    db.gardens
      .find({ })
      .toArray()
      .then(result => res.json(result))
      .catch(err => res.json(err));
  })

  /**
   * Update or insert Gradens
   * @param {Array<Garden>} gardens
   * @return {Array<Garden>}
   */
  .post((req, res) => {
    res.json(req.body);
  })

  /**
   * Delete gardens
   * @param {Array<Garden>} gardens
   * @return {Array<Garden>}
   */
  .delete((req, res) => {
    res.json('delete')
  })
