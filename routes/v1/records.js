const express = require('express');

const records = require('../../controllers/records/records');

const router = express.Router();

router.post('/', records);

module.exports = router;
