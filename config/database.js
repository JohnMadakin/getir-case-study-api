require('dotenv').config();

const mongoose = require('mongoose');
const { db } = require('./app');

// Build the connection string
const dbURI = db.uri || `mongodb://${db.user}:${encodeURIComponent(db.password)}@${db.host}:${db.port}/${db.name}`;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 3, // Maintain up to 3 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

// Create the database connection
mongoose
  .connect(dbURI, options)
  .then(() => {
    console.log('Mongoose connection done');
  })
  .catch((e) => {
    console.log(`Mongoose connection error: ${e.message}`);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
