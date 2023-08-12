const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { PORT = 3000 } = process.env;
const router = require('./routes/index');
const { MESSAGE, CONFIG } = require('./utils/constants')
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
const cors = require('./middlewares/cors');
const { reqLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
mongoose.connect(CONFIG.DATABASE_URI)
  .then(() => {
    console.log(MESSAGE.SUCCESSFUL_DATABASE_CONNECT);
  })
  .catch((error) => {
    console.log(`${MESSAGE.ERROR_DATABASE_NOT_CONNECT} — ${error.message}`);
  });


app.use(cors);
app.use(helmet());
app.use(limiter);

app.use(reqLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/errorGlobal'));

app.listen(PORT, () => console.log(`${MESSAGE.INFO_LISTENING_PORT} ${PORT}`));