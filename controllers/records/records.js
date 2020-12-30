const SuccessResponse = require('../../helpers/successResponse');
const BadRequestResponse = require('../../helpers/badRequestResponse');
const recordsService = require('../../services/records/records');

async function records(req, res) {
  try {
    const result = await recordsService(req.body);
    new SuccessResponse('Success', result, 200).send(res);
  } catch (error) {
    new BadRequestResponse(error.message).send(res);
  }
}

module.exports = records;
