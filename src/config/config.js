const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const config = () => {
  return {
    database: {
      uri: process.env.MONGO_URL,
    },
    bot: {
      token: process.env.TOKEN,
    },
  };
};

module.exports = config;
