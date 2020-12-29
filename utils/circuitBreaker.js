const { circuitBreakerDelay: delay, enableCircuitBreaker } = require('../config/app');

const noOp = () => { };

function circuitBreaker(req, res, next) {
  if (enableCircuitBreaker) {
    // Delay for 25 seconds before breaking request
    const circuitBreakerDelay = Number(delay) || 25;

    setTimeout(() => {
      if (!res.headersSent) {
        res.status(503).json({
          code: '1',
          msg: 'Service timeout',
        });

        /**
           * Set these to noOp (no operation)
           * to prevent getting headers already sent error
           */
        res.send = noOp;
        res.json = noOp;
        res.render = noOp;
      }
    }, circuitBreakerDelay * 1000);
  }
  next();
}

module.exports = circuitBreaker;
