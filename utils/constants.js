const REGEX = {
  URL: /https?:\/\/(www)?[0-9a-zA-Z-._~:/?#\[\]@!\$&'\(\)\*\+,;=]+\.\w{2,3}/,
  EMAIL: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
};

const STATUS_CODE = {
  SUCCESS_DONE: 200,
  SUCCESS_CREATE: 201,
  DATA_ERROR: 400,
  AUTH_ERROR: 401,
  ACCESS_IS_DENIED: 403,
  NOT_FOUND: 404,
  DATA_DUBLICATE: 409,
  SERVER_ERROR: 500,
};

const MESSAGE = {
  ERROR_LOGIN_VALIDATION: 'Вы ввели неправильный логин или пароль',
  ERROR_UNAUTHORIZED: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате',
  ERROR_TOKEN_VALIDATION: 'При авторизации произошла ошибка. Переданный токен некорректен',
  ERROR_NOT_UNIQUE_EMAIL: 'Пользователь с таким email уже существует',
  ERROR_REGISTRATION: 'При регистрации пользователя произошла ошибка',
  ERROR_UPDATE_USER: 'При обновлении профиля произошла ошибка',
  ERROR_SERVER: '500 На сервере произошла ошибка',
  ERROR_PATH_NOT_FOUND: '404 Страница по указанному маршруту не найдена',
  ERROR_DATABASE_NOT_CONNECT: 'Обшибка подключения к базе данных',
  SUCCESSFUL_DATABASE_CONNECT: 'Соединение с базой данных установлено',
  SUCCESSFUL_REMOVE_OBJECT: 'Карточка фильма удалена',
  INFO_LISTENING_PORT: 'Порт на котором можно прослушать приложение:',
};

const CONFIG = {
  DATABASE_URI: 'mongodb://127.0.0.1:27017/bitfilmsdb'
}

module.exports = {
  REGEX,
  STATUS_CODE,
  MESSAGE,
  CONFIG
};

/**
Страница логина пользователя
1. Вы ввели неправильный логин или пароль.

2. При авторизации произошла ошибка. Токен не передан или передан не в том формате.

3. При авторизации произошла ошибка. Переданный токен некорректен.

Страница регистрации пользователя
1. Пользователь с таким email уже существует.

2. При регистрации пользователя произошла ошибка.
Страница обновления профиля
1. Пользователь с таким email уже существует.

2. При обновлении профиля произошла ошибка.
Другое
1. 500 На сервере произошла ошибка.

2. 404 Страница по указанному маршруту не найдена.
 */