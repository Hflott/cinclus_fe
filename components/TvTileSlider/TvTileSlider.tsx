import React from "react";
import {
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { Navigation, FreeMode } from "swiper/modules";
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

  const sliderOptions: SwiperOptions = {
    speed: 600,
    navigation: !isMobile,
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
          // Fix for slider overflow
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
        <Swiper {...sliderOptions} modules={[Navigation, FreeMode]}>
          {seriesData?.map((singleShowData, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                height: "auto",
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
