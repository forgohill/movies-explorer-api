const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const { MESSAGE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new ErrorUnauthorized(MESSAGE.ERROR_UNAUTHORIZED));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new ErrorUnauthorized(MESSAGE.ERROR_TOKEN_VALIDATION));
  }
  req.user = payload;
  return next();
};
