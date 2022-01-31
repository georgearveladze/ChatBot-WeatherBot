const User = require('./mongoose-models');
const convertTime = require('./time-zone');

const addTime = async (chatId, time) => {
  const existingUser = await User.findOne({ chatId: chatId });

  if (existingUser) {
    existingUser.time = convertTime(
      time,
      existingUser.location.longitude,
      existingUser.location.latitude
    );
    return await existingUser.save();
  }
};

module.exports = addTime;
