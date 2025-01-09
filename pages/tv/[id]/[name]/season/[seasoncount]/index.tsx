import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { SeriesResult } from "../../../../../../types/apiResponses";
import { styles as classes } from "../../../../../../styles/SeasonCount.styles";
import TvTileSlider from "../../../../../../components/TvTileSlider/TvTileSlider";
import {
  useSeriesById,
  useSeriesSeasonById,
} from "../../../../../../hooks/series.hooks";
import CustomHead from "../../../../../../components/CustomHead/CustomHead";
import { convertToNumber } from "../../../../../../utils/utils";
import DisqusComments from "../../../../../../components/Disqus/Disqus";
import EpisodeList from "../../../../../../components/EpisodeList/EpisodeList";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

function SeasonCount() {
  const router = useRouter();

  const { id, name, seasoncount, e, p } = router.query;
  const [ep, setEp] = useState(1);
  const [player, setPlayer] = useState<1 | 2 | 3 | 4 | 5>(1);

  const { data: tvShowSeasonData, isLoading: isSeasonLoading } =
    useSeriesSeasonById(id, seasoncount);
  const { data: tvShowData, isLoading: isShowLoading } = useSeriesById(id);

  useEffect(() => {
    const eNum = convertToNumber(e);
    const pNum = convertToNumber(p);

    if (eNum) setEp(eNum);
    if (pNum) {
      if (pNum === 1) setPlayer(pNum);
      if (pNum === 2) setPlayer(pNum);
      if (pNum === 3) setPlayer(pNum);
      if (pNum === 4) setPlayer(pNum);
      if (pNum === 5) setPlayer(pNum);
    }
  }, [isShowLoading]);

  if (isSeasonLoading || isShowLoading) return <LinearProgress />;

  const {
    recommendations,
    similar,
    name: showTitle,
  } = tvShowData as SeriesResult;

  // console.log(router.query);
  // console.log("tvShowData", tvShowData);
  // console.log('tvShowSeasonData', tvShowSeasonData)

  const changePlayer = (playerId: typeof player) => {
    setPlayer((prevPlayerId) => {
      if (prevPlayerId === playerId) return prevPlayerId;

      router.replace(
        {
          pathname: router.asPath.split("?")[0],
          query: { e: ep, p: playerId },
        },
        undefined,
        {
          shallow: true,
        }
      );

      return playerId;
    });
  };

  return (
    <>
      <CustomHead
        title={`Watching season ${seasoncount} episode ${ep} of ${showTitle}`}
        media_type="tv"
      />
      <Grid container>
        <Grid item sx={classes.watchHead}>
          <Link href={`/tv/${id}/${name}`} className="backToInfo">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ArrowBackIosNewIcon sx={classes.backIco} />}
              size="small"
            >
              Back to show details
            </Button>
          </Link>
          <Typography sx={{ textTransform: "capitalize", paddingLeft: "10px" }}>
            Watching season {seasoncount} episode {ep} of{" "}
            {typeof name === "string" && name?.replaceAll("-", " ")}
          </Typography>
        </Grid>
        <Grid sx={classes.moviePlayer}>
          <Grid
            container
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Grid item xs={9} sx={{ padding: "10px" }}>
              {/* <iframe
            allowFullScreen
            id="watch-iframe"
            src={`${process.env.NEXT_PUBLIC_Player_URL}/tv?id=${id}&s=${
              seasoncount ? seasoncount : 1
            }&e=${ep}`}
          ></iframe> */}

              {player === 1 && (
                <iframe
                  allowFullScreen
                  id="watch-iframe1"
                  src={`${process.env.NEXT_PUBLIC_Player_URL_VS}/${id}/${
                    seasoncount ? seasoncount : 1
                  }-${ep}/color-ADDC35`}
                ></iframe>
              )}

              {player === 2 && (
                <iframe
                  allowFullScreen
                  id="watch-iframe2"
                  src={`${
                    process.env.NEXT_PUBLIC_Player_URL_SE
                  }video_id=${id}&tmdb=1&s=${
                    seasoncount ? seasoncount : 1
                  }&e=${ep}`}
                ></iframe>
              )}

              {player === 3 && (
                <iframe
                  allowFullScreen
                  id="watch-iframe3"
                  src={`${process.env.NEXT_PUBLIC_Player_URL_EM}tv/${id}/${
                    seasoncount ? seasoncount : 1
                  }/${ep}`}
                ></iframe>
              )}

              {player === 4 && (
                <iframe
                  allowFullScreen
                  id="watch-iframe4"
                  src={`${process.env.NEXT_PUBLIC_Player_URL_VL}tv/${id}/${
                    seasoncount ? seasoncount : 1
                  }/${ep}`}
                ></iframe>
              )}

              {player === 5 && (
                <iframe
                  allowFullScreen
                  id="watch-iframe5"
                  src={`${
                    process.env.NEXT_PUBLIC_Player_URL_SEVIP
                  }video_id=${id}&tmdb=1&s=${
                    seasoncount ? seasoncount : 1
                  }&e=${ep}`}
                ></iframe>
              )}
            </Grid>
            <Grid item xs={2.5} sx={{ padding: "10px", maxHeight: "80vh" }}>
              <Box sx={{ ...classes.episodeBtnList }}>
                <List>
                  {tvShowSeasonData?.episodes?.map(
                    ({ episode_number, name }) => (
                      <ListItem
                        key={episode_number}
                        sx={{
                          cursor: "pointer",
                          backgroundColor:
                            ep === episode_number ? "#EA738D" : "transparent",
                          color: ep === episode_number ? "#000" : "#fff",
                          "&:hover": {
                            backgroundColor:
                              ep === episode_number
                                ? "#EA738D"
                                : "rgba(255, 255, 255, 0.1)",
                          },
                          borderRadius: "8px",
                          marginBottom: "4px",
                        }}
                        onClick={() => {
                          setEp((prevEp) => {
                            if (prevEp === episode_number) return prevEp;

                            router.replace(
                              {
                                pathname: router.asPath.split("?")[0],
                                query: { e: episode_number, p: player },
                              },
                              undefined,
                              {
                                shallow: true,
                              }
                            );

                            return episode_number;
                          });
                        }}
                      >
                        <ListItemIcon>
                          <IconButton edge="start">
                            <PlayArrow />
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText
                          primary={`Ep ${episode_number}`}
                          secondary={name || "No title available."}
                          primaryTypographyProps={{
                            fontWeight:
                              ep === episode_number ? "bold" : "normal",
                          }}
                          secondaryTypographyProps={{
                            color:
                              ep === episode_number
                                ? "rgba(0,0,0,0.8)"
                                : "rgba(255,255,255,0.7)",
                          }}
                        />
                      </ListItem>
                    )
                  )}
                </List>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", marginBottom: 1 }}>
            <h4 style={{ fontSize: "30px", margin: 0 }}>Servers</h4>
          </Box>
          <ButtonGroup
            variant="contained"
            aria-label="Media player list"
            sx={classes.btnGroup}
          >
            <Button
              sx={{ flexGrow: 1, ml: "30px", borderRadius: "20px" }}
              color={player === 1 ? "secondary" : "primary"}
              onClick={() => changePlayer(1)}
            >
              Vidsrc.xyz
            </Button>
            <Button
              sx={{ flexGrow: 1 }}
              color={player === 2 ? "secondary" : "primary"}
              onClick={() => changePlayer(2)}
            >
              SuperEmbed
            </Button>
            <Button
              sx={{ flexGrow: 1 }}
              color={player === 3 ? "secondary" : "primary"}
              onClick={() => changePlayer(3)}
            >
              Embed
            </Button>
            <Button
              sx={{ flexGrow: 1 }}
              color={player === 4 ? "secondary" : "primary"}
              onClick={() => changePlayer(4)}
            >
              Vidlink
            </Button>
            <Button
              sx={{ flexGrow: 1, mr: "30px", borderRadius: "20px" }}
              color={player === 5 ? "secondary" : "primary"}
              onClick={() => changePlayer(5)}
            >
              SuperEmbed VIP
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid container justifyContent={"center"} sx={{ marginTop: "40px" }}>
          <DisqusComments
            identifier={`${id}-season-${seasoncount}-ep${ep}`} // Use the unique identifier
            title={`${showTitle}-season-${seasoncount}-ep${ep}-${name}`}
          />
        </Grid>
        {[
          { movieData: recommendations?.results, title: "Recommended for you" },
          { movieData: similar?.results, title: "Related shows" },
        ].map(({ movieData, title }) => (
          <Grid item sx={classes.mustWatch} key={title}>
            <TvTileSlider title={title} seriesData={movieData} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

// Commented to Remove SSR
// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const queryClient = new QueryClient();
//   const { id, seasoncount } = ctx.query;

//   try {
//     await queryClient.fetchQuery([SeriesQueryKey.SingleShowData, id], () =>
//       getSeriesById(id)
//     );
//     await queryClient.fetchQuery([SeriesQueryKey.TvShowSeasonData, id], () =>
//       getSeriesSeasonById(id, seasoncount)
//     );

//     return {
//       props: {
//         dehydratedState: dehydrate(queryClient),
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       notFound: true,
//     };
//   }
// }

export default SeasonCount;
