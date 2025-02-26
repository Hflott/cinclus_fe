// import Image from "next/image";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import "react-lazy-load-image-component/src/effects/blur.css";

import { styles as classes } from "./tvPoster.styles";
import { SeriesResult } from "../../types/apiResponses";
import { formatImgSrc, toUrlFriendly } from "../../utils/utils";

type TvPosterProps = {
  singleShowData: SeriesResult;
};

const TvPoster = ({ singleShowData }: TvPosterProps) => {
  const { id, name, first_air_date, poster_path } = singleShowData;
  const titleConverted = toUrlFriendly(name);

  return (
    <Box
      sx={{
        ...classes.poster,
        position: "relative",
        margin: { xs: 1, sm: 1.5, md: 2 },
        fontSize: "clamp(8px, 1.5vw, 20px)", // Base font-size for scaling
      }}
    >
      <Link
        shallow
        href={`/tv/${id}/${titleConverted}/season/1`}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Image Container - Size controlled by font-size */}
        <Box
          sx={{
            ...classes.posterUp,
            width: "14em", // 12 times base font-size
            height: "auto",
            aspectRatio: "2/3",
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
              placeholder="blur"
              quality={100}
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
            title={name}
          >
            {name}
          </Typography>

          <Box sx={classes.posterYearMain}>
            <Typography
              variant="subtitle2"
              sx={{
                ...classes.posterYear,
                fontSize: {
                  xs: "1.6em",
                  sm: "1.3em",
                  md: "1em",
                  lg: ".95em",
                },
                opacity: 0.8,
              }}
            >
              {new Date(first_air_date).getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default TvPoster;
