const User = require('./mongoose-models');

class UserService {
  async register(chatId, location, time) {
    const user = new User({
      chatId: chatId,
      time: time,
      location: location,
    });

    return await user.save();
  }

  async findUsersOnDate(date) {
    let hour = await date.getUTCHours().toString();
    let minute = await date.getUTCMinutes().toString();
    if (hour.length === 1) {
      hour = '0' + hour;
    }
    if (minute.lenght === 1) minute = '0' + minute;
    const time = `${hour}:${minute}`;
    return User.find({ time });
  }
}

module.exports = UserService;
