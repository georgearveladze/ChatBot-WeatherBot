const TelegramBot = require('node-telegram-bot-api');
const CronJob = require('cron').CronJob;
const db = require('./connect');
const UserService = require('./user-servise');
const TimeFromatting = require('./addTime');
const Weather = require('./weather');
const requestLocbutton = require('./button');
require('dotenv').config();

const userService = new UserService();
const weatherApi = new Weather();

const descText =
  "Hello I'm weather Bot, You can subscribe and get daily forecast on time!, If you send time again, Your subscribtion will be updated";

(async () => {
  await db();
  requestLocbutton.regEx;
  requestLocbutton.button;
  const bot = new TelegramBot(process.env.TOKEN, { polling: true });
  bot.on('message', (msg) => {
    if (msg.text == '/description') {
      return bot.sendMessage(msg.chat.id, descText);
    }

    if (
      typeof msg.text === 'string' &&
      !requestLocbutton.regEx.test(msg.text)
    ) {
      return bot.sendMessage(msg.chat.id, 'wrong request,please enter  /start');
    }
  });

  bot.onText(requestLocbutton.regEx, async (msg) => {
    const chatId = msg.chat.id;
    const time = msg.text;
    TimeFromatting.addTime(chatId, time);

    bot.sendMessage(msg.chat.id, 'Your time is saved.');
  });

  bot.on('location', async (msg) => {
    await userService.register(msg.chat.id, msg.location);

    bot.sendMessage(
      msg.chat.id,
      'Your location is saved,please time add time...'
    );
  });

  const cron = new CronJob(
    '* * * * *',
    async () => {
      const data = new Date();
      const users = await userService.findUsersOnDate(data);

      for (const user of users) {
        const weather = await weatherApi.getWeather(user.location);
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
