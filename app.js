const TelegramBot = require('node-telegram-bot-api');
const CronJob = require('cron').CronJob;
const db = require('./connect');
const register = require('./register');
const addTime = require('./addTime');
const getWeather = require('./weather');
const findUsersOnDate = require('./cron');
const botton = require('./botton');
require('dotenv').config();
const descText =
  "Hello I'm weather Bot, You can subscribe and get daily forecast on time!, If you send time again, Your subscribtion will be updated";

(async () => {
  await db();
  botton.regEx;
  botton.button;
  const bot = new TelegramBot(process.env.TOKEN, { polling: true });
  bot.on('message', (msg) => {
    if (msg.text == '/description') {
      return bot.sendMessage(msg.chat.id, descText);
    }

    if (typeof msg.text === 'string' && !botton.regEx.test(msg.text)) {
      return bot.sendMessage(msg.chat.id, 'wrong request,please enter  /start');
    }
  });

  bot.onText(botton.regEx, async (msg) => {
    await addTime(msg.chat.id, msg.text);

    bot.sendMessage(msg.chat.id, 'Your time is saved.');
  });

  bot.on('location', async (msg) => {
    await register(msg.chat.id, msg.location);

    bot.sendMessage(
      msg.chat.id,
      'Your location is saved,please time add time...'
    );
  });

  const cron = new CronJob(
    '* * * * *',
    async () => {
      const data = new Date();
      const users = await findUsersOnDate(data);

      for (const user of users) {
        const weather = await getWeather(user.location);
        bot.sendMessage(user.chatId, `<i>${weather}</i>`, {
          parse_mode: 'HTML',
        });
      }
    },
    null,
    null,
    'Europe/London'
  );
  cron.start();
})();
