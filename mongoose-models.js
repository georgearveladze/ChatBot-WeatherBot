const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  chatId: Number,
  time: String,
  location: Object,
});

const User = mongoose.model('subscriptions', userSchema);
module.exports = User;
