const ApiResponse = require('./apiResponse');
const { StatusCode, ResponseStatus } = require('./responseData');

class SuccessResponse extends ApiResponse {
  constructor(msg, data = null, code = null) {
    super(StatusCode.success, code || ResponseStatus.success, msg);
    this.records = data;
  }

  send(res) {
    return super.prepare(res, this);
  }
}

module.exports = SuccessResponse;
