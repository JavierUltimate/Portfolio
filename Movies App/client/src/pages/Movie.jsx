import React, { useEffect, useState } from "react";

import { useMovie } from "../context/MovieContext";
import CardNew from "../components/CardNew";
import { Button } from "@mui/material";
import AccordionCard from "../components/AcordionCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Movie() {
  const { movie, getMoviesHere } = useMovie();
  const { isAdmin } = useAuth();
  const navigate=useNavigate()
  useEffect(() => {
    getMoviesHere();
  }, []);


  if (!movie || movie.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[100vh] b">
        <span className="border-2 p-2 rounded-md">No Movies</span>
      </div>
    );
  }
  return (
    <div className="bg-[url('/assets/fondo.jpg')] flex-col-reverse sm:flex-row bg-cover bg-center min-h-[100vh] w-[100%]  flex justify-between ">
      <div className="w-[100%]  grid justify-center items-start grid-cols-1   xl:grid-cols-3">
        {Array.isArray(movie) &&
          movie.map((item, i) => <CardNew item={item} key={i} />)}
      </div>
      <div className="bg-[rgb(23,23,34)] w-[100%] md:w-[40%] max-h-[100vh] ">
        <div className="flex flex-col gap-2 p-2">
          {Array.isArray(movie) &&
            movie.map((item, i) => <AccordionCard item={item} key={i} />)}
        </div>
      </div>
    </div>
  );
}
