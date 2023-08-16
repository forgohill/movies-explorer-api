const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'http://api.forgohill.diplom.nomoreparties.co',
  'http://forgohill.diplom.nomoreparties.co',
  'https://api.forgohill.diplom.nomoreparties.co',
  'https://forgohill.diplom.nomoreparties.co',
  'http://localhost:3000',
  'https://localhost:3000',
];

module.exports = (req, res, next) => {
  // источник запроса => в переменную origin
  const { origin } = req.headers;
  // тип запроса (HTTP-метод) => в соответствующую переменную
  const { method } = req;
  // созраняем тип хедера из запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  // разрешаем хедеру отправлять куки
  res.header('Access-Control-Allow-Credentials', true);
  // проверка, источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  return next();
};
