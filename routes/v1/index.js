const express = require('express');
const records = require('./records');

const router = express.Router();

router.use('/records', records);

module.exports = router;
