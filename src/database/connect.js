const mongoose = require('mongoose');
const config = require('../config/config');
module.exports = async function connect() {
  try {
    await mongoose.connect(config().database.uri);

    console.log('Connected to db');
  } catch (error) {
    console.error('app crush');
  }
};
