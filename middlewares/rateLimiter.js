const rateLimit = require('express-rate-limit');

/*
  Simple naive rate limiting implementation
*/
module.exports = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
});
