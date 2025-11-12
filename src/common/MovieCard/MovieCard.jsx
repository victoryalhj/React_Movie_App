import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const { data: genreData} = useMovieGenreQuery();

  console.log("movie title", movie?.title)
  console.log("genre ids",movie?.genre_ids)

  if(!movie ||!genreData) return null;

  const showGenre = (genreIdList) => {
    if (!Array.isArray(genreData) || genreData.length === 0) return [];

    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj? genreObj.name: "Unknown";
    });
    return genreNameList;
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h3>{movie.title}</h3>
        <div>
          {showGenre(movie.genre_ids).map((genre) => {
            return (
              <Badge className="badge-area" bg="danger">
                {genre}
              </Badge>
            );
          })}
        </div>
        <div><Badge bg="primary">⭐{movie.vote_average}</Badge></div>
        <div><Badge bg="success">🔥{Math.floor(movie.popularity)}</Badge></div>
        <div className="age-area">
          {movie.adult ? (
            <Badge bg="danger">OVER 18</Badge>
          ) : (
            <Badge bg="warning" text="dark">
              ALL
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
