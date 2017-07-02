const assert = require('assert');
const Garden = require('../models/garden');

describe('Create records', () => {
  it('saves a garden', (done) => {

    const garden = new Garden({
      date: new Date(),
      temperature: 10,
      moisture: 2.34,
      humidity: 3.141543246,
      light: 3
    });

    garden.save()
      .then(() => {
        assert(!garden.isNew);
        done();
      });
  })
});