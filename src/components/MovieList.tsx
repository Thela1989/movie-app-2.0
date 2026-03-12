import { Link } from "react-router-dom";

// Definiera typen för en film
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// Definiera typen för props
interface MovieListProps {
  movies: Movie[];
  onSave: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = props => {
  return (
    <>
      {props.movies.map((movie: Movie) => (
        <div key={movie.imdbID} className="movie-wrapper">
          <div className="Movies">
            <Link to={`/movie/${movie.imdbID}`}>
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
                alt={movie.Title}
              />
            </Link>
            <div className="fav-btn">
              <button onClick={() => props.onSave(movie)}>
                Add to your favorites
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
