const TelegramBot = require('node-telegram-bot-api');

const UserService = require('../database/services/user-servise');
const AddTime = require('../database/services/addTime');
const Cron = require('../cron/cronJob');
const requestLocbutton = require('./components/button');
const config = require('../config/config');
const userService = new UserService();
const addTime = new AddTime();

const descText =
  "Hello I'm weather Bot, You can subscribe and get daily forecast on time!, If you send time again, Your subscribtion will be updated";

const bot = new TelegramBot(config().bot.token, { polling: true });
const cron = new Cron(bot);

const start = async () => {
  bot.on('message', (msg) => {
    if (msg.text == '/description') {
      return bot.sendMessage(msg.chat.id, descText);
    }

    if (
      typeof msg.text === 'string' &&
      !requestLocbutton.timeFormatRegEx.test(msg.text)
    ) {
      return bot.sendMessage(msg.chat.id, 'wrong request,please enter  /start');
    }
  });

  bot.onText(requestLocbutton.timeFormatRegEx, async (msg) => {
    const chatId = msg.chat.id;
    const time = msg.text;
    await addTime.addTime(chatId, time);

    bot.sendMessage(msg.chat.id, 'Your time is saved.');
  });

  bot.on('location', async (msg) => {
    await userService.register(msg.chat.id, msg.location);

    bot.sendMessage(
      msg.chat.id,
      'Your location is saved,please time add time...'
    );
  });
};

module.exports = { start, cron };
