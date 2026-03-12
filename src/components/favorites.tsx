import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface FavoriteMovie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  imdbID: string;
}
const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    try {
      const res = await fetch("http://localhost:3000/movies");
      const data = await res.json();
      setFavorites(data);
    } catch (err) {
      setError("Kunde inte hämta favoriter");
    }
  };
  const deleteFavorite = async (imdbID: string) => {
    try {
      const res = await fetch(`http://localhost:3000/movies/${imdbID}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFavorites(prev => prev.filter(movie => movie.imdbID !== imdbID));
      } else {
        console.error("Kunde inte ta bort filmen");
      }
    } catch (err) {
      console.error("Nätverksfel vid borttagning av film");
    }
  };
  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="favorites-container">
      <Link to="/" className="btn btn-outline-primary">
        Hem
      </Link>

      <h2>Dina favoriter</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {favorites.length === 0 ? (
        <p>Du har inga sparade filmer ännu</p>
      ) : (
        <ul>
          {favorites.map(movie => (
            <li key={movie.imdbID}>
              <strong>{movie.title}</strong> ({movie.genre}) - Betyg:{" "}
              {movie.rating}
              <button onClick={() => deleteFavorite(movie.imdbID)}>
                Ta bort
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Favorites;
