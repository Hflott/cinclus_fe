import React, { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import Poster from "../Poster/Poster";
import { MovieResult } from "../../types/apiResponses";
import { styles as classes } from "./tileSlider.styles";

type TileSliderProps = {
  title?: string;
  movieData?: MovieResult[];
};

const TileSlider = ({ title, movieData }: TileSliderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const swiperRef = useRef<any>(null);

  if (!movieData?.length) return null;

  const sliderOptions: SwiperOptions = {
    speed: 600,
    navigation: !isMobile
      ? {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      : false,
    freeMode: true,
    grabCursor: true,
    slidesPerView: "auto",
    spaceBetween: theme.spacing(2),
    breakpoints: {
      920: { slidesPerGroup: 5 },
      1347: { slidesPerGroup: 6 },
    },
  };

  return (
    <Container
      sx={{
        userSelect: "none",
        overflow: "visible",
        maxWidth: { xs: "100%", xl: "100vw" },
        position: "relative",
        px: { sm: 4 },
      }}
    >
      {title && (
        <Typography variant="h5" textAlign="center" sx={classes.headTxt}>
          {title}
        </Typography>
      )}

      <Box
        className="multi-slider"
        sx={{
          width: "100%",
          position: "relative",
          "& .swiper": {
            overflow: "visible",
            padding: theme.spacing(2, 0),
          },
          // Match Grid sizing
          "& .swiper-slide": {
            width: "120px !important",
            [theme.breakpoints.up("xs")]: { width: "120px !important" },
            [theme.breakpoints.up("sm")]: { width: "160px !important" },
            [theme.breakpoints.up("md")]: { width: "160px !important" },
            [theme.breakpoints.up("lg")]: { width: "200px !important" },
          },
        }}
      >
        <Swiper
          {...sliderOptions}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, FreeMode]}
        >
          {movieData?.map((singleMovieData, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                height: "auto",
              }}
            >
              <Poster singleMovieData={singleMovieData} />
            </SwiperSlide>
          ))}
          {!isMobile && (
            <>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </>
          )}
        </Swiper>
      </Box>
    </Container>
  );
};

export default TileSlider;
