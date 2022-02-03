const mongoose = require('mongoose');

module.exports = async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log('Connected to db');
  } catch (error) {
    console.error('Db Connection fialed ', error);

    throw error;
  }
};
