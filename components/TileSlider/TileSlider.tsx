import React from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, FreeMode } from "swiper/modules";
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
  if (!movieData?.length) return null;

  const sliderOptions = {
    speed: 600,
    navigation: !isMobile,
    freeMode: true,
    grabCursor: true,
    slidesPerView: "auto" as const,
    spaceBetween: theme.spacing(1),
  };

  return (
    <Container
      sx={{
        userSelect: "none",
        overflow: "visible",
        maxWidth: { xs: "100%", xl: "100vw" },
        position: "relative",
        px: { sm: 4 }, // Add horizontal padding
      }}
    >
      {title && (
        <Typography variant="h5" textAlign="center" sx={classes.headTxt}>
          {title}
        </Typography>
      )}

      <Box className="multi-slider" sx={{ width: "100%" }}>
        <Swiper
          {...sliderOptions}
          modules={[Autoplay, Navigation, FreeMode]}
          style={{ overflow: "visible" }} // Crucial for arrow visibility
        >
          {movieData?.map((singleMovieData, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                height: "auto", // Ensure consistent height
                width: "auto",
              }}
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
