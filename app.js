const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();
const mongoose = require('mongoose')

const { PORT = 3000 } = process.env;
const router = require('./routes/index');

const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => {
    console.log('Соединение с базой данной установлено.');
  })
  .catch((error) => {
    console.log(`Ошибка соединения с базой данных ${error.message}`);
  });

app.use(helmet());

// временное решение авторизации
app.use((req, res, next) => {
  req.user = { _id: '64d46f9cbf647d2715aba6a1' }; // тут _id одного из созданных пользователей
  // req.user = { _id: '64d68411a48745739a570511' }; // тут _id одного из созданных пользователей
  next();
});

app.use(router);

app.listen(PORT, () => console.log(`Приложение можно прослушать на порту: ${PORT}!`));