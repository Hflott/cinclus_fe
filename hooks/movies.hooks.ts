import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getMovies,
  getMovieById,
  getPopularMovies,
  getRecentMovies,
  getTopMovies,
  getMoviesTop,
} from "../apis/movies.api";
import { ICountry } from "../utils/filterUtils";

export enum MovieQueryKey {
  MovieData = "MovieData",
  MovieStreamable = "MovieStreamable",
  SingleMovieData = "SingleMovieData",
  PopularMovies = "PopularMovies",
  RecentMovies = "RecentMovies",
  TopMovies = "TopMovies",
  SearchQuery = "SearchQuery",
  SearchPageQuery = "SearchPageQuery",
}

export const useMovies = () => {
  return useQuery({
    queryKey: [MovieQueryKey.MovieData],
    queryFn: getMovies,
  });
};

export const useMoviesPopular = () => {
  return useQuery({
    queryKey: [MovieQueryKey.TopMovies],
    queryFn: getMoviesTop,
  });
};

export const useMovieById = (movieId?: string | string[]) => {
  return useQuery({
    queryKey: [MovieQueryKey.SingleMovieData, movieId],
    queryFn: () => {
      if (!movieId) throw new Error("No movie ID provided");
      return getMovieById(movieId);
    },
    enabled: !!movieId, // Only run when movieId exists
    retry: false,
  });
};

export const usePopularMovies = (
  releaseYear?: number | "",
  country?: ICountry
) => {
  return useInfiniteQuery({
    queryKey: [MovieQueryKey.PopularMovies, country, releaseYear],
    queryFn: getPopularMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
};

export const useRecentMovies = (
  releaseYear?: number | "",
  country?: ICountry
) => {
  return useInfiniteQuery({
    queryKey: [MovieQueryKey.RecentMovies, country, releaseYear],
    queryFn: getRecentMovies,
    initialPageParam: 1, // Add initial page parameter
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
};

export const useTopMovies = (releaseYear?: number | "", country?: ICountry) => {
  return useInfiniteQuery({
    queryKey: [MovieQueryKey.TopMovies, country, releaseYear],
    queryFn: getTopMovies,
    initialPageParam: 1, // Add initial page parameter
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
};
