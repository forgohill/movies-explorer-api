<div id="header" align="center">
  <h1>movies-explorer-api</h1>
</div>
<div align="center">
  <img src="https://github.com/forgohill/movies-explorer-api/assets/105547969/b3c82933-ba68-4478-9eaa-43fe38c7e0b7" alt="background about me" width="320"/>
</div>
<!-- 
![GIF-header-movies-explorer-api](https://github.com/forgohill/movies-explorer-api/assets/105547969/b3c82933-ba68-4478-9eaa-43fe38c7e0b7)
 -->


Репозиторий для приложения учебного дипломного проекта `movies-explorer`, включающий бэкенд приложения.

Это учебный проект прошеший [PullRequest](https://github.com/forgohill/movies-explorer-api/pull/1) , с проверкой профессиональными ревьюверами Яндекс Практикума.

## 🧱 Функционал приложения :
- Авторизации и регистрации пользователей
- Операции с карточками и пользователями
- Выход пользователя из аккаунта
- Получение информации о текущем пользователе
- Редактирование данных пользователя
- Добавление и удаление фильмов
- Получение списка добавленных фильмов.


## 🛠️ Стек и Инструменты :

<div align="center">
<img src="https://raw.githubusercontent.com/devicons/devicon/55609aa5bd817ff167afce0d965585c92040787a/icons/javascript/javascript-plain.svg" style="width: 48px"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/55609aa5bd817ff167afce0d965585c92040787a/icons/nodejs/nodejs-plain.svg" style="width: 48px"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/55609aa5bd817ff167afce0d965585c92040787a/icons/mongodb/mongodb-original.svg" style="width: 48px"/>
<img src="https://raw.githubusercontent.com/forgohill/forgohill/9f63934c5788242c27eab32d9d03b73d5515d9bf/src/img/tolls_icons/express-original.svg" style="width: 48px;background-color: white;"/>
</div>

## 📊 Статус и планы по доработке проекта :

### Статус: 
🚩 Проект завершён.

## 🗺️ Ендпоинты:
GET\
 `/users/me`
-  возвращает информацию о пользователе (email и имя)

PATCH\
`/users/me`
-  обновляет информацию о пользователе (email и имя)

GET\
`/movies`
-  возвращает все сохранённые текущим пользователем фильмы

POST\
`/movies`
-  создаёт фильм с переданными в теле
-  country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId 

DELETE\
`/movies/_id `
-  удаляет сохранённый фильм по id


### Два роута: для регистрации и логина.
POST\
`/signup`
-  создаёт пользователя с переданными в теле
-  email, password и name

POST\
`/signin`
-  проверяет переданные в теле почту и пароль
-  и возвращает JWT

---
# 🚀 Как запустить запустить сервер.

#### 1 Скачать приложение
#### 2 Установить зависимости `npm install`
#### 3 Установить mongoDB
#### 4 Использовать команды для запуска сервера:
`npm run start` — запускает сервер\
`npm run dev` — запускает сервер с hot-reload


