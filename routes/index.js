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
const { createUser, login, logoutUser, getUser, updateUser } = require('../controllers/users');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.post('/signup', createUser);
router.post('/signin', login);
router.get('/signout', logoutUser);

// auth
router.get('/users/me', getUser);
router.patch('/users/me', updateUser);
router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.delete('/movies/:movieId', deleteMovie);

// router.use('/users', usersRouter);
// router.use('/movies', moviesRouter);

module.exports = router;