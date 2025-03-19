import type { NextPage } from "next";
import { Box, Button, Grid, CircularProgress, Typography } from "@mui/material";

import styles from "../../styles/Home.module.css";
import { styles as classes } from "../../styles/Home.styles";
import {
  usePopularMovies,
  useRecentMovies,
  useTopMovies,
  useMovies,
} from "../../hooks/movies.hooks";
import TileSlider from "../../components/TileSlider/TileSlider";
import SkeletonSlider from "../../components/SkeletonSlider/SkeletonSlider";
import CustomHead from "../../components/CustomHead/CustomHead";

type MovieProps = {};

const Movies: NextPage<MovieProps> = () => {
  const { data: popularMovies, isLoading: isPopularLoading } =
    usePopularMovies();
  const { data: topMovies, isLoading: isTopLoading } = useTopMovies();
  const { data: recentMovies, isLoading: isRecentLoading } = useRecentMovies();
  const { data: movieData, isLoading: isMovieLoading } = useMovies();
  // console.log("MovieDATA", movieData);
  // console.log("MovieDATA", toPercent(movieData[1].vote_average || 0));
  // console.log("seriesDATA", seriesData);

  return (
    <>
      <CustomHead title="Movies to watch." media_type={"tv"} />
      <div className={styles.container}>
        {(isPopularLoading ||
          isMovieLoading ||
          isRecentLoading ||
          isTopLoading) && <CircularProgress />}
        <Box sx={{ ...classes.sliderContainer, m: "20px 0 60px 0" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={classes.headTxt}>
              Popular Movies
            </Typography>
          </Box>

          {isPopularLoading ? (
            <SkeletonSlider />
          ) : (
            <TileSlider movieData={popularMovies?.pages[0].results} />
          )}
          <Grid container justifyContent="center">
            <Button
              href="/movie/popular"
              color="secondary"
              variant="contained"
              size="large"
            >
              View more
            </Button>
          </Grid>
        </Box>

        <Box sx={{ ...classes.sliderContainer, m: "20px 0 60px 0" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={classes.headTxt}>
              Recently added
            </Typography>
          </Box>

          {isRecentLoading ? (
            <SkeletonSlider />
          ) : (
            <TileSlider movieData={recentMovies?.pages[0].results} />
          )}
          <Grid container justifyContent="center">
            <Button
              href="/movie/recent"
              color="secondary"
              variant="contained"
              size="large"
            >
              View more
            </Button>
          </Grid>
        </Box>

        <Box sx={{ ...classes.sliderContainer, m: "20px 0 60px 0" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={classes.headTxt}>
              Top Rated
            </Typography>
          </Box>

          {isTopLoading ? (
            <SkeletonSlider />
          ) : (
            <TileSlider movieData={topMovies?.pages[0].results} />
          )}
          <Grid container justifyContent="center">
            <Button
              href="/movie/top-rated"
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

export default Movies;
