import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useSearchMovieQuery = ({ keyword, page }) => {
  const fetchSearchMovie = async () => {
    if (!keyword) {
      const response = await api.get(`/movie/popular?page=${page}`);
      return response.data;
    } else {
      const response = await api.get(
        `/search/movie?query=${keyword}&page=${page}`
      );
      return response.data;
    }
  };

  return useQuery({
    queryKey: ["movie-search", keyword || "popular",page],
    queryFn: fetchSearchMovie,
  });
};


export default useSearchMovieQuery;