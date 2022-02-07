const mongoose = require('mongoose');

module.exports = async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log('Connected to db');
  } catch (error) {
    throw error('Db Connection fialed ');
  }
};
