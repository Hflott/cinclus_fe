import { Box, Skeleton, Container, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { styles as classes } from "./skeletonSlider.styles";

const SkeletonSlider = () => {
  const theme = useTheme();
  return (
    <Container
      sx={{
        ...classes.container,
      }}
    >
      <Box
        className="multi-slider"
        sx={{
          width: "100%",
          "& .swiper": {
            overflow: "visible",
            padding: theme.spacing(2, 0),
          },
          "& .swiper-slide": {
            width: "140px !important",
            [theme.breakpoints.up("xs")]: { width: "140px !important" },
            [theme.breakpoints.up("sm")]: { width: "180px !important" },
            [theme.breakpoints.up("md")]: { width: "220px !important" },
            [theme.breakpoints.up("lg")]: { width: "280px !important" },
          },
        }}
      >
        <Swiper slidesPerView="auto" spaceBetween={theme.spacing(2)}>
          {[...Array(6)].map((_, i) => (
            <SwiperSlide
              key={i}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={classes.tile}>
                <Skeleton variant="rounded" sx={classes.image} />
                <Box sx={classes.textContainer}>
                  <Skeleton
                    variant="text"
                    width="80%"
                    sx={{ fontSize: "1rem", bgcolor: "grey.800" }}
                  />
                  <Skeleton
                    variant="text"
                    width="60%"
                    sx={{ fontSize: "0.875rem", bgcolor: "grey.800", mt: 0.5 }}
                  />
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
};

export default SkeletonSlider;
