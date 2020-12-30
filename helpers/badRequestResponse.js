const ApiResponse = require('./apiResponse');
const { StatusCode, ResponseStatus } = require('./responseData');

class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Parameters') {
    super(StatusCode.failure, ResponseStatus.badrequest, message);
  }
}
module.exports = BadRequestResponse;
