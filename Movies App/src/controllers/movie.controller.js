const movieModel = require("../models/movie.model");

const createMovie = async (req, res) => {
  const { title, description, author, company } = req.body;
  try {
    const newMovie = movieModel({
      title,
      description,
      author,
      company,
      user: req.user.id,
    });
    const savedMovie = await newMovie.save();
    res.send(savedMovie);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
const updateMovie = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).json({ msg: ["Id not found"] });
    }
    const movieFound = await movieModel
      .findByIdAndUpdate(id, req.body, { new: true })
      .populate("user");
    if (!movieFound) {
      return res.status(404).json({ msg: ["movie not found"] });
    }
    res.send(movieFound);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).json({ msg: ["Id not found"] });
    }
    const movieFound = await movieModel.findByIdAndDelete(id).populate("user");
    if (!movieFound) {
      return res.status(404).json({ msg: ["movie not found"] });
    }
    res.send("Movie deleted");
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
const getMovies = async (req, res) => {
  try {
    const movies = await movieModel
      .find({ user: req.user.id })
      .populate("user");
    if (!movies) {
      return res.status(404).json({ msg: "No movies" });
    }
    res.send(movies);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getJustMovie = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).json({ msg: ["Id not found"] });
    }
    const movieFound = await movieModel.findById(id).populate("user");
    if (!movieFound) {
      return res.status(404).json({ msg: ["movie not found"] });
    }
    res.send(movieFound);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { user } = req.params;
    const movies = await movieModel.find({ user: user }).populate("user");
    res.send(movies);
    return;
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getJustMovie,
  getMovies,
  getMovieById,
};
