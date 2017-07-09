const moment = require('moment');
const winston = require('winston');
const mongoose = require('mongoose');
const Garden = require('./../models/garden');

/**
 * The Garden Controller handles all API
 * requests to /api/gardens
 */
class GardenController {

  /**
   * Get gardens
   * @param {string} date
   * @return {Array<Garden>}
   */
  static getGardens(req, res) {
    Garden
      .find({})
      .toArray()
      .then(val => {
        winston.info(`Found ${val.length} garden(s)`);
        res.json(val)
      })
      .catch(err => {
        winston.error(err);
        res.json(err);
      })
  }

  /**
   * Update garden
   * @param {Garden} garden
   * @return {number} Modified count
   */
  static putGarden(req, res) {
    res.json('put garden');
  }

  /**
   * Insert gardens
   * @param {Array<Garden>} gardens
   * @return {Array<Garden>}
   */
  static postGardens(req, res) {
    res.json('post gardens');
  }

  /**
   * Delete gardens
   * @param {Array<string>} ids Array of ids to delete
   * @return {number|Error} Returns the count of deletions
   */
  static deleteGardens(req, res) {
    res.json('delete gardens');
  }

}

module.exports = GardenController;