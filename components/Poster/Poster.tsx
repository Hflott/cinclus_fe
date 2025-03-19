import Link from "next/link";
import { Box, Typography } from "@mui/material";
import "react-lazy-load-image-component/src/effects/blur.css";
import { styles as classes } from "./poster.styles";
import { MovieResult } from "../../types/apiResponses";
import { formatImgSrc, toUrlFriendly } from "../../utils/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";

type PosterProps = {
  singleMovieData: MovieResult;
};

const Poster = ({ singleMovieData }: PosterProps) => {
  const { id, title, release_date, poster_path } = singleMovieData;
  const titleConverted = toUrlFriendly(title);

  return (
    <Box sx={classes.poster}>
      <Link
        shallow
        href={`/movie/${id}/${titleConverted}/watch`}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Image Container - Controlled by Grid */}
        <Box
          sx={{
            ...classes.posterUp,
            width: "100%", // Fill Grid item width
            aspectRatio: "2/3", // Maintain poster ratio
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={classes.posterImg}>
            <LazyLoadImage
              src={formatImgSrc(
                "https://image.tmdb.org/t/p/w220_and_h330_face/",
                poster_path
              )}
              alt={titleConverted}
              effect="blur"
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Box>
        </Box>

        {/* Text Content - Fixed font sizes */}
        <Box
          sx={{
            ...classes.posterDown,
            paddingTop: 1, // Use theme spacing (8px)
            width: "100%",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              ...classes.posterTitle,
              fontSize: "1rem", // Fixed size
              lineHeight: 1.2,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            title={title}
          >
            {title}
          </Typography>

          <Box sx={classes.posterYearMain}>
            <Typography
              variant="subtitle2"
              sx={{
                ...classes.posterYear,
                fontSize: "0.875rem", // Fixed size
                opacity: 0.8,
              }}
            >
              {new Date(release_date).getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default Poster;
