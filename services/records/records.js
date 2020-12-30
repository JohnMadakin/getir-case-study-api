const Joi = require('joi').extend(require('@joi/date'));
const errorResponse = require('../../helpers/apiError');
const specValidator = require('../../helpers/specValidator');
const RecordModel = require('../../models/records');

/**
 * @typedef {Object} ServiceData
 * @property {date} startDate - Start date
 * @property {date} endDate - end date
 * @property {number} minCount - minimum count
 * @property {number} maxCount - maximum count
 */

const serviceSchema = Joi.object({
  startDate: Joi.date().format('YYYY-MM-DD').required(),
  endDate: Joi.date().format('YYYY-MM-DD').required(),
  minCount: Joi.number().required(),
  maxCount: Joi.number().required(),
});

/**
 * @param {ServiceData} data
 * @summary fetches a set of filtered records
 */
function service(data) {
  const locals = {
    data,
  };

  async function servicePromiseExecutor(resolve, reject) {
    try {
      const {
        startDate, endDate, minCount, maxCount,
      } = specValidator(serviceSchema, locals.data);

      locals.records = await RecordModel.aggregate(
        [
          {
            $match: {
              createdAt: {
                $gte: new Date(startDate),
                $lt: new Date(endDate),
              },
            },
          },
          {
            $project: {
              _id: 0,
              key: 1,
              createdAt: 1,
              totalCount: {
                $sum: '$counts',
              },
            },
          },
          {
            $match: {
              totalCount: {
                $gte: minCount,
                $lte: maxCount,
              },
            },
          },
        ],
      ).sort({ createdAt: 'desc' });

      resolve(locals.records);
    } catch (e) {
      errorResponse.handleError(reject, e);
    }
  }
  return new Promise(servicePromiseExecutor);
}
module.exports = service;
