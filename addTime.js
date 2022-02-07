const User = require('./mongoose-models');

const timezone = require('geo-tz');
const moment = require('moment-timezone');
const { find } = timezone;

const convertTime = (time, lon, lat) => {
  const locTimeZone = find(lon, lat);
  const converted = moment
    .tz(time, 'HH:mm', locTimeZone[0])
    .utc()
    .format('HH:mm');
  return converted;
};

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

module.exports = { convertTime, addTime };
