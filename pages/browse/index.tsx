import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Collapse,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";

import Poster from "../../components/Poster/Poster";
import { styles as classes } from "../../styles/styles";
import Loader from "../../components/Loader/Loader";
import { usePopularMovies, useMovies } from "../../hooks/movies.hooks"; // Use the correct hook
import { usePopularSeries } from "../../hooks/series.hooks"; // Assuming this exists
import CustomHead from "../../components/CustomHead/CustomHead";
import { IConutry } from "../../utils/filterUtils";
import Filter from "../../components/Filter/Filter";
import { useInView } from "react-intersection-observer";
import { MovieResult, SeriesResult } from "../../types/apiResponses";
import TvPoster from "../../components/TvPoster/TvPoster";

// Define types for media selection
type MediaType = "movie" | "tv" | "all"; // Add "all" to the mediaType options

function Browse() {
  const [mediaType, setMediaType] = useState<MediaType>("all");
  const [country, setCountry] = useState<IConutry | undefined>();
  const [releaseYear, setReleaseYear] = useState<number | "">("");
  const [showFilters, setShowFilters] = useState(false); // State to toggle filter drawer
  const [genre, setGenre] = useState(""); // To store selected genre

  // Use the correct hook based on the mediaType selected
  const {
    data: popularMovies,
    isLoading: isLoadingMovies,
    fetchNextPage: fetchNextPageMovies,
    isFetching: isFetchingMovies,
    hasNextPage: hasNextPageMovies,
  } = usePopularMovies(releaseYear, country);

  const { data: allMovies, isLoading: isLoadingAllMovies } = useMovies(); // Fetch all movies if mediaType is 'all'

  const {
    data: popularSeries,
    isLoading: isLoadingSeries,
    fetchNextPage: fetchNextPageSeries,
    isFetching: isFetchingTVShows,
    hasNextPage: hasNextPageTVShows,
  } = usePopularSeries(releaseYear, country);

  // Set up the IntersectionObserver using react-intersection-observer
  const { ref, inView } = useInView({
    triggerOnce: false, // Allow triggering multiple times as the user keeps scrolling
    threshold: 0.9, // Trigger when 90% of the element is in view
  });

  // Automatically fetch more data when the "load more" button comes into view
  useEffect(() => {
    if (inView && !isFetchingMovies && hasNextPageMovies) {
      fetchNextPageMovies();
    }
    if (inView && !isFetchingTVShows && hasNextPageTVShows) {
      fetchNextPageSeries();
    }
  }, [
    inView,
    fetchNextPageMovies,
    fetchNextPageSeries,
    isFetchingMovies,
    isFetchingTVShows,
    hasNextPageMovies,
    hasNextPageTVShows,
  ]);

  // Determine which data to show based on mediaType
  const mediaData =
    mediaType === "movie"
      ? popularMovies?.pages
      : mediaType === "tv"
      ? popularSeries?.pages
      : [...(popularMovies?.pages || []), ...(popularSeries?.pages || [])];

  // Loading state
  const isLoading = isLoadingMovies || isLoadingSeries || isLoadingAllMovies;

  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title="Browse Movies and TV Shows" media_type={mediaType} />

      <Box sx={classes.pageContainer}>
        <Typography variant="h4" sx={classes.headTxt}>
          Browse
        </Typography>

        {/* Show Filters Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 2, // Add margin below the button for spacing
          }}
        >
          <Button
            variant="contained"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </Box>

        {/* Filter Collapse */}
        <Collapse in={showFilters} timeout="auto" unmountOnExit>
          <Filter
            country={country}
            setCountry={setCountry}
            releaseYear={releaseYear}
            setReleaseYear={setReleaseYear}
          />

          {/* Radio Group for Media Type */}
          <Box sx={{ mt: 2 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Select Media Type</FormLabel>
              <RadioGroup
                row
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value as MediaType)} // Correctly cast to MediaType
              >
                <FormControlLabel
                  value="movie"
                  control={<Radio />}
                  label="Movies"
                />
                <FormControlLabel
                  value="tv"
                  control={<Radio />}
                  label="TV Shows"
                />
                <FormControlLabel value="all" control={<Radio />} label="All" />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Radio Group for Genre */}
          <Box sx={{ mt: 2 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Select Genre</FormLabel>
              <RadioGroup
                row
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <FormControlLabel
                  value="action"
                  control={<Radio />}
                  label="Action"
                />
                <FormControlLabel
                  value="comedy"
                  control={<Radio />}
                  label="Comedy"
                />
                <FormControlLabel
                  value="drama"
                  control={<Radio />}
                  label="Drama"
                />
                {/* Add more genres as needed */}
              </RadioGroup>
            </FormControl>
          </Box>
        </Collapse>

        <Grid container sx={classes.moviesContainer}>
          {mediaType === "all" // When mediaType is "all", combine both movies and TV shows
            ? [...(popularMovies?.pages || []), ...(popularSeries?.pages || [])] // Combine movies and TV shows
                .map((page) =>
                  page.results.map((item) => {
                    if ("release_date" in item) {
                      // It's a MovieResult
                      return (
                        <Grid item key={item.id}>
                          <Poster singleMovieData={item as MovieResult} />{" "}
                          {/* Cast as MovieResult */}
                        </Grid>
                      );
                    } else {
                      // It's a SeriesResult
                      return (
                        <Grid item key={item.id}>
                          <TvPoster singleShowData={item as SeriesResult} />{" "}
                          {/* Cast as SeriesResult */}
                        </Grid>
                      );
                    }
                  })
                )
            : // If mediaType is either "movie" or "tv", only show that specific type
              mediaData?.map((page) =>
                page.results.map((item) => {
                  if ("release_date" in item) {
                    // It's a MovieResult
                    return (
                      <Grid item key={item.id}>
                        <Poster singleMovieData={item as MovieResult} />{" "}
                        {/* Cast as MovieResult */}
                      </Grid>
                    );
                  } else {
                    // It's a SeriesResult
                    return (
                      <Grid item key={item.id}>
                        <TvPoster singleShowData={item as SeriesResult} />{" "}
                        {/* Cast as SeriesResult */}
                      </Grid>
                    );
                  }
                })
              )}
        </Grid>

        {(mediaType === "movie" && hasNextPageMovies) ||
        (mediaType === "tv" && hasNextPageTVShows) ||
        (mediaType === "all" && (hasNextPageMovies || hasNextPageTVShows)) ? (
          <Grid container justifyContent="center" ref={ref}></Grid>
        ) : null}
      </Box>
    </>
  );
}

export default Browse;
