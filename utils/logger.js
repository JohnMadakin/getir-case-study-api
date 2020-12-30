const { createLogger, transports, format } = require('winston');
const { environment } = require('../config/app');

const logLevel = environment === 'development' ? 'debug' : 'warn';

const logger = createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.simple(),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
