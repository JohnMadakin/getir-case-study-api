require('dotenv').config();
require('./config/database');
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const cors = require('./utils/cors');
const circuitBreaker = require('./utils/circuitBreaker');
const rateLimiter = require('./middlewares/rateLimiter');
const records = require('./routes/v1');

const { environment } = require('./config/app');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors);

if (environment === 'production') {
  app.use(compression());
  app.use(helmet());
}

// Handle cases where invalid JSON data is passed
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    res.json({
      code: '1',
      message: `invalid JSON '${err.body}' passed`,
    });
  } else {
    next();
  }
});

// circuit breaker for Requests that take longer than 25 secs
app.use(circuitBreaker);

app.get('/', (req, res) => {
  res.json({ version: '1.0' });
});

const version = '/v1';

app.use(version, rateLimiter, records);

// Handle cases where no route is matched
app.use('*', (req, res) => {
  res.status(404).json({ code: 2, msg: `Unimplemented ${req.method} ${req.path} route access` });
});

module.exports = app;
