const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { REGEX_EMAIL, MESSAGE } = require('../utils/constants');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(url) {
        return REGEX_EMAIL.test(url);
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

userSchema.statics.findUserByCredintails = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new ErrorUnauthorized(MESSAGE.ERROR_LOGIN_VALIDATION));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ErrorUnauthorized(MESSAGE.ERROR_LOGIN_VALIDATION));
          }
          return user;
        });
    });
};
const User = mongoose.model('user', userSchema);
module.exports = User;
