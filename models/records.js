const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'records';

const schema = new Schema(
  {
    key: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    value: {
      type: Schema.Types.String,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
    },
    count: {
      type: Schema.Types.Array,
    },
  },
);

const RecordModel = model(DOCUMENT_NAME, schema);

module.exports = RecordModel;
