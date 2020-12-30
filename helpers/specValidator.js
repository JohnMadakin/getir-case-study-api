const errorResponse = require('./apiError');

module.exports = function validateSpec(spec, data, optionalConfig = {}) {
  const { error, value } = spec.validate(data, {
    allowUnknown: true,
    stripUnknown: true,
    errors: {
      wrap: {
        label: '',
      },
    },
    ...optionalConfig,
  });
  if (error) {
    errorResponse.throwError(error.message);
  }
  return value;
};
