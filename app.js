require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { MESSAGE, DATABASE_URI, PORT } = require('./utils/constants');
const cors = require('./middlewares/cors');
const { reqLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const app = express();

mongoose.connect(DATABASE_URI)
  .then(() => {
    console.log(MESSAGE.SUCCESSFUL_DATABASE_CONNECT);
  })
  .catch((error) => {
    console.log(`${MESSAGE.ERROR_DATABASE_NOT_CONNECT} — ${error.message}`);
  });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors);
app.use(helmet());
app.use(reqLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use(require('./middlewares/errorGlobal'));

app.listen(PORT, () => console.log(`${MESSAGE.INFO_LISTENING_PORT} ${PORT}`));
