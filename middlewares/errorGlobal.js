const { STATUS_CODE, MESSAGE } = require('../utils/constants');
module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: MESSAGE.ERROR_SERVER });
  }
  res.status(err.statusCode).send({ message: err.message });
  return next();
}