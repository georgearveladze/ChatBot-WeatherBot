const User = require('./mongoose-models');
const searchUser = require('./helpers');

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
    const time = await searchUser(date);
    return await User.find({ time });
  }
}

module.exports = UserService;
