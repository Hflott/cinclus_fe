import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getMovies,
  getMovieById,
  getPopularMovies,
  getRecentMovies,
  getTopMovies,
} from "../apis/movies.api";
import { IConutry } from "../utils/filterUtils";

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
  return useQuery([MovieQueryKey.MovieData], getMovies);
};

export const useMovieById = (movieId?: string | string[]) => {
  return useQuery([MovieQueryKey.SingleMovieData, movieId], () =>
    getMovieById(movieId)
  );
};

export const usePopularMovies = (
  releaseYear?: number | "",
  country?: IConutry
) => {
  return useInfiniteQuery(
    [MovieQueryKey.PopularMovies, country, releaseYear],
    (props) => getPopularMovies(props),
    {
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
    }
  );
};

export const useRecentMovies = (
  releaseYear?: number | "",
  country?: IConutry
) => {
  return useInfiniteQuery(
    [MovieQueryKey.RecentMovies, country, releaseYear],
    (props) => getRecentMovies(props),
    {
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
    }
  );
};

export const useTopMovies = (releaseYear?: number | "", country?: IConutry) => {
  return useInfiniteQuery(
    [MovieQueryKey.TopMovies, country, releaseYear],
    (prop) => getTopMovies(prop),
    {
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
    }
  );
};
