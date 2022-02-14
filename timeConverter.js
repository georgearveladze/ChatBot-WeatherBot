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

module.exports = { convertTime };
