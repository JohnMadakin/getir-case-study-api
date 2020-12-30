require('dotenv').config();
const mongoose = require('mongoose');

afterAll(() => mongoose.disconnect());
