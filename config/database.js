require('dotenv').config();

const mongoose = require('mongoose');
const { db } = require('./app');
const logger = require('../utils/logger');

// Build the connection string
const dbURI = db.uri || `mongodb://${db.user}:${encodeURIComponent(db.password)}@${db.host}:${db.port}/${db.name}`;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

// Create the database connection
mongoose
  .connect(dbURI, options)
  .then(() => {
    logger.info('Mongoose connection done');
  })
  .catch((e) => {
    logger.info(`Mongoose connection error: ${e.message}`);
  });

/* CONNECTION EVENTS
   When successfully connected
*/
mongoose.connection.on('connected', () => {
  logger.info('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  logger.error(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
