import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useSearchMovieQuery = ({ keyword, page, sortBy, genre }) => {
  const fetchSearchMovie = async () => {
    const finalSort = sortBy || "popularity.desc";
    const finalGenre = genre || "";

    if (!keyword) {
      const response = await api.get("discover/movie",{
        params: {
          page,
          sort_by: finalSort,
          with_genres: finalGenre,
        }
      });
      return response.data;
    } else {
      const response = await api.get("/search/movie",
         {params: {query:keyword,page},
        });
        
        let results = response.data.results;
 
        if(genre) {
          results = results.filter(movie =>
            movie.genre_ids.includes(Number(genre))
          )
        }

      if (sortBy === "popularity.asc") {
        results.sort((a, b) => a.popularity - b.popularity);
      } else {
        results.sort((a, b) => b.popularity - a.popularity);
      }
      return { ...response.data, results };
    }
  };

  return useQuery({
    queryKey: ["movie-search", keyword || "popular", page, sortBy, genre],
    queryFn: fetchSearchMovie,
  });
};

export default useSearchMovieQuery;
