const regEx = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
const button = {
  reply_markup: {
    keyboard: [[{ text: '/start', request_location: true }, '/Description']],
    resize_keyboard: true,
    one_time_keyboard: true,
    force_reply: true,
  },
};

module.exports = { button, regEx };
