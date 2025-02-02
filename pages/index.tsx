import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

import styles from "../styles/Home.module.css";
import { styles as classes } from "../styles/Home.styles";
import {
  useMovies,
  useMoviesPopular,
  usePopularMovies,
} from "../hooks/movies.hooks";
import { useSeries, useSeriesPopular } from "../hooks/series.hooks";
import TileSlider from "../components/TileSlider/TileSlider";
import TvTileSlider from "../components/TvTileSlider/TvTileSlider";
import CustomHead from "../components/CustomHead/CustomHead";
import MovieSlider from "../components/MovieSlider/MovieSlider";
import SkeletonSlider from "../components/SkeletonSlider/SkeletonSlider";
import SkeletonMovieSlider from "../components/SkeletonMovieSlider/SkeletonMovieSlider";

type HomeProps = {};

const Home: NextPage<HomeProps> = () => {
  const { data: popularMovies, isLoading: isPopularLoading } =
    usePopularMovies();
  const { data: movieData, isLoading: isMoviesLoading } = useMovies();
  const { data: TopMovies, isLoading: isTopMoviesLoading } = useMoviesPopular();
  const { data: seriesData, isLoading: isSeriesLoading } = useSeries();
  const { data: TopSeries, isLoading: isTopSeriesLoading } = useSeriesPopular();
  // console.log("MovieDATA", movieData);
  // console.log("MovieDATA", toPercent(movieData[1].vote_average || 0));
  // console.log("seriesDATA", seriesData);

  return (
    <>
      <CustomHead title="MonkeyFlix - Home" media_type={"movie"} />

      <div className={styles.container}>
        {(isPopularLoading ||
          isMoviesLoading ||
          isSeriesLoading ||
          isTopMoviesLoading ||
          isTopSeriesLoading) && <LinearProgress />}

        <Box>
          {isPopularLoading ? (
            <SkeletonMovieSlider />
          ) : (
            <MovieSlider movieData={popularMovies?.pages[0].results} />
          )}
        </Box>
        <Box sx={{ ...classes.sliderContainerOverlay }}>
          <Box sx={{ ...classes.sliderContainer }}>
            <Box sx={{ textAlign: "start" }}>
              <Typography variant="h4" sx={classes.headTxt}>
                Trending Movies
              </Typography>
            </Box>

            {isMoviesLoading ? (
              <SkeletonSlider />
            ) : (
              <TileSlider movieData={movieData} />
            )}
          </Box>

          <Box sx={classes.sliderContainer}>
            <Box sx={{ textAlign: "start" }}>
              <Typography variant="h4" sx={classes.headTxt}>
                Trending Shows
              </Typography>
            </Box>

            {isSeriesLoading ? (
              <SkeletonSlider />
            ) : (
              <TvTileSlider seriesData={seriesData} />
            )}
          </Box>
          <Box sx={classes.sliderContainer}>
            <Box sx={{ textAlign: "start" }}>
              <Typography variant="h4" sx={classes.headTxt}>
                Top Movies
              </Typography>
            </Box>

            {isSeriesLoading ? (
              <SkeletonSlider />
            ) : (
              <TileSlider movieData={TopMovies} />
            )}
          </Box>
          <Box sx={classes.sliderContainer}>
            <Box sx={{ textAlign: "start" }}>
              <Typography variant="h4" sx={classes.headTxt}>
                Top Shows
              </Typography>
            </Box>

            {isSeriesLoading ? (
              <SkeletonSlider />
            ) : (
              <TvTileSlider seriesData={TopSeries} />
            )}
          </Box>
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

export default Home;
