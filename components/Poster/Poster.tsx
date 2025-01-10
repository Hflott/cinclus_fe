import React, { useRef, useState } from "react";
import Link from "next/link";
import { Box, CircularProgress, Typography, Button, Grid } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { styles as classes } from "./poster.styles";
import { MovieResult } from "../../types/apiResponses";
import { formatImgSrc, rounded, toUrlFriendly } from "../../utils/utils";
import StarIcon from "@mui/icons-material/Star";

type PosterProps = {
  singleMovieData: MovieResult;
};

const Poster = ({ singleMovieData }: PosterProps) => {
  const { id, title, release_date, poster_path, vote_average, overview } =
    singleMovieData;
  const titleConverted = toUrlFriendly(title);

  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <Box
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
      sx={{
        ...classes.poster,
        position: "relative", // Ensure the overlay is correctly positioned
      }}
    >
      <Link
        shallow
        href={`/movie/${id}/${titleConverted}/watch`}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Overlay with Movie Details */}
        {showOverlay && (
          <Box
            sx={{
              ...classes.overlay,
            }}
          >
            <Box sx={{ ...classes.overlayContent, pointerEvents: "auto" }}>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ position: "relative", zIndex: 1 }}
              >
                {rounded(vote_average)}
                <StarIcon
                  sx={{
                    position: "relative",
                    top: 3,
                    left: 0,
                    fontSize: "1rem",
                  }}
                />
              </Typography>
              <Typography variant="body2" textAlign="left">
                {overview || "No description available."}
              </Typography>
            </Box>
          </Box>
        )}
        <Box sx={classes.posterUp}>
          <LazyLoadImage
            placeholderSrc="/assets/flixtr-placeholder.svg"
            src={formatImgSrc(
              "https://image.tmdb.org/t/p/w220_and_h330_face/",
              poster_path
            )}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
              height: "100%",
            }}
            className="poster-img"
            alt={titleConverted}
            effect="blur"
          />
        </Box>
        <Box sx={classes.posterDown}>
          <Typography
            variant="subtitle2"
            sx={classes.posterTitle}
            title={title}
          >
            {title}
          </Typography>
          <Box sx={classes.posterYearMain}>
            <Typography variant="subtitle2" sx={classes.posterYear}>
              {new Date(release_date).getFullYear()}
            </Typography>
          </Box>
        </Box>
        {vote_average > 0 && (
          <Box sx={classes.ratings}>
            <Box sx={classes.ratingsInner}>
              <CircularProgress
                color="secondary"
                variant="determinate"
                value={rounded(vote_average * 10)}
              />
              <Box sx={classes.ratingsTxt}>
                <Typography
                  title="Ratings"
                  variant="caption"
                  component="div"
                  color="secondary"
                >
                  {rounded(vote_average)}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Link>
    </Box>
  );
};

export default Poster;
