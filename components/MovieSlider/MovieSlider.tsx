import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { styles as classes } from "./movieSlider.styles";
import { MovieResult } from "../../types/apiResponses";
import { formatImgSrc, toUrlFriendly } from "../../utils/utils";
import Link from "next/link";
import SliderDots from "../SliderDots/SliderDots";

type MovieSliderProps = {
  movieData?: MovieResult[];
};

const MovieSlider = ({ movieData }: MovieSliderProps) => {
  if (!movieData?.length) return null;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sliderRef = useRef<any>(null); // Create ref for the Slider

  const handleDotClick = (index: number) => {
    setActiveIndex(index); // Update the active dot
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index); // Navigate to the clicked index
    }
  };

  const config = {
    arrows: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 6000,
    cssEase: "ease",
    beforeChange: (current: number, next: number) => {
      setActiveIndex(next); // Set the active index during automatic transition
    },
    afterChange: (index: number) => {
      setActiveIndex(index); // Set the active index when the slide changes
    },
  };

  return (
    <Box sx={classes.mediaSlide}>
      <div>
        <Slider ref={sliderRef} {...config}>
          {movieData?.map(({ id, title, backdrop_path, overview }, i) => (
            <div key={id}>
              <Box sx={classes.mediaItem}>
                <Box sx={classes.mediaItemBanner}>
                  <Box sx={classes.mediaItemImg}>
                    <LazyLoadImage
                      src={formatImgSrc(
                        "https://image.tmdb.org/t/p/original",
                        backdrop_path
                      )}
                      style={{ objectFit: "cover", objectPosition: "top" }}
                      alt={title}
                      effect="blur"
                    />
                  </Box>
                </Box>
                <Box
                  className="media-item-content"
                  sx={classes.mediaItemContent}
                >
                  <Box sx={classes.miContent}>
                    <Typography variant="h4" sx={classes.title}>
                      {title}
                    </Typography>
                  </Box>
                  <Box sx={classes.miContent}>
                    <Typography variant="body1" sx={classes.overview}>
                      {overview}
                    </Typography>
                  </Box>
                  <Box sx={classes.miBtns}>
                    <Link
                      href={`/movie/${id}/${toUrlFriendly(title)}/watch`}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={classes.watchBtn}
                      >
                        Watch now
                      </Button>
                    </Link>
                    <Link
                      href={`/movie/${id}/${toUrlFriendly(title)}`}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        sx={classes.detailBtn}
                      >
                        Details
                      </Button>
                    </Link>
                  </Box>
                </Box>
                <Box sx={classes.dotsContainer}>
                  <SliderDots
                    activeIndex={activeIndex}
                    onDotClick={handleDotClick}
                    dotCount={movieData?.length || 0}
                  />
                </Box>
              </Box>
            </div>
          ))}
        </Slider>
      </div>
    </Box>
  );
};

export default MovieSlider;
