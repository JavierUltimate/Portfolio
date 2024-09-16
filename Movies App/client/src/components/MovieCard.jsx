import { Link } from "react-router-dom";
export function MovieCard({ movie }) {
  const imageUrl = "https://image.tmdb.org/t/p/w300" + movie.poster_path;

  return (
    <li className="bg-zinc-100 p-2 rounded-md transition hover:translate-y-[-5px]">
        <img
          width={230}
          height={345}
          src={imageUrl}
          alt={movie.title}
          className="movieImage"
        />
      <div className="pt-5">{movie.title}</div>
    </li>
  );
}
