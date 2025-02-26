import type { NextPage } from "next";
import { Box, LinearProgress, Typography, useTheme } from "@mui/material";
import styles from "../styles/Home.module.css";
import { styles as classes } from "../styles/Home.styles";
import {
  usePopularMovies,
  useMovies,
  useMoviesPopular,
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
  const theme = useTheme();
  const { data: popularMovies, isLoading: isPopularLoading } =
    usePopularMovies();
  const { data: movieData, isLoading: isMoviesLoading } = useMovies();
  const { data: TopMovies, isLoading: isTopMoviesLoading } = useMoviesPopular();
  const { data: seriesData, isLoading: isSeriesLoading } = useSeries();
  const { data: TopSeries, isLoading: isTopSeriesLoading } = useSeriesPopular();

  return (
    <>
      <CustomHead title="MonkeyFlix - Home" media_type={"movie"} />
      <div className={styles.container}>
        {/* Loading Indicator */}
        {(isPopularLoading ||
          isMoviesLoading ||
          isSeriesLoading ||
          isTopMoviesLoading ||
          isTopSeriesLoading) && <LinearProgress />}

        {/* Movie Slider (Main Hero Section) */}
        <Box sx={classes.movieSliderContainer}>
          {isPopularLoading ? (
            <SkeletonMovieSlider />
          ) : (
            <MovieSlider movieData={popularMovies?.pages[0].results} />
          )}
        </Box>

        {/* Tile Sliders (Overlapping Section) */}
        <Box sx={classes.tileSlidersContainer}>
          {/* Trending Movies */}
          <Box sx={classes.sliderContainer}>
            <Typography variant="h4" sx={classes.headTxt}>
              Trending Movies
            </Typography>
            {isMoviesLoading ? (
              <SkeletonSlider />
            ) : (
              <TileSlider movieData={movieData} />
            )}
          </Box>

          {/* Trending Shows */}
          <Box sx={classes.sliderContainer}>
            <Typography variant="h4" sx={classes.headTxt}>
              Trending Shows
            </Typography>
            {isSeriesLoading ? (
              <SkeletonSlider />
            ) : (
              <TvTileSlider seriesData={seriesData} />
            )}
          </Box>

          {/* Top Movies */}
          <Box sx={classes.sliderContainer}>
            <Typography variant="h4" sx={classes.headTxt}>
              Top Movies
            </Typography>
            {isTopMoviesLoading ? (
              <SkeletonSlider />
            ) : (
              <TileSlider movieData={TopMovies} />
            )}
          </Box>

          {/* Top Shows */}
          <Box sx={classes.sliderContainer}>
            <Typography variant="h4" sx={classes.headTxt}>
              Top Shows
            </Typography>
            {isTopSeriesLoading ? (
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

export default Home;
