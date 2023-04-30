import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, CircularProgress, Typography } from "@mui/material";
import { styles as classes } from "./tvPoster.styles";
import { SeriesResult } from "../../types/apiResponses";
import { formatImgSrc, toPercent, toUrlFriendly } from "../../utils/utils";

type TvPosterProps = {
  singleShowData: SeriesResult;
};

const TvPoster = ({ singleShowData }: TvPosterProps) => {

  const { id, name, first_air_date, poster_path } = singleShowData;
  const titleConverted = toUrlFriendly(name);

  return (
    <Box sx={classes.poster}>
      <Link href={`/tv/${id}/${titleConverted}`} shallow>
        <Box sx={classes.posterUp}>
          <Image
            fill
            placeholder="blur"
            className="poster-img"
            blurDataURL={formatImgSrc('https://image.tmdb.org/t/p/w220_and_h330_face/', poster_path)}
            src={formatImgSrc('https://image.tmdb.org/t/p/w220_and_h330_face/', poster_path)}
            sizes={formatImgSrc('https://image.tmdb.org/t/p/w220_and_h330_face/', poster_path)}
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            alt={titleConverted}
          />
        </Box>
        <Box sx={classes.posterDown}>
          <Typography variant="subtitle2" sx={classes.posterTitle} title={name}>
            {name}
          </Typography>
          <Typography variant="subtitle2">
            {new Date(first_air_date).getFullYear()}
          </Typography>
        </Box>

        <Box sx={classes.ratings}>
          <Box sx={classes.ratingsInner}>
            <CircularProgress
              color="secondary"
              variant="determinate"
              value={toPercent(singleShowData.vote_average)}
            />
            <Box sx={classes.ratingsTxt}>
              <Typography
                title="Ratings"
                variant="caption"
                component="div"
                color="secondary"
              >{`${toPercent(singleShowData.vote_average)}%`}</Typography>
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default TvPoster;
