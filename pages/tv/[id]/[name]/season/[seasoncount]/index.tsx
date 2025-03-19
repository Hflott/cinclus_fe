import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  CircularProgress,
  Typography,
  Select,
  MenuItem,
  Card,
  CardContent,
  FormControl,
  Breadcrumbs,
  ListSubheader,
} from "@mui/material";

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
  formatImgSrc,
  formatMinutes,
  rounded,
} from "../../../../../../utils/utils";
import DisqusComments from "../../../../../../components/Disqus/Disqus";
import StarIcon from "@mui/icons-material/Star";
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
  const [player, setPlayer] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);

  const { data: tvShowSeasonData, isLoading: isSeasonLoading } =
    useSeriesSeasonById(id, seasoncount);
  const { data: tvShowData, isLoading: isShowLoading } = useSeriesById(id);

  const [watchlistExists, setWatchlistExists] = useState(false);

  const { mutateAsync: addWatchlist, isPending: isLoadingPost } =
    useAddToWatchlist();
  const { mutateAsync: removeWatchlist, isPending: isLoadingRemove } =
    useRemoveFromWatchlist();

  const {
    data: watchlistData,
    isLoading: isWatchlistLoad,
    isFetching,
    error,
  } = useWatchlistById(tvShowData?.id);

  useEffect(() => {
    if (seasoncount) {
      setEp(1);
    }
  }, [seasoncount]);

  const serverNames: { [key: number]: string } = {
    1: "embed",
    2: "VidSrc",
    3: "Multiembed",
    4: "Vidlink",
    5: "Multiembed VIP",
    6: "Embed-api",
    7: "Autoembed",
  };

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
      if (pNum === 6) setPlayer(pNum);
      if (pNum === 7) setPlayer(pNum);
    }
  }, [isShowLoading]);

  if (isSeasonLoading || isShowLoading || !tvShowSeasonData)
    return <CircularProgress />;

  const {
    id: seriesId,
    poster_path,
    overview,
    seasons,
    genres,
    logo,
    vote_average,
    first_air_date,
    recommendations,
    spoken_languages,
    similar,
    name: showTitle,
    credits: { cast },
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

  const ClickablePills = ({
    items,
    type,
  }: {
    items: string[];
    type: "genre" | "actor";
  }) => {
    const router = useRouter();

    const handleSearch = (value: string) => {
      const queryParam =
        type === "genre"
          ? `genre=${encodeURIComponent(value)}`
          : `actor=${encodeURIComponent(value)}`;

      router.push(`/movies?${queryParam}`);
    };

    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {items.map((item) => (
          <Button
            key={item}
            variant="outlined"
            color="secondary"
            size="large"
            onClick={() => handleSearch(item)}
            sx={{
              borderRadius: "20px",
              textTransform: "capitalize",
              "&:hover": { backgroundColor: "secondary.main", color: "white" },
            }}
          >
            {item}
          </Button>
        ))}
      </Box>
    );
  };

  const DetailRow = ({
    label,
    value,
    type,
  }: {
    label: string;
    value: string | string[];
    type?: "pills";
  }) => (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 400,
          color: "text.primary",
          mb: 1,
        }}
      >
        {label}
      </Typography>

      {type === "pills" ? (
        Array.isArray(value) ? (
          <ClickablePills
            items={value}
            type={label.toLowerCase().includes("genre") ? "genre" : "actor"}
          />
        ) : null
      ) : (
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            color: "secondary.main",
          }}
        >
          {value || "N/A"}
        </Typography>
      )}
    </Box>
  );
  const renderWatchlistButton = () =>
    watchlistExists ? (
      <LoadingButton
        loading={isLoadingRemove}
        variant="outlined"
        color="error"
        fullWidth
        onClick={handleRemoveWatchlist}
      >
        Remove from Watchlist
      </LoadingButton>
    ) : (
      <LoadingButton
        loading={isLoadingPost}
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={handleAddToWatchlist}
      >
        Add to Watchlist
      </LoadingButton>
    );

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
        media_type: "tv",
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
      <Breadcrumbs
        aria-label="navigation"
        sx={{ mx: 4, mt: 10, color: "#999" }}
      >
        <Link href="/" passHref>
          <Typography
            sx={{ ":hover": { textDecoration: "underline" } }}
            component="span"
            color="inherit"
          >
            Home
          </Typography>
        </Link>
        <Link href="/movie" passHref>
          <Typography
            sx={{ ":hover": { textDecoration: "underline" } }}
            component="span"
            color="inherit"
          >
            Series
          </Typography>
        </Link>
        <Typography
          component="span"
          color="text.primary"
          sx={{ textTransform: "capitalize" }}
        >
          {typeof name === "string"
            ? name.replace(/-/g, " ").replace(/_/g, " ")
            : "Loading..."}
        </Typography>
      </Breadcrumbs>
      <Grid container direction="column">
        <Grid item sx={classes.watchHead}>
          <Typography sx={{ textTransform: "capitalize", paddingLeft: "10px" }}>
            Watching {typeof name === "string" && name?.replaceAll("-", " ")}
          </Typography>
        </Grid>
        <Grid item sx={{ width: "100%", display: "flex" }}>
          {/* Player Menu */}
          <Select
            labelId="select-player-label"
            id="select-player"
            value={player}
            sx={classes.playermenu}
            onChange={(e) => {
              const selectedPlayer = Number(e.target.value) as
                | 1
                | 2
                | 3
                | 4
                | 5
                | 6
                | 7;
              setPlayer(selectedPlayer);
              changePlayer(selectedPlayer);
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#222", // Make the background transparent
                  borderRadius: "30px",
                },
              },
            }}
          >
            {/* Recommended Players Section */}
            <ListSubheader sx={{ color: "#FFD700", backgroundColor: "#222" }}>
              Recommended
              <Box
                sx={{
                  borderTop: "1px solid white", // Vertical line style
                  opacity: 0.4,
                }}
              />
            </ListSubheader>
            {[1, 2, 4, 7].map((playerId) => (
              <MenuItem
                key={playerId}
                value={playerId}
                sx={{
                  backgroundColor: player === playerId ? "secondary" : "#222", // Custom color for active/inactive state
                  "&:hover": {
                    backgroundColor: player === playerId ? "secondary" : "#444", // Custom hover color
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#EA738D", // Set selected background color
                  },
                  // Ensure the selected state does not conflict with hover
                  "&:hover.Mui-selected": {
                    backgroundColor: "#EA738D", // Set selected background color on hover
                  },
                }}
              >
                {serverNames[playerId]}
                {/* Star icon for recommended players */}
              </MenuItem>
            ))}

            {/* Ads Players Section */}
            <ListSubheader sx={{ color: "#B0B0B0", backgroundColor: "#222" }}>
              Backups
              <Box
                sx={{
                  borderTop: "1px solid white", // Vertical line style
                  opacity: 0.4,
                }}
              />
            </ListSubheader>
            {[3, 5, 6].map((playerId) => (
              <MenuItem
                key={playerId}
                value={playerId}
                sx={{
                  backgroundColor: player === playerId ? "secondary" : "#222", // Custom color for active/inactive state
                  "&:hover": {
                    backgroundColor: player === playerId ? "secondary" : "#444", // Custom hover color
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#EA738D", // Set selected background color
                  },
                  // Ensure the selected state does not conflict with hover
                  "&:hover.Mui-selected": {
                    backgroundColor: "#EA738D", // Set selected background color on hover
                  },
                }}
              >
                {serverNames[playerId]}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item sx={classes.moviePlayer}>
          <div className="aspect-ratio-box">
            {player === 1 && (
              <iframe
                allowFullScreen
                id="watch-iframe3"
                src={`${process.env.NEXT_PUBLIC_PLAYER_URL_EM}tv/${id}/${
                  seasoncount ? seasoncount : 1
                }/${ep}`}
              ></iframe>
            )}
            {player === 2 && (
              <iframe
                allowFullScreen
                id="watch-iframe1"
                src={`${process.env.NEXT_PUBLIC_PLAYER_URL_VS}/tv/${id}/${
                  seasoncount ? seasoncount : 1
                }/${ep}`}
              ></iframe>
            )}

            {player === 3 && (
              <iframe
                allowFullScreen
                id="watch-iframe2"
                src={`${
                  process.env.NEXT_PUBLIC_PLAYER_URL_SE
                }video_id=${id}&tmdb=1&s=${
                  seasoncount ? seasoncount : 1
                }&e=${ep}`}
              ></iframe>
            )}

            {player === 4 && (
              <iframe
                allowFullScreen
                id="watch-iframe4"
                src={`${process.env.NEXT_PUBLIC_PLAYER_URL_VL}/tv/${id}/${
                  seasoncount ? seasoncount : 1
                }/${ep}`}
              ></iframe>
            )}

            {player === 5 && (
              <iframe
                allowFullScreen
                id="watch-iframe5"
                src={`${
                  process.env.NEXT_PUBLIC_PLAYER_URL_SEVIP
                }video_id=${id}&tmdb=1&s=${
                  seasoncount ? seasoncount : 1
                }&e=${ep}`}
              ></iframe>
            )}
            {player === 6 && (
              <iframe
                allowFullScreen
                id="watch-iframe6"
                src={`${process.env.NEXT_PUBLIC_PLAYER_URL_EMSTR}/?id=${id}&s=${
                  seasoncount ? seasoncount : 1
                }&e=${ep}`}
              ></iframe>
            )}
            {player === 7 && (
              <iframe
                allowFullScreen
                id="watch-iframe7"
                src={`${process.env.NEXT_PUBLIC_PLAYER_URL_AUTOEM}/tv/${id}/${
                  seasoncount ? seasoncount : 1
                }/${ep}`}
              ></iframe>
            )}
          </div>
        </Grid>
        <Grid
          container
          spacing={4}
          sx={{ p: { xs: "0 20px 0 20px", md: "0 100px 0 100px" } }}
        >
          {/* Poster Column - Left side on desktop */}
          <Grid item md={4} sx={{ display: { xs: "none", md: "block" } }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: "780px",
                height: "auto",
                border: 2,
                color: "#EA738D",
                borderRadius: "20px",
                overflow: "hidden",
                mb: 2,
              }}
            >
              <LazyLoadImage
                src={`https://image.tmdb.org/t/p/w780${poster_path}`}
                style={{ width: "100%", height: "auto" }}
                effect="blur"
                alt={title}
              />
            </Box>

            {/* Desktop Watchlist Button */}
            <Box
              sx={{ display: { xs: "none", md: "block" }, maxWidth: "780px" }}
            >
              {renderWatchlistButton()}
            </Box>
          </Grid>

          {/* Details Column - Right side on desktop */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                gap: 3,
              }}
            >
              {/* Title */}
              {logo ? (
                <Box
                  sx={{
                    height: "100%",
                    width: "70%",
                    position: "relative",
                    mx: "auto",
                  }}
                >
                  <LazyLoadImage
                    src={formatImgSrc(
                      "https://image.tmdb.org/t/p/original",
                      logo
                    )}
                    alt={`${name} logo`}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              ) : (
                <Typography variant="h3" sx={classes.title}>
                  {showTitle}
                </Typography>
              )}

              {/* Details Grid - Two columns on desktop */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  {/* Genres as pills */}
                  <DetailRow
                    label="Genres"
                    value={genres.map((g) => g.name)}
                    type="pills"
                  />

                  {/* Regular text details */}
                  <DetailRow label="Release Date" value={first_air_date} />
                </Grid>

                <Grid item xs={12} md={6}>
                  {/* Cast as pills */}
                  <DetailRow
                    label="Cast"
                    value={cast.slice(0, 6).map((a) => a.name)}
                    type="pills"
                  />

                  {/* Regular text details */}
                  <DetailRow
                    label="TMDB Score"
                    value={rounded(vote_average).toString()}
                  />
                  <DetailRow
                    label="Languages"
                    value={spoken_languages
                      .map((l) => l.english_name)
                      .join(", ")}
                  />
                </Grid>
              </Grid>

              {/* Overview */}
              <Typography variant="h5">Summary</Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  lineHeight: 1.6,
                  fontWeight: 500,
                  color: "#EA738D",
                }}
              >
                {overview}
              </Typography>

              {/* Mobile Buttons */}
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  flexDirection: "column",
                  gap: 2,
                  mt: "auto",
                }}
              >
                <Link href={`/movie/${id}/${name}`}>
                  <Button variant="outlined" color="secondary" fullWidth>
                    More Details
                  </Button>
                </Link>
                {renderWatchlistButton()}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          {/* Season Navigation */}
          <Box sx={classes.seasonNav}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: "20px" }}
              disabled={Number(seasoncount) <= 1}
              onClick={() =>
                router.replace(
                  {
                    pathname: `/tv/${id}/${name}/season/${
                      Number(seasoncount) - 1
                    }`,
                    query: { e: 1 },
                  },
                  undefined,
                  { shallow: true }
                )
              }
            >
              Previous
            </Button>

            <FormControl sx={{ minWidth: 160 }}>
              <Select
                sx={{
                  background: "#444",
                  border: 2,
                  borderRadius: "30px",
                  color: "secondary.main",
                }}
                value={seasoncount || 1}
                onChange={(e) => {
                  const newSeason = e.target.value;
                  router.replace(
                    {
                      pathname: `/tv/${id}/${name}/season/${newSeason}`,
                      query: { e: 1 },
                    },
                    undefined,
                    { shallow: true }
                  );
                }}
              >
                {seasons?.map((season) => (
                  <MenuItem
                    key={season.season_number}
                    value={season.season_number}
                  >
                    {season.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: "20px" }}
              disabled={Number(seasoncount) >= seasons?.length}
              onClick={() =>
                router.replace(
                  {
                    pathname: `/tv/${id}/${name}/season/${
                      Number(seasoncount) + 1
                    }`,
                    query: { e: 1 },
                  },
                  undefined,
                  { shallow: true }
                )
              }
            >
              Next
            </Button>
          </Box>
          <Box sx={classes.episodeScrollContainer}>
            <Box sx={classes.episodeGrid}>
              {tvShowSeasonData?.episodes?.map((episode) => (
                <Card
                  key={episode.episode_number}
                  sx={{
                    ...classes.episodeCard,
                    borderLeft:
                      ep === episode.episode_number ? "4px solid" : "none",
                    borderColor: "secondary.main",
                  }}
                  onClick={() => {
                    router.replace(
                      {
                        pathname: router.asPath.split("?")[0],
                        query: { e: episode.episode_number, p: player },
                      },
                      undefined,
                      { shallow: true }
                    );
                    setEp(episode.episode_number);
                  }}
                >
                  <Box sx={classes.imageContainer}>
                    <LazyLoadImage
                      src={
                        episode.still_path
                          ? `https://image.tmdb.org/t/p/w400${episode.still_path}`
                          : "../../assets/img-na.png"
                      }
                      alt={episode.name}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "#222",
                      }}
                      effect="blur"
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "../../assets/img-na.png";
                      }}
                    />

                    <Box sx={classes.gradientOverlay}>
                      <Typography variant="h6" color="common.white">
                        Episode {episode.episode_number}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="common.white"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {episode.name}
                      </Typography>
                    </Box>

                    {ep === episode.episode_number && (
                      <StarIcon
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          color: "secondary.main",
                          fontSize: "2rem",
                        }}
                      />
                    )}
                  </Box>

                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Aired {new Date(episode.air_date).toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {episode.overview || "No description available"}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
        <Grid container justifyContent={"center"} sx={{ marginTop: "40px" }}>
          <DisqusComments
            identifier={`${id}-season-${seasoncount}-ep${ep}`} // Use the unique identifier
            title={`${showTitle}-season-${seasoncount}-ep${ep}-${name}`}
          />
        </Grid>
        {[
          { movieData: recommendations?.results, title: "Recommended" },
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
