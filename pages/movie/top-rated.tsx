import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography, Grid } from "@mui/material";

import { styles as classes } from "../../styles/styles";
import Poster from "../../components/Poster/Poster";
import Loader from "../../components/Loader/Loader";
import { useTopMovies } from "../../hooks/movies.hooks";
import CustomHead from "../../components/CustomHead/CustomHead";
import { IConutry } from "../../utils/filterUtils";
import Filter from "../../components/Filter/Filter";
import { useInView } from "react-intersection-observer";

function TopRated() {
  const [country, setCountry] = useState<IConutry | undefined>();
  const [releaseYear, setReleaseYear] = useState<number | "">("");

  const {
    data: topMovies,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useTopMovies(releaseYear, country);

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
      <CustomHead title="Top rated movies to watch." media_type={"movie"} />
      <Box sx={classes.pageContainer}>
        <Typography variant="h4" sx={classes.headTxt}>
          Top rated movies
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
            <Grid container sx={classes.moviesContainer}>
              {topMovies?.pages.map((page) =>
                page.results.map((movie) => (
                  <Grid item key={movie.id}>
                    <Poster singleMovieData={movie} />
                  </Grid>
                ))
              )}
            </Grid>
            {hasNextPage && (
              <Grid container justifyContent="center" ref={ref}></Grid>
            )}
          </>
        )}
      </Box>
    </>
  );
}

// Commented to Remove SSR
// export const getServerSideProps = withCSR(async () => {
//   const queryClient = new QueryClient();

//   try {
//     // fetching top rated movies detail
//     await queryClient.prefetchInfiniteQuery(
//       [MovieQueryKey.TopMovies],
//       ({ pageParam = 1 }) => getTopMovies(pageParam),
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

export default TopRated;
