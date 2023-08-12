const rateLimiter = require("express-rate-limit");
const { MESSAGE } = require('../utils/constants')
const limiter = rateLimiter({
  max: 100,
  windowMS: 36000,
  message: MESSAGE.INFO_LIMITRATE,
});

module.exports = limiter;