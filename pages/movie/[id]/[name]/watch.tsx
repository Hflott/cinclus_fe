import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Grid,
  CircularProgress,
  Typography,
  Select,
  MenuItem,
  ListSubheader,
  Breadcrumbs,
} from "@mui/material";

import TileSlider from "../../../../components/TileSlider/TileSlider";
import { styles as classes } from "../../../../styles/watchMovie.styles";
import { MovieResult } from "../../../../types/apiResponses";
import { useMovieById } from "../../../../hooks/movies.hooks";
import CustomHead from "../../../../components/CustomHead/CustomHead";
import {
  convertToNumber,
  formatImgSrc,
  formatMinutes,
  rounded,
} from "../../../../utils/utils";
import DisqusComments from "../../../../components/Disqus/Disqus";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LoadingButton } from "@mui/lab";
import {
  useWatchlistById,
  useAddToWatchlist,
  useRemoveFromWatchlist,
} from "../../../../hooks/watchlist.hooks";
import { useDispatch } from "react-redux";
import { signIn, useSession } from "next-auth/react";
import { setNotify } from "../../../../redux/notifySlice";

function Watch() {
  const { data: sessionData, status: loginStatus } = useSession();
  const isNotLogged = loginStatus === "unauthenticated";
  const dispatch = useDispatch();
  const router = useRouter();
  const { id, name, p } = router.query;
  const [player, setPlayer] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const { data: singleMovieData, isLoading, isError } = useMovieById(id);
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
  } = useWatchlistById(singleMovieData?.id);

  useEffect(() => {
    setWatchlistExists(false);
    if (watchlistData?.media) setWatchlistExists(true);
    if (error) setWatchlistExists(false);
  }, [singleMovieData?.id, isWatchlistLoad, isFetching, error]);

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
    const pNum = convertToNumber(p);

    if (pNum) {
      if (pNum === 1) setPlayer(pNum);
      if (pNum === 2) setPlayer(pNum);
      if (pNum === 3) setPlayer(pNum);
      if (pNum === 4) setPlayer(pNum);
      if (pNum === 5) setPlayer(pNum);
      if (pNum === 6) setPlayer(pNum);
      if (pNum === 7) setPlayer(pNum);
    }
  }, [isLoading]);

  if (isLoading || !singleMovieData) return <CircularProgress />;

  const {
    id: movieId,
    poster_path,
    title,
    runtime,
    overview,
    genres = [],
    release_date,
    vote_average,
    logo,
    spoken_languages = [],
    credits: { cast = [] } = { cast: [] },
    recommendations = { results: [] },
    similar = { results: [] },
  } = singleMovieData as MovieResult;

  const changePlayer = (playerId: typeof player) => {
    setPlayer((prevPlayerId) => {
      if (prevPlayerId === playerId) return prevPlayerId;

      router.replace(
        {
          pathname: router.asPath.split("?")[0],
          query: { p: playerId },
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
        tmdb_id: movieId,
        media_type: "movie",
        media_name: title,
        release_date: release_date,
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
        tmdbId: movieId,
      });

      setWatchlistExists(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CustomHead title={"Watching " + title} media_type={"movie"} />
      <Breadcrumbs
        aria-label="navigation"
        sx={{ mx: 4, mt: 10, color: "#999" }}
      >
        <Link href="/" passHref>
          <Typography component="span" color="inherit">
            Home
          </Typography>
        </Link>
        <Link href="/movie" passHref>
          <Typography component="span" color="inherit">
            Movies
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
                id="watch-iframe1"
                src={`${process.env.NEXT_PUBLIC_PLAYER_URL_EM}movie/${id}`}
              ></iframe>
            )}
            {player === 2 && (
              <iframe
                allowFullScreen
                id="watch-iframe2"
                src={`${process.env.NEXT_PUBLIC_PLAYER_URL_VS}/movie/${id}`}
              ></iframe>
            )}

            {player === 3 && (
              <iframe
                allowFullScreen
                id="watch-iframe3"
                src={`${process.env.NEXT_PUBLIC_PLAYER_URL_SE}video_id=${id}&tmdb=1`}
              ></iframe>
            )}

            {player === 4 && (
              <iframe
                allowFullScreen
                id="watch-iframe4"
                src={`${process.env.NEXT_PUBLIC_PLAYER_URL_VL}/movie/${id}`}
              ></iframe>
            )}

            {player === 5 && (
              <iframe
                allowFullScreen
                id="watch-iframe5"
                src={`${process.env.NEXT_PUBLIC_PLAYER_URL_SEVIP}video_id=${id}&tmdb=1`}
              ></iframe>
            )}
            {player === 6 && (
              <iframe
                allowFullScreen
                id="watch-iframe6"
                src={`${process.env.NEXT_PUBLIC_PLAYER_URL_EMSTR}/?id=${id}`}
              ></iframe>
            )}
            {player === 7 && (
              <iframe
                allowFullScreen
                id="watch-iframe7"
                src={`${process.env.NEXT_PUBLIC_PLAYER_URL_AUTOEM}/movie/${id}`}
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
                    alt={`${title} logo`}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              ) : (
                <Typography variant="h3" sx={classes.title}>
                  {title}
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
                  <DetailRow label="Duration" value={formatMinutes(runtime)} />
                  <DetailRow label="Release Date" value={release_date} />
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

        <Grid container justifyContent={"center"} sx={{ marginTop: "40px" }}>
          <DisqusComments
            identifier={`${id}`} // Use the unique identifier
            title={title}
          />
        </Grid>

        {[
          { movieData: recommendations?.results, title: "Recommended" },
          { movieData: similar?.results, title: "Related movies" },
        ].map(({ movieData, title }) => (
          <Grid item sx={classes.mustWatch} key={title}>
            <TileSlider title={title} movieData={movieData} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

// Commented to Remove SSR
// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const queryClient = new QueryClient();
//   const { id } = ctx.query;

//   try {
//     // fetching single movie details
//     await queryClient.fetchQuery([MovieQueryKey.SingleMovieData, id], () =>
//       getMovieById(id)
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

export default Watch;
