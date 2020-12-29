module.exports = {
  port: process.env.PORT || 2321,
  environment: process.env.NODE_ENV,
  useClusters: process.env.USE_CLUSTERS,
  clusterWorkers: process.env.THRONG_WORKERS,
  enableCircuitBreaker: process.env.ENABLE_CIRCUIT_BREAKER || 1,
  circuitBreakerDelay: process.env.CIRCUIT_BREAKER_DELAY || 25,
  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    uri: process.env.DB_URI,
  },
};
