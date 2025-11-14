import React, { useState } from "react";
import { Alert, Badge, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useMovieDetailQuery from "../../hooks/useMovieDetailQuery";
import "./MovieDetailPage.style.css";
import useMovieReviewQuery from "../../hooks/useMovieReviewQuery";
import useMovieVideoQuery from "../../hooks/useMovieVideosQuery";

const Review = ({ review }) => {
  const [expended, setExpended] = useState(false);
  const isLong = review.content.length > 200;
  return (
    <div className="review">
      <h4>{review.author}</h4>
      <p>
        {expended || !isLong
          ? review.content
          : review.content.slice(0, 200) + "..."}
      </p>
      {isLong && (
        <button className="button-area" onClick={() => setExpended(!expended)}>
          {expended ? "Collapse" : "Read More"}
        </button>
      )}
    </div>
  );
};

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailQuery(id);
  const { data: reviews } = useMovieReviewQuery(id);
  const { data: videos } = useMovieVideoQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container className="detail-area">
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
          <Badge className="vote-average-area" bg="primary">
            ⭐{data.vote_average}
          </Badge>{" "}
          |{" "}
          <Badge className="popularity-area" bg="success">
            🔥{Math.floor(data.popularity)}
          </Badge>
        </div>
        <div className="overview-area">{data.overview}</div>

        {videos?.length > 0 && (
          <div className="trailer-area">
            <h1>Trailer</h1>
            {videos.map(video => (
              <iframe
              className="each-trailer"
              key={video.id} src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                frameBorder="0"
                allowFullScreen></iframe>
            ))}
          </div>
        )}

        <div className="review-area">
          <h1>Reviews</h1>
          {reviews?.length === 0 && <p>No reviews available</p>}
          {reviews?.map((review) => (
            <div className="each-review">
              <Review key={review.id} review={review}></Review>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default MovieDetailPage;
