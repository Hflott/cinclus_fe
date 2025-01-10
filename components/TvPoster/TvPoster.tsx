import React, { useState } from "react";
import Image from "next/image";
// import Image from "next/image";
import Link from "next/link";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { styles as classes } from "./tvPoster.styles";
import { SeriesResult } from "../../types/apiResponses";
import { formatImgSrc, rounded, toUrlFriendly } from "../../utils/utils";
import StarIcon from "@mui/icons-material/Star";

type TvPosterProps = {
  singleShowData: SeriesResult;
};

const TvPoster = ({ singleShowData }: TvPosterProps) => {
  const {
    id,
    name,
    first_air_date,
    poster_path,
    vote_average,
    overview,
    number_of_seasons,
  } = singleShowData;
  const titleConverted = toUrlFriendly(name);

  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <Box
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
      sx={classes.poster}
    >
      <Link
        shallow
        href={`/tv/${id}/${titleConverted}/season/1`}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Overlay with Movie Details */}
        {showOverlay && (
          <Box
            sx={{
              ...classes.overlay,
            }}
          >
            <Box sx={{ ...classes.overlayContent }}>
              <Typography variant="h6" gutterBottom>
                {name}
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
          {/* <Image
            fill
            placeholder="blur"
            className="poster-img"
            blurDataURL={blurData}
            src={formatImgSrc(
              "https://image.tmdb.org/t/p/w220_and_h330_face/",
              poster_path
            )}
            sizes={formatImgSrc(
              "https://image.tmdb.org/t/p/w220_and_h330_face/",
              poster_path
            )}
            style={{ objectFit: "cover", objectPosition: "top" }}
            alt={titleConverted}
          /> */}

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
          <Typography variant="subtitle2" sx={classes.posterTitle} title={name}>
            {name}
          </Typography>

          <Box sx={classes.posterYearMain}>
            <Typography variant="subtitle2" sx={classes.posterYear}>
              {new Date(first_air_date).getFullYear()}
            </Typography>
          </Box>
        </Box>
        {vote_average ? (
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
        ) : null}
      </Link>
    </Box>
  );
};

export default TvPoster;
