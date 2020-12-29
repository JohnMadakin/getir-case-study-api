require('dotenv').config();
const mongoose = require('mongoose');

const clearDB = async () => {
  const collectionNames = Object.keys(mongoose.connection.collections);
  const dropCollectionReqs = collectionNames
    .map((collectionName) => mongoose.connection.dropCollection(collectionName));

  await Promise.all(dropCollectionReqs);
  await mongoose.connection.close();
};

afterAll(async () => {
  await clearDB();
});
