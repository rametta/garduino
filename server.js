const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const ObjectId = mongoose.Types.ObjectId;
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

// Insert a new fake document in collection
router.route('/fake')
  .get((req, res) => {

		const { temperature, humidity, moisture, light } = req.query;
		
    const g = new Garden({
      date: new Date(),
      temperature,
      humidity,
      moisture,
      light
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
		const date = moment(req.query.date);
    const day = date.date();
		const month = date.month();
		const year = date.year();
		const today = new Date(year, month, day);
		const tomorrow = moment(today).add(1, 'day').toDate();

    db.gardens
      .find({ date: { "$gte": today, "$lt": tomorrow } })
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
   * Delete garden
   * @param {String} id
   * @return {Number|Error}
   */
  .delete((req, res) => {
		db.gardens
			.deleteOne({_id: ObjectId(req.body.id)})
			.then(val => res.json(val.deletedCount))
			.catch(err => res.json(err))
  })
