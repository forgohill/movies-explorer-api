require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { STATUS_CODE, MESSAGE, SECRET_KEY } = require('../utils/constants');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorConflict = require('../errors/ErrorConflict');

const createUser = (req, res, next) => {
  const { email, name } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((user) => {
          const { _id } = user;
          return res.status(STATUS_CODE.SUCCESS_CREATE).send({ email, name, _id });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new ErrorBadRequest(MESSAGE.ERROR_REGISTRATION));
          }
          if (err.code === 11000) {
            return next(new ErrorConflict(MESSAGE.ERROR_NOT_UNIQUE_EMAIL));
          }
          return next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  console.log(process.env);
  const { email, password } = req.body;
  return User.findUserByCredintails(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );
      return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ _id: user._id });
    })
    .catch(next);
};

const logoutUser = (req, res, next) => {
  try {
    res.clearCookie('jwt', { httpOnly: true }).send({ exit: 'user logged out' });
  } catch (err) {
    next(err);
  }
};

const getUser = (req, res, next) => {
  User.findById(req.user._id).select('+email')
    .then((user) => { res.send(user); })
    .catch((err) => { next(err); });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => (res.send(user)))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new ErrorBadRequest(MESSAGE.ERROR_UPDATE_USER));
      }
      if (err.code === 11000) {
        return next(new ErrorConflict(MESSAGE.ERROR_NOT_UNIQUE_EMAIL));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  login,
  logoutUser,
  getUser,
  updateUser,
};
