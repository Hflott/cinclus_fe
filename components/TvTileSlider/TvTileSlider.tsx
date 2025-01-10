import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { SeriesResult } from "../../types/apiResponses";
import TvPoster from "../TvPoster/TvPoster";
import { styles as classes } from "./tvTileSlider.styles";

type TvTileSliderProps = {
  title?: string;
  seriesData?: SeriesResult[];
};

const TvTileSlider = ({ title, seriesData }: TvTileSliderProps) => {
  if (!seriesData?.length) return null;

  // console.log("TileSlider", seriesData);
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
        slidesPerGroup: 2,
      },
      420: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      550: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      650: {
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
      1050: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      1280: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      1440: {
        slidesPerView: 6,
        slidesPerGroup: 6,
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
          {seriesData?.map((singleShowData, index) => (
            <SwiperSlide
              key={index}
              style={{ display: "grid", placeContent: "center" }}
            >
              <TvPoster singleShowData={singleShowData} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
};

export default TvTileSlider;
