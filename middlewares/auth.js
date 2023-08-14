require('dotenv').config();
const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const { MESSAGE, SECRET_KEY } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new ErrorUnauthorized(MESSAGE.ERROR_UNAUTHORIZED));
  }
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new ErrorUnauthorized(MESSAGE.ERROR_TOKEN_VALIDATION));
  }
  req.user = payload;
  return next();
};
