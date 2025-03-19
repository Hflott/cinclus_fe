import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getPopularSeries,
  getRecentSeries,
  getSeries,
  getSeriesById,
  getSeriesSeasonById,
  getTopSeries,
  getSeriesTop,
} from "../apis/series.api";
import { ICountry } from "../utils/filterUtils";

export enum SeriesQueryKey {
  SeriesData = "SeriesData",
  SingleShowData = "SingleShowData",
  TvShowSeasonData = "TvShowSeasonData",
  PopularSeries = "PopularSeries",
  RecentSeries = "RecentSeries",
  TopSeries = "TopSeries",
}

export const useSeries = () => {
  return useQuery({
    queryKey: [SeriesQueryKey.SeriesData],
    queryFn: getSeries,
  });
};

export const useSeriesPopular = () => {
  return useQuery({
    queryKey: [SeriesQueryKey.TopSeries],
    queryFn: getSeriesTop,
  });
};

export const useSeriesById = (seriesId?: string | string[]) => {
  return useQuery({
    queryKey: [SeriesQueryKey.SingleShowData, seriesId],
    queryFn: () => getSeriesById(seriesId),
    enabled: !!seriesId, // Only fetch when seriesId exists
  });
};

export const useSeriesSeasonById = (
  seriesId: string | string[] | undefined,
  seasonCount: string | string[] | undefined
) => {
  return useQuery({
    queryKey: [SeriesQueryKey.TvShowSeasonData, seriesId, seasonCount],
    queryFn: () => getSeriesSeasonById(seriesId, seasonCount),
    enabled: !!seriesId && !!seasonCount, // Only fetch when both IDs exist
  });
};

export const usePopularSeries = (
  releaseYear?: number | "",
  country?: ICountry
) => {
  return useInfiniteQuery({
    queryKey: [SeriesQueryKey.PopularSeries, country, releaseYear],
    queryFn: getPopularSeries,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
};

export const useRecentSeries = (
  releaseYear?: number | "",
  country?: ICountry
) => {
  return useInfiniteQuery({
    queryKey: [SeriesQueryKey.RecentSeries, country, releaseYear],
    queryFn: getRecentSeries,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
};

export const useTopSeries = (releaseYear?: number | "", country?: ICountry) => {
  return useInfiniteQuery({
    queryKey: [SeriesQueryKey.TopSeries, country, releaseYear],
    queryFn: getTopSeries,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
};
