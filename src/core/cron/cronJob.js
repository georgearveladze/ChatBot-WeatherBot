const cronJob = require('node-cron');
const UserService = require('../database/services/user-servise');
const Weather = require('../providers/weather');

class Cron {
  constructor(bot) {
    this.bot = bot;
    this.userService = new UserService();
    this.weather = new Weather();
  }
  async setSchedule() {
    cronJob.schedule(
      '* * * * *',
      async () => {
        const date = new Date();

        const users = await this.userService.findUsersOnDate(date);

        for (const user of users) {
          //console.log(user);
          const weather = await this.weather.getWeather(user.location);

          this.bot.sendMessage(user.chatId, `<i>${weather}</i>`, {
            parse_mode: 'HTML',
          });
        }
      },
      null,
      null,
      'Europe/London'
    );
  }
}

module.exports = Cron;
