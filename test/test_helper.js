const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/garden_test_db', { useMongoClient: true });
  mongoose.connection
    .once('open', () => {
      console.log('Connection open');
      done();
    })
    .on('error', () => console.error('Connection error'));
});

// Before each test, drop all records in the garden collection
beforeEach((done) => {
  const { gardens } = mongoose.connection.collections;
  gardens.drop(() => done());
})