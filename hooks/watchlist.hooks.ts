import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { setNotify } from "../redux/notifySlice";
import {
  addToWatchlist,
  getWatchlist,
  getWatchlistById,
  removeFromWatchlist,
} from "../apis/watchlist.api";

export enum WatchlistQueryKey {
  WatchlistAll = "WatchlistAll",
  WatchlistById = "WatchlistById",
}

export const useWatchlist = () => {
  const { data: sessionData } = useSession();
  const token = sessionData?.user.authToken;

  return useInfiniteQuery({
    queryKey: [WatchlistQueryKey.WatchlistAll],
    queryFn: ({ pageParam = 1 }) => getWatchlist(token ?? "", pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    retry: false,
    enabled: !!token,
  });
};

export const useWatchlistById = (tmdbId: number | undefined) => {
  const { data: sessionData } = useSession();
  const token = sessionData?.user.authToken;

  return useQuery({
    queryKey: [WatchlistQueryKey.WatchlistById, tmdbId],
    queryFn: () => {
      if (!tmdbId) throw new Error("Missing TMDB ID");
      return getWatchlistById({ token: token ?? "", tmdbId });
    },
    retry: false,
    enabled: !!token && !!tmdbId,
  });
};

export const useAddToWatchlist = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToWatchlist,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [WatchlistQueryKey.WatchlistById],
      });
      queryClient.invalidateQueries({
        queryKey: [WatchlistQueryKey.WatchlistAll],
      });

      dispatch(
        setNotify({
          isOpen: true,
          message: data.message ?? "Added successfully",
          type: "success",
        })
      );
    },
    onError: (error: Error) => {
      dispatch(
        setNotify({
          isOpen: true,
          message: error.message,
          type: "error",
        })
      );
      console.error("Mutation error:", error);
    },
  });
};

export const useRemoveFromWatchlist = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromWatchlist,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [WatchlistQueryKey.WatchlistById],
      });
      queryClient.invalidateQueries({
        queryKey: [WatchlistQueryKey.WatchlistAll],
      });

      dispatch(
        setNotify({
          isOpen: true,
          message: data.message ?? "Removed successfully",
          type: "success",
        })
      );
    },
    onError: (error: Error) => {
      dispatch(
        setNotify({
          isOpen: true,
          message: error.message,
          type: "error",
        })
      );
      console.error("Mutation error:", error);
    },
  });
};
