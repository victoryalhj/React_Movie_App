import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert, Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";
Dropdown.Item


const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const [showNoResult,setShowNoResult] = useState(false)
  const [page, setPage] = useState(1);

  const [sortBy,setSortBy] = useState("popularity.desc")
  const [genre,setGenre] = useState("")
  const genreMap = {
    "":"ALL",
    "28":"ACTION",
    "35":"COMEDY",
    "18":"DRAMA",
    "27":"HORROR",
  }

  const sortMap = {
    "popularity.desc": "POPULARITY (HIGH TO LOW)",
    "popularity.asc": "POPULARITY (LOW TO HIGH)",
  };

  const { data, isLoading, isError, error, refetch } = useSearchMovieQuery({
    keyword,
    page,
    sortBy,
    genre,
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
      <div className="filter-area" style={{margin:"20px 0"}}>
        <DropdownButton id="dropdown-sort" title={sortMap[sortBy]} variant="danger">
          <Dropdown.Item onClick={()=> setSortBy("popularity.desc")}>HIGH TO LOW</Dropdown.Item>
          <Dropdown.Item onClick={()=> setSortBy("popularity.asc")}>LOW TO HIGH</Dropdown.Item>
        </DropdownButton>

        <DropdownButton id="dropdown-genre" title={genreMap[genre]} variant="danger">
          <Dropdown.Item onClick={()=>setGenre("")}>ALL</Dropdown.Item>
          <Dropdown.Item onClick={()=>setGenre("28")}>ACTION</Dropdown.Item>
          <Dropdown.Item onClick={()=>setGenre("35")}>COMEDY</Dropdown.Item>
          <Dropdown.Item onClick={()=>setGenre("18")}>DRAMA</Dropdown.Item>
          <Dropdown.Item onClick={()=>setGenre("27")}>HORROR</Dropdown.Item>
        </DropdownButton>
      </div>

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
