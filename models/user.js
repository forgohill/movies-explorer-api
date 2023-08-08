const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { REGEX } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(url) {
        return REGEX.EMAIL.test(url);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

const User = mongoose.model('user', userSchema);
module.exports = User;