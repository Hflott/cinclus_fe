import { Box, Typography, Grid, Link as MuiLink } from "@mui/material";
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
            Stream everything on MonkeyFlix
          </Typography>
          <Grid container sx={classes.socials}>
            <Grid item>
              <MuiLink
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                // sx={classes.sociallink}
              >
                <Image
                  src="/assets/fb.svg"
                  alt="facebookLogo"
                  style={classes.socialLogo}
                  width={185}
                  height={100}
                  quality={100}
                />
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                // sx={classes.sociallink}
              >
                <Image
                  src="/assets/twt.svg"
                  alt="twitterLogo"
                  style={classes.socialLogo}
                  width={185}
                  height={100}
                  quality={100}
                />
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                // sx={classes.sociallink}
              >
                <Image
                  src="/assets/insta.svg"
                  alt="instagramLogo"
                  style={classes.socialLogo}
                  width={185}
                  height={100}
                  quality={100}
                />
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                // sx={classes.sociallink}
              >
                <Image
                  src="/assets/yt.svg"
                  alt="ytlogo"
                  style={classes.socialLogo}
                  width={185}
                  height={100}
                  quality={100}
                />
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
        <Box sx={classes.footerBottom}>
          <Grid container sx={classes.footerLinksMob}>
            <MuiLink
              href="/"
              target="_blank"
              rel="noreferrer"
              sx={classes.altlink}
              underline="hover"
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Help
              </Typography>
            </MuiLink>
            <MuiLink
              href="/"
              target="_blank"
              rel="noreferrer"
              sx={classes.altlink}
              underline="hover"
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Terms of use
              </Typography>
            </MuiLink>
            <MuiLink
              href="/"
              target="_blank"
              rel="noreferrer"
              sx={classes.altlink}
              underline="hover"
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Privacy Policy
              </Typography>
            </MuiLink>
          </Grid>

          <Grid container sx={classes.footerLinks}>
            <Grid item sx={classes.footerCol}>
              <Typography variant="h6" sx={classes.footerColHead}>
                About us
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>
                Advertise with us
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>
                Press Releases
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>
                Top stories
              </Typography>
            </Grid>
            <Grid item sx={classes.footerCol}>
              <Typography variant="h6" sx={classes.footerColHead}>
                MonkeyFlix for Business
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>
                What we offer
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>
                About us
              </Typography>
            </Grid>
            <Grid item sx={classes.footerCol}>
              <Typography variant="h6" sx={classes.footerColHead}>
                Need our help?
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>
                FAQs
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>
                Contact us
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>
                Find a store
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
