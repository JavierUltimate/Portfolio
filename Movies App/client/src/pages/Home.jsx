import React, { useEffect, useState } from "react";
import { Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { get } from "../utils/httpClient";
import { MovieCard } from "../components/MovieCard";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function Home() {
  const [movies, SetMovies] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  useEffect(() => {
    get("/discover/movie").then((data) => {
      SetMovies(data.results);
      
    });
  }, []);

  return (
    <div className="w-full p-10 min-h-[100vh] flex flex-col">
      <Typography
        variant="h1"
        sx={{
          fontSize: "30px",
          width: "100%",
        }}
      >
        Home
      </Typography>
      <span className="mt-2 flex flex-col justify-center" >
        Movies have been a beloved form of entertainment for over a century,
        captivating audiences worldwide with their ability to transport us to
        different worlds, evoke emotions, and tell compelling stories. The art
        of filmmaking has evolved significantly since the early days of silent
        films, with advancements in technology, storytelling techniques, and
        visual effects. Today, movies come in a wide variety of genres, from
        action-packed blockbusters to thought-provoking dramas, heart-warming
        comedies to spine-chilling horror films. Each genre offers a unique
        experience, catering to diverse tastes and preferences. Whether you're
       <p>in the mood for a thrilling adventure, a romantic escapade, or a deep
        exploration of the human condition, there's a movie out there for
        everyone. One of the most remarkable aspects of movies is their ability
        to bring people together. Watching a film in a theater, surrounded by
        fellow moviegoers,</p>  creates a shared experience that can foster a sense
        of community and connection. The collective laughter, gasps, and
        applause during a screening are a testament to the power of movies to
        unite us and spark conversations. Moreover, movies serve as a mirror to
        society, reflecting our values, beliefs, and cultural landscapes. They
        can challenge our perspectives, raise awareness about important issues,
        and inspire social change. From documentaries that shed light on
        real-world problems to fictional stories that explore universal themes,
        movies have the potential to educate, enlighten, and provoke thought. As
        technology continues to advance, the movie industry has adapted to new
        platforms and formats. The rise of streaming services has made it easier
       <p>than ever to access a vast library of films, allowing viewers to enjoy
        movies on their own terms. However, the magic of the big screen remains
        unparalleled, with the immersive experience of a darkened theater and
        the larger-than-life images creating an atmosphere that can't be
        replicated at home.</p>  In conclusion, movies are an integral part of our
        cultural fabric, serving as a source of entertainment, education, and
        inspiration. Whether you're a casual viewer or a passionate cinephile,
        the power of movies to captivate, challenge, and connect us is
        undeniable. As the industry continues to evolve, one thing remains
        certain: the enduring appeal of storytelling through the medium of film.
      </span>
      <Link to="/login" className="bg-yellow-600 transition hover:bg-yellow-700 w-[29%] p-2 text-center mt-10 ml-2 text-white transition hover:bg-green-600 rounded-md">Get Started</Link>
     
      <Typography
        variant="h1"
        sx={{
          fontSize: "30px",
          width: "100%",
          marginTop:"15vh",
          textAlign:'center'
        }}
      >
        Some Movies
      </Typography>
      <ul className="flex flex-wrap gap-2 justify-between mt-[10vh]">
      {movies.map((movie) => (
        <MovieCard key={movie.id}  movie={movie} />
      ))}
    </ul>
    <div style={{ display: isVisible ? 'block' : 'none', position: 'fixed', bottom: 20, right: 20 }}>
      <Fab color="warning" onClick={scrollToTop}>
        <NavigationIcon />
      </Fab>
    </div>
    </div>
  );
}
