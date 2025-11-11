import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  console.log("gg", genreData);

  const showGenre = (genreIdList) => {
    if (!genreData) return [];

    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
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
        <div>{movie.vote_average}</div>
        <div>{movie.popularity}</div>
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
