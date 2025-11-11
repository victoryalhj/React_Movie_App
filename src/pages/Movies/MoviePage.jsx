import React from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from 'react-paginate';
import "./MoviePage.style.css"

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword });
  console.log("dd", data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <Container className="container-area">
      <Row>
        <Col lg={4} xs={12}>
        </Col>

        <Col lg={8} xs={12}>
          <Row className="justify-content-center text-center">
            {data?.results.map((movie, index) => (
              <Col key={index} lg={4} xs={12} className="d-flex justify-content-center movie-page-area">
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
