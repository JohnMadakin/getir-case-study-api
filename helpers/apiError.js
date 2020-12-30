const AppError = require('./error');

/*
* Error Util Class to handle all in app error that occur
*/
class AppErrorUtils {
  static throwError(message, config) {
    const errorMessage = message || 'Some error occured.';
    throw new AppError(config, errorMessage);
  }

  static assert(condition, message, code) {
    if (condition) {
      this.throwError(message, { code });
    }
  }

  static isAppError(errorObject) {
    return errorObject instanceof AppError;
  }

  /*
  * Handles app errors including  cases like
  * params.x is undefined type errors to the user
  */
  static handleError(promiseRejection, errorObject = {}) {
    const errorObjectPointer = errorObject;
    let errorMessage = errorObject.message;

    if (!this.isAppError(errorObjectPointer)) {
      errorMessage = 'Service error.';
      errorObjectPointer.message = errorMessage;
      errorObjectPointer.code = '1';
    }

    if (promiseRejection && typeof promiseRejection === 'function') {
      promiseRejection(errorObjectPointer);
    }
  }
}
module.exports = AppErrorUtils;
