import { useEffect, useState, useCallback } from "react";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import { Link } from "react-router-dom";

//  Här defineras typen
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  imdbRating?: number;
}
//Här skrivs funktion för home
const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  //Här hömtas filmer in från API
  const getMovieRequest = useCallback(async () => {
    if (searchValue.trim() === "") return;

    try {
      setError(null);
      const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=94a4025e`;
      const response = await fetch(url);
      const responseJson = await response.json();
      //Här kommer filmer hämtas om det finns filmer
      if (responseJson.Response === "True") {
        setMovies(responseJson.Search);
        //Om filmen inte finns komer det ett fel meddelande
      } else {
        setMovies([]);
        setError("Inga filmer hittades");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Något gick fel, försök igen senare");
    }
  }, [searchValue]);

  useEffect(() => {
    getMovieRequest();
  }, [getMovieRequest]);

  //här är kod för databasen//
  const saveToDatabase = async (movie: Movie) => {
    const savedMovie = {
      title: movie.Title,
      genre: "Okänd",
      rating: movie.imdbRating ?? 0,
      imdbID: movie.imdbID,
    };

    try {
      const response = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savedMovie),
      });

      if (response.status === 201) {
        console.log("Movie is saved");
      } else {
        console.error("Error saving movie");
      }
    } catch (err) {
      console.error("network error:", err);
    }
  };

  return (
    <div className="container-movie-app">
      <div className="text-center my-4">
        <MovieListHeading heading="Movies" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <Link to="/favorites" className="btn btn-outline-primary">
            Favorites
          </Link>
        </div>
      </div>

      {error && <p className="Error-Message">{error}</p>}
      <div className="MovieList">
        <MovieList movies={movies} onSave={saveToDatabase} />
      </div>
    </div>
  );
};

export default Home;
