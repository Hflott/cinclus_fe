import React, { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Grid } from "@mui/material";

import Loader from "../../components/Loader/Loader";
import TvPoster from "../../components/TvPoster/TvPoster";
import { styles as classes } from "../../styles/styles";
import { useRecentSeries } from "../../hooks/series.hooks";
import CustomHead from "../../components/CustomHead/CustomHead";
import { useInView } from "react-intersection-observer";

function Recent() {
  const {
    data: recentSeries,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useRecentSeries();
  // console.log('recentSeries: ', recentSeries)

  // Set up the IntersectionObserver using react-intersection-observer
  const { ref, inView } = useInView({
    triggerOnce: false, // Allow triggering multiple times as the user keeps scrolling
    threshold: 0.9, // Trigger when 90% of the element is in view
  });

  // Automatically fetch more movies when the "load more" button comes into view
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetching, hasNextPage]);

  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title="Most recent TV shows to watch." media_type="tv" />
      <Box sx={classes.pageContainer}>
        <Typography variant="h4" sx={classes.headTxt}>
          Most recent TV Shows
        </Typography>
        <Grid container sx={classes.moviesContainer}>
          {recentSeries?.pages.map((page) =>
            page.results.map((show) => (
              <Grid item key={show.id}>
                <TvPoster singleShowData={show} />
              </Grid>
            ))
          )}
        </Grid>
        {hasNextPage && (
          <Grid container justifyContent="center" ref={ref}></Grid>
        )}
      </Box>
    </>
  );
}

// Commented to Remove SSR
// export const getServerSideProps = withCSR(async () => {
//   const queryClient = new QueryClient();

//   try {
//     // fetching recent series detail
//     await queryClient.prefetchInfiniteQuery(
//       [SeriesQueryKey.RecentSeries],
//       ({ pageParam = 1 }) => getRecentSeries(pageParam),
//       {
//         getNextPageParam: (lastPage) => {
//           return lastPage.page < lastPage.total_pages
//             ? lastPage.page + 1
//             : undefined;
//         },
//       }
//     );

//     return {
//       props: {
//         dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       notFound: true,
//     };
//   }
// });

export default Recent;
