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

const createMovie = (req, res, next) => {
  console.log('createMovie');
  console.log(req.body);
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
  Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
};

const getMovies = (req, res, next) => {
  console.log('getMovies');
  Movie.find({})
    .then((movies) => {
      res.send({ movies });
    })
    .catch((err) => {
      res.status(400).send(err);
    })
};

const deleteMovie = (req, res, next) => {
  console.log('deleteMovie');
  const { movieId } = req.params;
  console.log(movieId);
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return Promise.reject(new Error());
      }
      if (movie.owner.equals(req.user._id)) {
        return movie.deleteOne()
          .then(() => {
            res.send({ message: 'КИНОШКА УДАЛЕНА' });
          })
          .catch((err) => {
            res.status(400).send(err);
          })
      }
      return Promise.reject(new Error());
    })
    .catch((err) => {
      res.status(400).send(err);
    })
};

const functionNew = (req, res, next) => {
  console.log('functionNew');
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
  functionNew,
};