import "../css/MovieCard.css";
import "../css/MovieModal.css";
import { useMovieContext  } from "../contexts/MovieContext";
import { useState } from "react";
import { getMovieVideos } from "../services/api";
import MovieModal from "./MovieModal";

function MovieCard({movie}) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  function onFavoriteClick (e) {
      e.preventDefault();
      if (favorite) {
          removeFromFavorites(movie.id);
      } else {
          addToFavorites(movie);
      }
  }

  async function onPlayClick(e) {
    e.preventDefault();
    try {
      const videos = await getMovieVideos(movie.id);
      // prefer YouTube trailers
      const yt = videos.find(v => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")) || videos.find(v => v.site === "YouTube");
      if (yt) {
        setVideoKey(yt.key);
      } else {
        setVideoKey(null);
      }
      setModalOpen(true);
    } catch (err) {
      console.error("Error fetching videos", err);
      setVideoKey(null);
      setModalOpen(true);
    }
  }

  return (
  <div className="movie-card">
    <div className="movie-poster">
      <img src={movie.poster_path ? ('https://image.tmdb.org/t/p/w500' + movie.poster_path) : '/placeholder.png'} alt={movie.title} />
      <div className="movie-overlay">
        <button
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={onFavoriteClick}
          aria-pressed={favorite}
          title={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span className="heart">{favorite ? "♥" : "♡"}</span>
        </button>

        {/* Play button */}
        <button className="play-btn" onClick={onPlayClick} title="Play trailer">
          ▶
        </button>
      </div>
    </div>

    <div className="movie-info">
      <h3>{movie.title}</h3>
      <p>{movie.release_date?.split("-")[0]}</p>
    </div>

    <MovieModal open={modalOpen} onClose={() => setModalOpen(false)} videoKey={videoKey} title={movie.title} />
  </div>
  );
}
export default MovieCard;