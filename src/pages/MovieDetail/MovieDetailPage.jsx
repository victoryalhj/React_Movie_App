import React from "react";
import { Alert, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useMovieDetailQuery from "../../hooks/useMovieDetailQuery";
import './MovieDetailPage.style.css'

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="detail-area">
      <div className="poster-img">
        <img
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}`}
          alt=""
        />
      </div>

      <div className="detail-text-area">
        <div className="genre-area">
          {data.genres.map((genre, index) => (
               <Badge key={index} className="badge-area" bg="danger">
            {genre.name}
          </Badge>       
          ))}

        </div>
        <h1>{data.title}</h1>
        <div>
          <Badge className="vote-average-area" bg="primary">⭐{data.vote_average}</Badge> | {" "}
          <Badge className="popularity-area" bg="success">🔥{Math.floor(data.popularity)}</Badge>
        </div>
        <div className="overview-area">{data.overview}</div>
        <div>{}</div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
