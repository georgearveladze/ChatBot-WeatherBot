const { start, cron } = require('./bot/app');
const connect = require('./database/connect');

async function cronStart() {
  await cron.setSchedule();
}
connect()
  .then(async () => {
    start();
  })
  .catch((err) => {
    console.error(err);
  });
cronStart().catch((err) => {
  console.log(err);
});
