const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  console.log('createUser');
  console.log(req.body);
  const { email, name } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((user) => {
          user = user.toObject();
          delete user.password;
          return res.status(201).send(user);
        })
        .catch((err) => {
          res.status(400).send(err);
        })
    })
};

const login = (req, res, next) => {
  console.log('login');
  const { email, password } = req.body;
  return User.findUserByCredintails(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ _id: user._id });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const logoutUser = (req, res, next) => {
  console.log('logoutUser');
  try {
    res.clearCookie('jwt', { httpOnly: true }).send({ exit: 'user logged out' });
  } catch (err) {
    res.status(400).send(err);
  }
};

const getUser = (req, res, next) => {
  User.findById(req.user._id).select('+email')
    .then((user) => { res.send(user); })
    .catch((err) => { res.status(400).send(err); });
};

const updateUser = (req, res, next) => {
  console.log('updateUser');
  console.log(req.body);
  const { email, name } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => (res.send(user)))
    .catch((err) => {
      res.status(400).send(err);
    })
};

module.exports = {
  createUser,
  login,
  logoutUser,
  getUser,
  updateUser,
};