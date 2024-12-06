import React, { useRef } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
    slidesPerView: 6,
    slidesPerGroup: 6,
    speed: 600,
    pagination: false,
    navigation: true,
    loop: false,
    autoplay: false,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
      },
      420: {
        slidesPerView: 3,
      },
      550: {
        slidesPerView: 4,
      },
      650: {
        slidesPerView: 5,
      },
      786: {
        slidesPerView: 5,
      },
      900: {
        slidesPerView: 3,
      },
      1050: {
        slidesPerView: 4,
      },
      1280: {
        slidesPerView: 5,
      },
      1440: {
        slidesPerView: 6,
      },
    },
  };

  return (
    <Container maxWidth="xl">
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
