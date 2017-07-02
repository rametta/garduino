const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GardenSchema = new Schema({
  date: Date,
  temperature: Number,
  humidity: Number,
  moisture: Number,
  light: Number
});

const Garden = mongoose.model('garden', GardenSchema);

module.exports = Garden;