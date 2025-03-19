import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { Box, Button, Grid, CircularProgress, Typography } from "@mui/material";

import styles from "../../styles/Home.module.css";
import { styles as classes } from "../../styles/Home.styles";
import {
  usePopularSeries,
  useRecentSeries,
  useTopSeries,
  useSeries,
} from "../../hooks/series.hooks";
import TvTileSlider from "../../components/TvTileSlider/TvTileSlider";
import SkeletonSlider from "../../components/SkeletonSlider/SkeletonSlider";
import CustomHead from "../../components/CustomHead/CustomHead";

type TvProps = {};

const Tv: NextPage<TvProps> = () => {
  const { data: popularSeries, isLoading: isPopularLoading } =
    usePopularSeries();
  const { data: topSeries, isLoading: isTopLoading } = useTopSeries();
  const { data: recentSeries, isLoading: isRecentLoading } = useRecentSeries();
  const { data: seriesData, isLoading: isSeriesLoading } = useSeries();
  // console.log("MovieDATA", movieData);
  // console.log("MovieDATA", toPercent(movieData[1].vote_average || 0));
  // console.log("seriesDATA", seriesData);

  return (
    <>
      <CustomHead title="Tv-shows to watch." media_type={"tv"} />
      <div className={styles.container}>
        {(isPopularLoading ||
          isSeriesLoading ||
          isRecentLoading ||
          isTopLoading) && <CircularProgress />}
        <Box sx={{ ...classes.sliderContainer, m: "20px 0 60px 0" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={classes.headTxt}>
              Popular Shows
            </Typography>
          </Box>

          {isRecentLoading ? (
            <SkeletonSlider />
          ) : (
            <TvTileSlider seriesData={popularSeries?.pages[0].results} />
          )}
          <Grid container justifyContent="center">
            <Button
              href="/tv/popular"
              color="secondary"
              variant="contained"
              size="large"
            >
              View more
            </Button>
          </Grid>
        </Box>

        <Box sx={classes.sliderContainer}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={classes.headTxt}>
              Recently added
            </Typography>
          </Box>

          {isSeriesLoading ? (
            <SkeletonSlider />
          ) : (
            <TvTileSlider seriesData={recentSeries?.pages[0].results} />
          )}
          <Grid container justifyContent="center">
            <Button
              href="/tv/recent"
              color="secondary"
              variant="contained"
              size="large"
            >
              View more
            </Button>
          </Grid>
        </Box>

        <Box sx={classes.sliderContainer}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={classes.headTxt}>
              Top Rated
            </Typography>
          </Box>

          {isTopLoading ? (
            <SkeletonSlider />
          ) : (
            <TvTileSlider seriesData={topSeries?.pages[0].results} />
          )}
          <Grid container justifyContent="center">
            <Button
              href="/tv/top-rated"
              color="secondary"
              variant="contained"
              size="large"
            >
              View more
            </Button>
          </Grid>
        </Box>
      </div>
    </>
  );
};

// Commented to Remove SSR
// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const queryClient = new QueryClient();

//   try {
//     await queryClient.prefetchInfiniteQuery(
//       [MovieQueryKey.PopularMovies],
//       ({ pageParam = 1 }) => getPopularMovies(pageParam),
//       {
//         getNextPageParam: (lastPage) => {
//           return lastPage.page < lastPage.total_pages
//             ? lastPage.page + 1
//             : undefined;
//         },
//       }
//     );

//     await queryClient.fetchQuery([MovieQueryKey.MovieData], getMovies);
//     await queryClient.fetchQuery([SeriesQueryKey.SeriesData], getSeries);
//     await queryClient.fetchQuery([PeopleQueryKey.PeopleData], getPeople);

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
// }

export default Tv;
