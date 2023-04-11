const mongoose = require('mongoose');

const { urlRegExp } = require('../utils/constants');
const user = require('./user');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => urlRegExp.test(value),
      message: 'Invalid link for card',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
    ref: user,
  },
  likes: {
    type: [mongoose.ObjectId],
    default: [],
    ref: user,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
