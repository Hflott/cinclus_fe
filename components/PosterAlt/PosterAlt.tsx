import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { styles as classes } from "./posterAlt.styles";
import { MovieResult } from "../../types/apiResponses";
import { formatImgSrc, toUrlFriendly } from "../../utils/utils";

type PosterAltProps = {
  singleMovieData: MovieResult;
};

const PosterAlt = ({ singleMovieData }: PosterAltProps) => {
  const { id, title, release_date, poster_path, vote_average } =
    singleMovieData;
  const titleConverted = toUrlFriendly(title);

  return (
    <Link href={`/movie/${id}/${titleConverted}`} style={{ display: "block" }}>
      <Grid container sx={classes.posterAlt}>
        <Grid item sx={classes.posterImg}>
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
            src={formatImgSrc(
              "https://image.tmdb.org/t/p/w220_and_h330_face/",
              poster_path
            )}
            style={{
              objectFit: "cover",
              objectPosition: "top",
              width: "100%",
              height: "100%",
            }}
            alt={titleConverted}
            effect="blur"
          />
        </Grid>
        <Grid item sx={classes.posterTxt}>
          <Typography variant="h6" sx={classes.posterTxtHead}>
            {title}
          </Typography>
          <Box sx={classes.posterTxtSub}>
            <Box>{release_date}</Box>
            <Box sx={classes.posterType}>Movie</Box>
            <Box>{`${vote_average * 10}%`}</Box>
          </Box>
        </Grid>
      </Grid>
    </Link>
  );
};

export default PosterAlt;
