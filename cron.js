const User = require('./mongoose-models');

const findUsersOnDate = async (date) => {
  // console.log(date.getUTCHours());
  let hour = await date.getUTCHours().toString();
  let minute = await date.getUTCMinutes().toString();
  if (hour.length === 1) {
    hour = '0' + hour;
  }
  if (minute.lenght === 1) minute = '0' + minute;
  const time = `${hour}:${minute}`;
  return User.find({ time });
};

module.exports = findUsersOnDate;
