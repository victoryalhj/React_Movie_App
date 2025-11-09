import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
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
          {movie.genre_ids.map((id) => (
            <Badge className="badge-area" bg="danger">
              {id}
            </Badge>
          ))}
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
