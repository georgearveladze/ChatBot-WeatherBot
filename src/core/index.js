const { start, cron } = require('./bot/app');
const connect = require('./database/connect');

connect()
  .then(async () => {
    start();
  })
  .catch((err) => {
    console.error(err);
  });
