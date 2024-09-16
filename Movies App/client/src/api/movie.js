import axios from "./axios";

export const addMovie = (data) => axios.post("/movie", data);
export const updateMovie = (id, data) => axios.put(`/movie/${id}`, data);
export const deleteMovie = (id) => axios.delete(`/movie/${id}`);
export const getMovies = () => axios.get("/movie");
export const getMovie = (id) => axios.get(`/movie/${id}`);
export const getMovieByIdRequest = (user) => axios.get(`/movie-user/${user}`);
