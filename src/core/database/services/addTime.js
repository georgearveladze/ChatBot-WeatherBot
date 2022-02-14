const User = require('../schema/mongoose-models');
const { convertTime } = require('../../../utils/timeConverter');

class AddTime {
  async addTime(chatId, time) {
    const existingUser = await User.findOne({ chatId: chatId });

    if (existingUser) {
      existingUser.time = convertTime(
        time,
        existingUser.location.longitude,
        existingUser.location.latitude
      );
      return await existingUser.save();
    }
  }
}
module.exports = AddTime;
