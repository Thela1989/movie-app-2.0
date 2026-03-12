import { useState, useEffect } from "react";
import MovieListHeading from "./components/MovieListHeading";

import { Link, useParams } from "react-router-dom";
//Här defineras typen
interface MovieDetailProps {
  Title: string;
  Year: string;
  Genre: string;
  Plot: string;
  Poster: string;
  imdbID: string;
  Released: string;
  Awards: string;
  Actors: string;
  Director: string;
  Writer: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovies] = useState<MovieDetailProps | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=94a4025e`
      );
      const data = await response.json();
      setMovies(data);
    };
    fetchMovieDetails();
  }, [id]);
  if (!movie) return <p>Laddar...</p>;

  return (
    <div className="DetailsContainer">
      <Link to="/">Home</Link>
      <div className="">
        <MovieListHeading heading="Movies" />
      </div>
      <h1>{movie.Title}</h1>
      <p className="MoviePlot">{movie.Plot}</p>
      <p>Released{movie.Released}</p>
      <p>Genre: {movie.Genre}</p>
      <p>Director: {movie.Director}</p>
      <p>Writer: {movie.Writer}</p>
      <p>Actor: {movie.Actors}</p>
      <p>Awards: {movie.Awards}</p>

      <img className="DetailImage" src={movie.Poster} alt={movie.Title} />
    </div>
  );
};

export default MovieDetails;
