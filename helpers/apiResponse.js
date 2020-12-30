class ApiResponse {
  constructor(code, status, msg) {
    this.code = code;
    this.status = status;
    this.msg = msg;
  }

  prepare(res, response) {
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  send(res) {
    return this.prepare(res, this);
  }

  static sanitize(response) {
    const clone = { ...response };

    delete clone.status;
    Object.keys(clone).forEach((key) => {
      if (typeof clone[key] === 'undefined') delete clone[key];
    });
    return clone;
  }
}

module.exports = ApiResponse;
