module.exports = async function searchUser(date) {
  let hour = await date.getUTCHours().toString();
  let minute = await date.getUTCMinutes().toString();
  if (hour.length === 1) {
    hour = '0' + hour;
  }
  if (minute.length === 1) minute = '0' + minute;
  const time = `${hour}:${minute}`;
  return time;
};
