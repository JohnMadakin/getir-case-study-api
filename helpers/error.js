class AppError extends Error {
  constructor(config = { code: '1', name: 'AppError' }, ...params) {
    // Pass remaining arguments to parent constructor
    super(...params);

    // Maintains proper stack trace for when application error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.name = config.name || 'CustomError';
    // Custom debugging information
    this.code = config.code || '1';
    this.errorTimestamp = Date.now();
  }
}
module.exports = AppError;
