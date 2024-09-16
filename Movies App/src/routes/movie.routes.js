const { Router } = require("express");
const { validateToken } = require("../middlewares/validateToken");
const {
  createMovie,
  updateMovie,
  deleteMovie,
  getJustMovie,
  getMovies,
  getMovieById,
} = require("../controllers/movie.controller");
const { validateSchema } = require("../middlewares/validate.schema");
const { createValidator } = require("../validators/movie.validator");
const { isAdmin } = require("../middlewares/isAdmin");
const movieRouter = Router();

movieRouter.post(
  "/movie",
  validateToken,
  validateSchema(createValidator),
  createMovie
);
movieRouter.put(
  "/movie/:id",
  validateToken,
  validateSchema(createValidator),
  updateMovie
);
movieRouter.delete("/movie/:id", validateToken, deleteMovie);
movieRouter.get("/movie", validateToken, getMovies);

movieRouter.get("/movie/:id", validateToken, getJustMovie);
movieRouter.get("/movie-user/:user", validateToken, isAdmin, getMovieById);

module.exports = movieRouter;
