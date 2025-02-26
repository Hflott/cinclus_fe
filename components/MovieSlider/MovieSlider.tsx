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
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { styles as classes } from "./movieSlider.styles";
import { MovieResult } from "../../types/apiResponses";
import { formatImgSrc, toUrlFriendly } from "../../utils/utils";
import Link from "next/link";
import { IconButton } from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";

const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        height: "100%",
        px: "15px",
        borderRadius: "10%",
        zIndex: 10,
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0)",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
        display: { xs: "none", sm: "flex" },
        "& svg": {
          fontSize: "2rem", // Control icon size
          position: "relative",
          left: "6px", // Compensate for material icon offset
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
      onClick={onClick}
      sx={{
        position: "absolute",
        right: 0,
        top: "50%",
        height: "100%",
        borderRadius: "10%",
        transform: "translateY(-50%)",
        px: "15px",
        zIndex: 10,
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0)",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
        display: { xs: "none", sm: "flex" },
        "& svg": {
          fontSize: "2rem", // Control icon size
          position: "relative",
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

const MovieSlider = ({ movieData }: MovieSliderProps) => {
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
    customPaging: (i: number) => (
      <div
        className={`custom-dot ${activeIndex === i ? "active" : ""}`}
        onClick={() => handleDotClick(i)}
      />
    ),
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 6000,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    lazyLoad: "progressive" as const,
    beforeChange: (_current: number, next: number) => setActiveIndex(next),
    afterChange: (index: number) => setActiveIndex(index),
  };

  return (
    <Box sx={{ ...classes.mediaSlide, ...classes.customDots }}>
      <div>
        <Slider ref={sliderRef} {...config}>
          {movieData?.map(
            ({ id, title, backdrop_path, overview, logo, vote_average }, i) => (
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
                        <Image
                          src={formatImgSrc(
                            "https://image.tmdb.org/t/p/w1280",
                            backdrop_path
                          )}
                          alt={title}
                          fill
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          priority={i === 0}
                          loading={i === 0 ? "eager" : "lazy"}
                          quality={100}
                          placeholder="blur"
                          blurDataURL={formatImgSrc(
                            "https://image.tmdb.org/t/p/w500",
                            backdrop_path
                          )}
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
                              "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1) 20%, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 1) 100%)",
                            pointerEvents: "none", // Ensure the gradient doesn't interfere with interactions
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
                          width: { xs: "70%", md: "100%" },
                          height: { xs: 100, md: 140 },
                          position: "relative",
                          mx: { xs: "auto", md: 0 },
                          mb: 2,
                        }}
                      >
                        <Image
                          src={formatImgSrc(
                            "https://image.tmdb.org/t/p/original",
                            logo
                          )}
                          alt={`${title} logo`}
                          fill
                          quality={100}
                          style={{ objectFit: "contain" }}
                        />
                      </Box>
                    ) : (
                      <Typography
                        variant="h3"
                        sx={{
                          ...classes.title,
                          fontSize: { xs: "2rem", md: "3rem" },
                        }}
                      >
                        {title}
                      </Typography>
                    )}
                    <Box
                      sx={{
                        background: "rgba(0, 0, 0, 0.5)",
                        padding: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      {/* Rating */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          justifyContent: { xs: "center", md: "flex-start" },
                        }}
                      >
                        <StarIcon sx={{ color: "gold", mr: 1 }} />
                        <Typography
                          variant="h6"
                          component="span"
                          sx={{ color: "white" }}
                        >
                          {vote_average?.toFixed(1)}/10
                        </Typography>
                      </Box>

                      {/* Overview */}
                      <Typography
                        variant="body1"
                        sx={{
                          ...classes.overview,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          mb: 3,
                          display: "-webkit-box",
                          WebkitLineClamp: { xs: 3, md: 4 },
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {overview}
                      </Typography>
                    </Box>

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
                      <Link
                        href={`/movie/${id}/${toUrlFriendly(title)}`}
                        passHref
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          sx={classes.detailBtn}
                          size={isMobile ? "medium" : "large"}
                        >
                          Details
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
