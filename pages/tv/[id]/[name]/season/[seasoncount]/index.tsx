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
import {
  convertToNumber,
  formatMinutes,
  rounded,
} from "../../../../../../utils/utils";
import DisqusComments from "../../../../../../components/Disqus/Disqus";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LoadingButton } from "@mui/lab";
import { title } from "process";
import { signIn, useSession } from "next-auth/react";
import { setNotify } from "../../../../../../redux/notifySlice";
import {
  useAddToWatchlist,
  useRemoveFromWatchlist,
  useWatchlistById,
} from "../../../../../../hooks/watchlist.hooks";
import { useDispatch } from "react-redux";

function SeasonCount() {
  const router = useRouter();
  const { data: sessionData, status: loginStatus } = useSession();
  const isNotLogged = loginStatus === "unauthenticated";
  const { id, name, seasoncount, e, p } = router.query;
  const [ep, setEp] = useState(1);
  const dispatch = useDispatch();
  const [player, setPlayer] = useState<1 | 2 | 3 | 4 | 5>(1);

  const { data: tvShowSeasonData, isLoading: isSeasonLoading } =
    useSeriesSeasonById(id, seasoncount);
  const { data: tvShowData, isLoading: isShowLoading } = useSeriesById(id);

  const [watchlistExists, setWatchlistExists] = useState(false);

  const { mutateAsync: addWatchlist, isLoading: isLoadingPost } =
    useAddToWatchlist();
  const { mutateAsync: removeWatchlist, isLoading: isLoadingRemove } =
    useRemoveFromWatchlist();

  const {
    data: watchlistData,
    isLoading: isWatchlistLoad,
    isFetching,
    error,
  } = useWatchlistById(tvShowData?.id);

  useEffect(() => {
    setWatchlistExists(false);
    if (watchlistData?.media) setWatchlistExists(true);
    if (error) setWatchlistExists(false);
  }, [tvShowData?.id, isWatchlistLoad, isFetching, error]);

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
    id: seriesId,
    backdrop_path,
    poster_path,
    overview,
    episode_run_time,
    genres,
    vote_average,
    first_air_date,
    recommendations,
    spoken_languages,
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
  const handleAddToWatchlist = async () => {
    try {
      if (isNotLogged) {
        dispatch(
          setNotify({
            isOpen: true,
            message: "Login to add to your watchlist.",
            type: "warning",
          })
        );
        return signIn();
      }

      const data = await addWatchlist({
        token: sessionData?.user.authToken ?? "",
        tmdb_id: seriesId,
        media_type: "movie",
        media_name: title,
        release_date: first_air_date,
        poster_path: poster_path,
      });

      setWatchlistExists(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveWatchlist = async () => {
    try {
      const data = await removeWatchlist({
        token: sessionData?.user.authToken ?? "",
        tmdbId: seriesId,
      });

      setWatchlistExists(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CustomHead
        title={`Watching season ${seasoncount} episode ${ep} of ${showTitle}`}
        media_type="tv"
      />
      <Grid container direction="column">
        <Grid item sx={classes.watchHead}>
          <Typography sx={{ textTransform: "capitalize", paddingLeft: "10px" }}>
            Watching season {seasoncount} episode {ep} of{" "}
            {typeof name === "string" && name?.replaceAll("-", " ")}
          </Typography>
        </Grid>
        <ButtonGroup
          variant="contained"
          aria-label="Media player list"
          sx={classes.btnGroup}
        >
          <Button
            sx={{
              flexGrow: 1,
              backgroundColor: player === 1 ? "secondary" : "#222", // Custom color for active/inactive state
              "&:hover": {
                backgroundColor: player === 1 ? "secondary" : "#444", // Custom hover color
              },
            }}
            color={player === 1 ? "secondary" : "primary"}
            onClick={() => changePlayer(1)}
          >
            Server 1
          </Button>
          <Button
            sx={{
              flexGrow: 1,
              backgroundColor: player === 2 ? "secondary" : "#222", // Custom color for active/inactive state
              "&:hover": {
                backgroundColor: player === 2 ? "secondary" : "#444", // Custom hover color
              },
            }}
            color={player === 2 ? "secondary" : "primary"}
            onClick={() => changePlayer(2)}
          >
            Server 2
          </Button>
          <Button
            sx={{
              flexGrow: 1,
              backgroundColor: player === 3 ? "secondary" : "#222", // Custom color for active/inactive state
              "&:hover": {
                backgroundColor: player === 3 ? "secondary" : "#444", // Custom hover color
              },
            }}
            color={player === 3 ? "secondary" : "primary"}
            onClick={() => changePlayer(3)}
          >
            Server 3
          </Button>
          <Button
            sx={{
              flexGrow: 1,
              backgroundColor: player === 4 ? "secondary" : "#222", // Custom color for active/inactive state
              "&:hover": {
                backgroundColor: player === 4 ? "secondary" : "#444", // Custom hover color
              },
            }}
            color={player === 4 ? "secondary" : "primary"}
            onClick={() => changePlayer(4)}
          >
            Server 4
          </Button>
          <Button
            sx={{
              flexGrow: 1,
              backgroundColor: player === 5 ? "secondary" : "#222", // Custom color for active/inactive state
              "&:hover": {
                backgroundColor: player === 5 ? "secondary" : "#444", // Custom hover color
              },
            }}
            color={player === 5 ? "secondary" : "primary"}
            onClick={() => changePlayer(5)}
          >
            Server 5
          </Button>
        </ButtonGroup>
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
            <Grid item sx={classes.moviePlayer}>
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
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ padding: "80px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={classes.imageBox}>
              <LazyLoadImage
                placeholderSrc="/assets/flixtr-placeholder.svg"
                src={`https://image.tmdb.org/t/p/w780${poster_path}`}
                style={{
                  objectFit: "cover",
                  width: "300px",
                  height: "100%",
                  borderRadius: "8px",
                  marginRight: "20px",
                }}
                effect="blur"
                alt={title}
              />
            </Box>
            <Box>
              <Typography variant="h3">{showTitle}</Typography>
              <Typography variant="body1" sx={{ marginTop: "10px" }}>
                {overview}
              </Typography>

              {/* Movie Details Grid */}
              <Grid container spacing={2} sx={classes.detailGrid}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Genres:
                  </Typography>
                  <Typography variant="body2">
                    {genres?.map((genre, index) => (
                      <React.Fragment key={genre.id}>
                        {genre.name}
                        {index < genres.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Languages:
                  </Typography>
                  <Typography variant="body2">
                    {spoken_languages?.map((lang, index) => (
                      <React.Fragment key={lang.english_name}>
                        {lang.english_name}
                        {index < spoken_languages.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Release Date:
                  </Typography>
                  <Typography variant="body2">{first_air_date}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    IMDb Score:
                  </Typography>
                  <Typography variant="body2">
                    {rounded(vote_average)}
                  </Typography>
                </Grid>
                <Link href={`/tv/${id}/${name}`}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ width: "200px" }}
                  >
                    More details
                  </Button>
                </Link>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            {watchlistExists ? (
              <LoadingButton
                loading={isLoadingRemove}
                variant="outlined"
                color="error"
                sx={classes.watchlistBtn}
                onClick={handleRemoveWatchlist}
              >
                Remove from watchlist
              </LoadingButton>
            ) : (
              <LoadingButton
                loading={isLoadingPost}
                variant="outlined"
                color="secondary"
                sx={classes.watchlistBtn}
                onClick={handleAddToWatchlist}
              >
                Add to watchlist
              </LoadingButton>
            )}
          </Box>
        </Grid>
        <Grid item xs={2.5} sx={{ padding: "10px", maxHeight: "80vh" }}>
          <Box sx={{ ...classes.episodeBtnList }}>
            <List>
              {tvShowSeasonData?.episodes?.map(({ episode_number, name }) => (
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
                      fontWeight: ep === episode_number ? "bold" : "normal",
                    }}
                    secondaryTypographyProps={{
                      color:
                        ep === episode_number
                          ? "rgba(0,0,0,0.8)"
                          : "rgba(255,255,255,0.7)",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
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
