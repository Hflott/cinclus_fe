import React from "react";
import {
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, FreeMode } from "swiper/modules";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  if (!seriesData?.length) return null;

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
          style={{ overflow: "visible" }}
        >
          {seriesData?.map((singleShowData, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                height: "auto", // Ensure consistent height
                width: "auto",
              }}
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
