import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Poster from "../Poster/Poster";
import { MovieResult } from "../../types/apiResponses";
import { styles as classes } from "./tileSlider.styles";

type TileSliderProps = {
  title?: string;
  movieData?: MovieResult[];
};

const TileSlider = ({ title, movieData }: TileSliderProps) => {
  if (!movieData?.length) return null;

  // console.log("TileSlider", movieData);
  const sliderOptions = {
    speed: 600,
    navigation: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      430: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      550: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      710: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      786: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      900: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1120: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      1340: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      1560: {
        slidesPerView: 6,
        slidesPerGroup: 6,
      },
      1800: {
        slidesPerView: 7,
        slidesPerGroup: 7,
      },
      2000: {
        slidesPerView: 8,
        slidesPerGroup: 8,
      },
      2200: {
        slidesPerView: 9,
        slidesPerGroup: 9,
      },
      2440: {
        slidesPerView: 10,
        slidesPerGroup: 10,
      },
      2800: {
        slidesPerView: 11,
        slidesPerGroup: 11,
      },
      3000: {
        slidesPerView: 12,
        slidesPerGroup: 12,
      },
      3200: {
        slidesPerView: 13,
        slidesPerGroup: 13,
      },
    },
  };

  return (
    <Container sx={{ maxWidth: { xs: "100%", xl: "100vw" } }}>
      {title && (
        <Typography variant="h5" textAlign="center" sx={classes.headTxt}>
          {title}
        </Typography>
      )}

      <Box className="multi-slider" sx={{ width: "100%" }}>
        <Swiper {...sliderOptions} modules={[Autoplay, Navigation]}>
          {movieData?.map((singleMovieData, index) => (
            <SwiperSlide
              key={index}
              style={{ display: "grid", placeContent: "center" }}
            >
              <Poster singleMovieData={singleMovieData} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
};

export default TileSlider;
