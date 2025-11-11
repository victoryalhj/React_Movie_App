import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";


const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  const [showNoResult,setShowNoResult] = useState(false)

  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, refetch } = useSearchMovieQuery({
    keyword,
    page,
  });

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  useEffect(()=>{
    if(keyword && data && Array.isArray(data.results) && data.results.length === 0 && keyword) {
      setShowNoResult(true);

      const timer = setTimeout(() => {
        setShowNoResult(false);
        setQuery({});
        refetch();
      },3000)

      return ()=> clearTimeout(timer);
    }
  },[data,keyword,refetch,setQuery])

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  if (showNoResult) {
    return (
      <div className="no-result-area">
        <h1>No results</h1>
        <p>Redirecting to popular movies in 3 seconds...</p>
      </div>
    )
  }
  

  const pageCount = data?.total_pages ? Math.min(data.total_pages,500):1;

  return (
    <Container className="container-area">
      <Row>
        <Col lg={4} xs={12}></Col>

        <Col lg={8} xs={12}>
          <Row className="justify-content-center text-center">
            {data?.results.map((movie, index) => (
              <Col
                key={index}
                lg={4}
                xs={12}
                className="d-flex justify-content-center movie-page-area"
              >
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>

          <ReactPaginate
            breakLabel="..."
            nextLabel="▶"
            onPageChange={(selectedItem)=> setPage(selectedItem.selected+1)}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="◀"
            renderOnZeroPageCount={null}
            forcePage={page -1}
            activeClassName="active" 
            className="page-area"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
