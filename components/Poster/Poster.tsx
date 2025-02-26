import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import "react-lazy-load-image-component/src/effects/blur.css";
import { styles as classes } from "./poster.styles";
import { MovieResult } from "../../types/apiResponses";
import { formatImgSrc, toUrlFriendly } from "../../utils/utils";

type PosterProps = {
  singleMovieData: MovieResult;
};

const Poster = ({ singleMovieData }: PosterProps) => {
  const { id, title, release_date, poster_path } = singleMovieData;
  const titleConverted = toUrlFriendly(title);

  return (
    <Box
      sx={{
        ...classes.poster,
        position: "relative",
        margin: { xs: 1, sm: 1.5, md: 2 },
        fontSize: "clamp(8px, 1.5vw, 20px)",
      }}
    >
      <Link
        shallow
        href={`/movie/${id}/${titleConverted}/watch`}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Image Container - Size controlled by font-size */}
        <Box
          sx={{
            ...classes.posterUp,
            width: "14em",
            aspectRatio: "2/3",
            position: "relative",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <Box sx={classes.posterImg}>
            <Image
              src={formatImgSrc(
                "https://image.tmdb.org/t/p/w220_and_h330_face/",
                poster_path
              )}
              alt={titleConverted}
              quality={100}
              placeholder="blur"
              blurDataURL={formatImgSrc(
                "https://image.tmdb.org/t/p/w500",
                poster_path
              )}
              width={220} // Adjust based on actual image size or container constraints
              height={330} // Adjust accordingly
              style={{
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                height: "100%",
              }}
              className="poster-img"
            />
          </Box>
        </Box>

        {/* Text Content - All sizes relative to base font-size */}
        <Box
          sx={{
            ...classes.posterDown,
            paddingTop: "1em", // Relative to font-size
            width: "12em", // Match image width
            margin: "0 auto",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              ...classes.posterTitle,
              fontSize: { xs: "1.8em", sm: "1.4em", md: "1.2em", lg: "1.05em" },
              lineHeight: 1.2,
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
                fontSize: {
                  xs: "1.6em",
                  sm: "1.2em",
                  md: "1em",
                  lg: "0.95em",
                },
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
