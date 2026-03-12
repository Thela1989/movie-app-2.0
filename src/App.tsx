import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import MovieDetails from "./MovieDetails";
import Favorites from "./components/favorites";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
