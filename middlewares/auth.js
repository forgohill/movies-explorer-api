const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const { MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  console.log(' я в auth');
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) {
    console.log('я в auth проверка наличия токена');
    return next(new ErrorUnauthorized(MESSAGE.ERROR_UNAUTHORIZED));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    console.log('я в auth проверка валидости токена');
    return next(new ErrorUnauthorized(MESSAGE.ERROR_TOKEN_VALIDATION));
  }
  req.user = payload;
  return next();
};
