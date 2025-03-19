import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Poster from "../../components/Poster/Poster";
import { styles as classes } from "../../styles/styles";
import Loader from "../../components/Loader/Loader";
import { usePopularMovies } from "../../hooks/movies.hooks";
import CustomHead from "../../components/CustomHead/CustomHead";
import { ICountry } from "../../utils/filterUtils";
import Filter from "../../components/Filter/Filter";
import { useInView } from "react-intersection-observer";

function Popular() {
  const [country, setCountry] = useState<ICountry | undefined>();
  const [releaseYear, setReleaseYear] = useState<number | "">("");

  const {
    data: popularMovies,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = usePopularMovies(releaseYear, country);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.9,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetching, hasNextPage]);

  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title="Popular movies to watch." media_type={"movie"} />

      <Box sx={classes.pageContainer}>
        <Typography variant="h4" sx={classes.headTxt}>
          Popular movies
        </Typography>

        <Filter
          country={country}
          setCountry={setCountry}
          releaseYear={releaseYear}
          setReleaseYear={setReleaseYear}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Grid container spacing={2} sx={classes.moviesContainer}>
              {popularMovies?.pages.map((page) =>
                page.results.map((movie) => (
                  <Grid
                    item
                    key={movie.id}
                    xs={4} // 2 columns on extra small screens
                    sm={3} // 3 columns on small screens
                    md={2} // 4 columns on medium screen
                    lg={2}
                    xl={1}
                  >
                    <Poster singleMovieData={movie} />
                  </Grid>
                ))
              )}
            </Grid>
            {hasNextPage && (
              <Grid container justifyContent="center" ref={ref}>
                <LoadingButton
                  loading={isFetching}
                  variant="contained"
                  sx={{ margin: "20px 0" }}
                >
                  Load More
                </LoadingButton>
              </Grid>
            )}
          </>
        )}
      </Box>
    </>
  );
}

export default Popular;
