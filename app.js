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

mongoose.connect(CONFIG.DATABASE_URI)
  .then(() => {
    console.log(MESSAGE.SUCCESSFUL_DATABASE_CONNECT);
  })
  .catch((error) => {
    console.log(`${MESSAGE.ERROR_DATABASE_NOT_CONNECT} — ${error.message}`);
  });

app.use(helmet());

// временное решение авторизации
// app.use((req, res, next) => {
//   req.user = { _id: '64d46f9cbf647d2715aba6a1' }; // тут _id одного из созданных пользователей
//   // req.user = { _id: '64d68411a48745739a570511' }; // тут _id одного из созданных пользователей
//   next();
// });

app.use(router);
app.use(errors());
app.use(require('./middlewares/errorGlobal'));

app.listen(PORT, () => console.log(`${MESSAGE.INFO_LISTENING_PORT} ${PORT}`));