import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { styles as classes } from "./movieSlider.styles";
import { MovieResult } from "../../types/apiResponses";
import { formatImgSrc, toUrlFriendly } from "../../utils/utils";
import Link from "next/link";
import { IconButton } from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      disableTouchRipple
      onClick={onClick}
      sx={{
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        height: "100%",
        px: "15px",
        borderRadius: 0,
        zIndex: 10,
        color: "white",
        background: "transparent",
        display: "flex",
        "& svg": {
          opacity: 0.5,
          fontSize: "2rem", // Control icon size
          position: "relative",
        },
        "&:hover": {
          "& svg": {
            opacity: 1,
          },
        },
      }}
    >
      <ArrowBackIos />
    </IconButton>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      disableTouchRipple
      onClick={onClick}
      sx={{
        position: "absolute",
        right: 0,
        top: "50%",
        height: "100%",
        transform: "translateY(-50%)",
        px: "15px",
        borderRadius: 0,
        zIndex: 10,
        color: "white",
        background: "transparent",
        display: "flex",
        "& svg": {
          opacity: 0.5,
          fontSize: "2rem", // Control icon size
          position: "relative",
        },
        "&:hover": {
          "& svg": {
            opacity: 1,
          },
        },
      }}
    >
      <ArrowForwardIos />
    </IconButton>
  );
};

type MovieSliderProps = {
  movieData?: MovieResult[];
};

const MovieSlider = ({ movieData = [] }: MovieSliderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sliderRef = useRef<any>(null);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const config = {
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    fade: true,
    dots: true,
    dotsClass: "slick-dots custom-dots",
    customPaging: (i: number) => {
      return <div className="custom-dot" onClick={() => handleDotClick(i)} />;
    },
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 8000,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    lazyLoad: "progressive" as const,
    beforeChange: (_current: number, next: number) => setActiveIndex(next),
    afterChange: (index: number) => setActiveIndex(index),
  };

  return (
    <Box sx={{ ...classes.mediaSlide, position: "relative" }}>
      <div>
        <Slider ref={sliderRef} {...config}>
          {movieData?.map(
            (
              {
                id,
                title,
                backdrop_path,
                overview,
                logo,
                vote_average,
                release_date,
              },
              i
            ) => (
              <div key={id}>
                <Box sx={classes.mediaItem}>
                  <Box sx={classes.mediaItemBanner}>
                    <Box sx={classes.mediaItemImg}>
                      <Box
                        sx={{
                          position: "relative", // Enable positioning for the pseudo-element
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <LazyLoadImage
                          src={formatImgSrc(
                            "https://image.tmdb.org/t/p/w1280",
                            backdrop_path
                          )}
                          alt={title}
                          effect="blur"
                          width="100%"
                          height="100%"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                        {/* Gradient Overlay */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background:
                              "linear-gradient(to top, rgba(27, 15, 42, 1), rgba(27, 15, 42, 0.5) 35%, rgba(27, 15, 42, 0) 85%, rgba(27, 15, 42, 1) 100%)",
                            pointerEvents: "none",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={classes.mediaItemContent}>
                    {/* Logo or Title */}
                    {logo ? (
                      <Box
                        sx={{
                          height: "100%",
                          width: "70%",
                          position: "relative",
                          mx: "auto",
                        }}
                      >
                        <LazyLoadImage
                          src={formatImgSrc(
                            "https://image.tmdb.org/t/p/original",
                            logo
                          )}
                          alt={`${title} logo`}
                          width="100%"
                          height="100%"
                          style={{ objectFit: "contain" }}
                        />
                      </Box>
                    ) : (
                      <Typography variant="h3" sx={classes.title}>
                        {title}
                      </Typography>
                    )}
                    {/* Horizontal White Line */}
                    <Box
                      sx={{
                        borderBottom: "2px solid white", // Vertical line style
                        mt: "10px",
                        opacity: 0.4,
                      }}
                    />
                    {/* Movie Info */}
                    <Box sx={classes.rating}>
                      <StarIcon sx={{ color: "gold", mr: 1 }} />
                      <Typography component="span" sx={{ color: "white" }}>
                        {vote_average?.toFixed(1)}
                      </Typography>
                      <Box
                        sx={{
                          borderLeft: "2px solid white", // Vertical line style
                          height: "18px", // Adjust the height to match the text size
                          mx: 2, // Add some margin to the left and right of the line
                          opacity: 0.4,
                        }}
                      />
                      <Typography component="span" sx={{ color: "white" }}>
                        {new Date(release_date).getFullYear()}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        borderTop: "2px solid white", // Vertical line style
                        mb: "10px",
                        opacity: 0.4,
                      }}
                    />

                    {/* Overview */}
                    <Typography variant="body1" sx={classes.overview}>
                      {overview}
                    </Typography>

                    {/* Buttons */}
                    <Box
                      sx={{
                        ...classes.miBtns,
                        flexDirection: "row",
                        gap: 2,
                        justifyContent: { xs: "center", md: "start" },
                        "& > *": {
                          width: { xs: "auto", md: "auto" },
                        },
                      }}
                    >
                      <Link
                        href={`/movie/${id}/${toUrlFriendly(title)}/watch`}
                        passHref
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={classes.watchBtn}
                          size={isMobile ? "medium" : "large"}
                        >
                          Watch now
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </div>
            )
          )}
        </Slider>
      </div>
    </Box>
  );
};

export default MovieSlider;
