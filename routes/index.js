/**
# возвращает информацию о пользователе (email и имя)
GET /users/me

# обновляет информацию о пользователе (email и имя)
PATCH /users/me

# возвращает все сохранённые текущим пользователем фильмы
GET /movies

# создаёт фильм с переданными в теле
# country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
POST /movies

# удаляет сохранённый фильм по id
DELETE /movies/_id

# создаёт пользователя с переданными в теле
# email, password и name
POST /signup

# проверяет переданные в теле почту и пароль
# и возвращает JWT
POST /signin
*/


const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const {
  createUser,
  login,
  logoutUser,
} = require('../controllers/users');
const ErrorNotFound = require('../errors/ErrorNotFound');
const { MESSAGE } = require('../utils/constants')
// const { createUser, login, logoutUser, getUser, updateUser } = require('../controllers/users');
// const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const validation = require('../middlewares/validations');

router.post('/signup', validation.createUser, createUser);
router.post('/signin', validation.login, login);
router.get('/signout', logoutUser);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

// router.get('/users/me', getUser);
// router.patch('/users/me', validation.updateUser, updateUser);
// router.get('/movies', getMovies);
// router.post('/movies', validation.createMovie, createMovie);
// router.delete('/movies/:movieId', validation.checkMovieId, deleteMovie);

router.use("*", (req, res, next) => next(new ErrorNotFound(MESSAGE.ERROR_PATH_NOT_FOUND)));
// router.use('/users', usersRouter);
// router.use('/movies', moviesRouter);

module.exports = router;