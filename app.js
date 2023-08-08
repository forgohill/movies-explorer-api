const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const mongoose = require('mongoose')

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => {
    console.log('Соединение с базой данной установлено.');
  })
  .catch((error) => {
    console.log(`Ошибка соединения с базой данных ${error.message}`);
  });

app.use(helmet());


app.listen(PORT, () => console.log(`Приложение можно прослушать на порту: ${PORT}!`));