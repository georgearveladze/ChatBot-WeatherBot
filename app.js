const TelegramBot = require('node-telegram-bot-api');
const CronJob = require('cron').CronJob;
const db = require('./connect');
const register = require('./register');
const addTime = require('./addTime');
const getWeather = require('./weather');
const findUsersOnDate = require('./cron');
require('dotenv').config();
const descText =
  "Hello I'm weather Bot, You can subscribe and get daily forecast on time!, If you send time again, Your subscribtion will be updated";

(async () => {
  await db();

  const regEx = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
  const button = {
    reply_markup: {
      keyboard: [[{ text: '/start', request_location: true }, '/Description']],
      resize_keyboard: true,
      one_time_keyboard: true,
      force_reply: true,
    },
  };

  const bot = new TelegramBot(process.env.TOKEN, { polling: true });
  bot.on('message', (msg) => {
    // bot.sendMessage(msg.chat.id, 'HERE');

    if (msg.text == '/description') {
      return bot.sendMessage(msg.chat.id, descText);
    }

    if (typeof msg.text === 'string' && !regEx.test(msg.text)) {
      return bot.sendMessage(msg.chat.id, 'wrong request,please enter  /start');
    }
  });

  bot.onText(regEx, async (msg) => {
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
