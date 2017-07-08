const express = require('express');
const winston = require('winston');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const ObjectId = mongoose.Types.ObjectId;
//const Garden = require('./models/garden');

const today = moment().format('YYYYMMDD')
winston.add(winston.transports.File, { filename: `./logs/${today}.log` });
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
    winston.info('Database connected', { database: mongoose.connection.db.databaseName })

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
      winston.info(`App started`, { port });
    });
  })
  .on('error', () => winston.error('Database connection error'));

router
  .get('/', (req, res) => {
    const BASE = `http://localhost:${port}`;

    res.json({
      welcome: 'Welcome to the Rametta Garduino API',
      routes: [
        {
          type: 'GET',
          route: `${BASE}/api/gardens`,
          params: `date`,
          returns: '{Array<Garden>} An array of garden objects'
        },
        {
          type: 'POST',
          route: `${BASE}/api/gardens`,
          params: `garden`,
          returns: '{Array<Garden>} An array of garden objects modified/inserted'
        },
        {
          type: 'DELETE',
          route: `${BASE}/api/gardens`,
          params: `id`,
          returns: '{number} Documents deleted'
        }
      ]
    });
  })

router.route('/gardens')

  /**
   * Get gardens
   * @param {string} date
   * @return {Array<Garden>}
   */
  .get((req, res) => {
    const date = moment(req.query.date);
    const day = date.date();
    const month = date.month();
    const year = date.year();
    const today = new Date(year, month, day);
    const tomorrow = moment(today).add(1, 'day').toDate();

    db.gardens
      .find({ date: { "$gte": today, "$lt": tomorrow } })
      .toArray()
      .then(val => {
        winston.info(`Found ${val.length} garden(s)`);
        res.json(val) 
      })
      .catch(err => {
        winston.error(err);
        res.json(err);
      })
  })

  /**
   * Insert gardens
   * @param {Array<Garden>} gardens
   * @return {Array<Garden>}
   */
  .post((req, res) => {
    const gardens = req.body.gardens.map(g => {
      const garden = new Garden();
      garden.date = g.date;
      return garden;
    });

    db.gardens
      .insertMany(gardens)
      .then(val => {
        winston.info(`Inserted ${val.insertedCount} garden(s)`);
        res.json(val.ops)
      })
      .catch(err => {
        winston.error(err);
        res.json(err);
      })
  })

  /**
   * Update gardens
   * @param {Array<Garden>} gardens
   * @return {Array<Garden>}
   */
  .put((req, res) => {
    const gardens = req.body.gardens.map(g => {
      const garden = new Garden();
      garden.date = g.date;
      return garden;
    });

    db.gardens
      .updateMany(gardens, gardens)
      .then(val => {
        winston.info(`Updated ${val.modifiedCount} garden(s)`);
        res.json(val.ops)
      })
      .catch(err => {
        winston.error(err);
        res.json(err);
      });

    res.json(gardens);
  })

  /**
   * Delete gardens
   * @param {Array<string>} ids Array of ids to delete
   * @return {number|Error} Returns the count of deletions
   */
  .delete((req, res) => {
    const gardenIds = req.body.ids.map(i => ObjectId(i));

    db.gardens
      .deleteMany({ _id: { $in: gardenIds } })
      .then(val => {
        winston.info(`Deleted ${val.deletedCount} garden(s)`);
        res.json(val.deletedCount)
      })
      .catch(err => {
        winston.error(err);
        res.json(err);
      })
  })
