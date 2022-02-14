const cronJob = require('node-cron');
const UserService = require('./user-servise');
const Weather = require('./weather');

class Cron {
  constructor(bot) {
    this.bot = bot;
    this.userService = new UserService();
    this.weatherApi = new Weather();
  }
  async setSchedule() {
    cronJob.schedule(
      ' * * * * *',
      async () => {
        const data = new Date();
        const users = await this.userService.findUsersOnDate(data);

        for (const user of users) {
          const weather = await this.weatherApi.getWeather(user.location);
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
