import { Box, Typography } from "@mui/material";
import React from "react";
import { styles as classes } from "./footer.styles";
import Image from "next/image";

// type Props = {}

const Footer = () => {
  return (
    <Box sx={classes.footerMain}>
      <Box sx={classes.footerInner}>
        <Box sx={classes.footerTop}>
          <Typography variant="h4" sx={classes.footerTopHead}>
            Grab yourself a &nbsp;
            <Box
              component="span"
              sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
            >
              <Image
                src="/icon.svg"
                alt="Icon"
                width={40}
                height={40}
                style={{ display: "inline-block", verticalAlign: "middle" }}
                quality={100}
              />
            </Box>
            &nbsp;and enjoy.
          </Typography>
        </Box>
        <Box sx={classes.footerBottom}>
          <Typography variant="subtitle2">
            This site does not store any files on it's server. All content is
            provided by non-affiliated third parties.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
