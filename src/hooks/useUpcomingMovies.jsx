import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcomingMovies=()=>{
  return api.get(`/movie/upcoming`)
}

export const useUpcomingMoviesQuery=()=>{
  return useQuery({
    queryKey:['upcoming-movie'],
    queryFn:fetchUpcomingMovies,
    select:(result)=>result.data,
  })
}

export default useUpcomingMoviesQuery;