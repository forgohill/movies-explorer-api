/**
  {
    "country": "info1",
    "director": "info2",
    "duration": "36000",
    "year": "info4",
    "description": "info5",
    "image": "https://www.kinopoisk.ru/image",
    "trailerLink": "https://www.kinopoisk.ru/trailerLink",
    "nameRU": "info8",
    "nameEN": "info9",
    "thumbnail": "https://www.kinopoisk.ru/trailer",
    "movieId": "23"
  }
 */

const Movie = require('../models/movie');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');
const ErrorBadRequest = require('../errors/ErrorBadRequest');


const { STATUS_CODE, MESSAGE } = require('../utils/constants');

const createMovie = (req, res, next) => {
  console.log('createMovie');
  console.log(req.body);
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
    .then((movie) => {
      res.status(STATUS_CODE.SUCCESS_CREATE).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ErrorBadRequest(MESSAGE.ERROR_UPDATE_USER));
      }
      return next(err);
    })
};

const getMovies = (req, res, next) => {
  console.log('getMovies');
  Movie.find({})
    .then((movies) => {
      res.send({ movies });
    })
    .catch((err) => {
      // res.status(400).send(err);
      next(err);
    })
};

const deleteMovie = (req, res, next) => {
  console.log('deleteMovie');
  const { movieId } = req.params;
  console.log(movieId);
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new ErrorNotFound(MESSAGE.ERROR_PATH_NOT_FOUND));
      }
      if (movie.owner.equals(req.user._id)) {
        return movie.deleteOne()
          .then(() => {
            res.send(MESSAGE.SUCCESSFUL_REMOVE_OBJECT);
          })
          .catch((err) => {
            next(err);
          })
      }
      return Promise.reject(new ErrorForbidden(MESSAGE.ERROR_UPDATE_USER));
    })
    .catch((err) => {
      next(err);
    })
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};