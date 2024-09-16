import { createContext, useContext, useState } from "react";
import {
  addMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  getMovieByIdRequest,
} from "../api/movie";

const MovieContext = createContext();

export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("Where is the context?");
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [movie, setMovie] = useState([]);

  const getMoviesHere = async () => {
    try {
      const res = await getMovies();
      setMovie(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createMovies = async (data) => {
    try {
      const res = await addMovie(data);
      setMovie(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovieContext = async (id) => {
    try {
      const res = await deleteMovie(id);
      setMovie(movie.filter((item) => item._id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieContext = async (id) => {
    try {
      const res = await getMovie(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateMovieContext = async (id, values) => {
    try {
      await updateMovie(id, values);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieByUser = async (user) => {
    try {
      const res = await getMovieByIdRequest(user);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MovieContext.Provider
      value={{
        movie,
        setMovie,
        getMoviesHere,
        createMovies,
        deleteMovieContext,
        getMovieContext,
        updateMovieContext,
        getMovieByUser,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
