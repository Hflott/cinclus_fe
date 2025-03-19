import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Skeleton, useTheme } from "@mui/material";
import { styles as classes } from "./skeletonMovieSlider.styles";

const SkeletonMovieSlider = () => {
  const theme = useTheme();

  return (
    <Box sx={{ ...classes.mediaSlide }}>
      <div>
        <Slider>
          <div>
            <Box sx={classes.mediaItem}>
              {/* Full-view Image Skeleton */}
              <Box sx={classes.mediaItemImg}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{
                    position: "absolute",
                    bgcolor: "primary.main",
                    transform: "none",
                  }}
                />
              </Box>
            </Box>
          </div>
        </Slider>
      </div>
    </Box>
  );
};

export default SkeletonMovieSlider;
