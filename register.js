const User = require('./mongoose-models');

const register = async (chatId, location, time) => {
  const existingUser = await User.findOne({ chatId: chatId });
  if (existingUser) {
    await User.findOneAndUpdate(
      {
        chatId: chatId,
      },
      { location: location },
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    ).clone();
  }
  const user = new User({
    chatId: chatId,
    time: time,
    location: location,
  });

  return await user.save();
};
module.exports = register;
