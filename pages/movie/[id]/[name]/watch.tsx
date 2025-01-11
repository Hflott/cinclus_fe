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
  Breadcrumbs,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import TileSlider from "../../../../components/TileSlider/TileSlider";
import { styles as classes } from "../../../../styles/watchMovie.styles";
import { MovieResult } from "../../../../types/apiResponses";
import { useMovieById } from "../../../../hooks/movies.hooks";
import CustomHead from "../../../../components/CustomHead/CustomHead";
import {
  convertToNumber,
  formatMinutes,
  rounded,
} from "../../../../utils/utils";
import DisqusComments from "../../../../components/Disqus/Disqus";
import { LazyLoadImage } from "react-lazy-load-image-component";
import StarIcon from "@mui/icons-material/Star";
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
  const { data: singleMovieData, isLoading } = useMovieById(id);
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
  } = useWatchlistById(singleMovieData?.id);

  useEffect(() => {
    setWatchlistExists(false);
    if (watchlistData?.media) setWatchlistExists(true);
    if (error) setWatchlistExists(false);
  }, [singleMovieData?.id, isWatchlistLoad, isFetching, error]);

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

  if (isLoading) return <LinearProgress />;

  const {
    id: movieId,
    backdrop_path,
    poster_path,
    title,
    runtime,
    overview,
    genres,
    release_date,
    vote_average,
    spoken_languages,
    credits: { cast },
    recommendations,
    similar,
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
      <Grid container direction="column">
        <Grid item sx={classes.watchHead}>
          <Typography sx={{ textTransform: "capitalize", paddingLeft: "10px" }}>
            Watching {typeof name === "string" && name?.replaceAll("-", " ")}
          </Typography>
        </Grid>
        {/* Player Menu */}
        <FormControl fullWidth sx={classes.playermenu}>
          <Select
            labelId="select-player-label"
            id="select-player"
            value={player}
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
                  backgroundColor: "transparent", // Make the background transparent
                  borderRadius: "20px",
                  boxShadow: "none", // Optional: removes the dropdown shadow if you don't need it
                },
              },
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((playerId) => (
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
                }}
              >
                Server {playerId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ButtonGroup
          variant="contained"
          aria-label="Media player list"
          sx={classes.btnGroup}
        >
          <Button
            sx={{
              borderRadius: "30px",
              backgroundColor: player === 1 ? "secondary" : "#222", // Custom color for active/inactive state
              "&:hover": {
                backgroundColor: player === 1 ? "secondary" : "#444", // Custom hover color
              },
            }}
            color={player === 1 ? "secondary" : "primary"}
            onClick={() => changePlayer(1)}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <StarIcon />
              <p>Server 1</p>
            </span>
          </Button>
          <Button
            sx={{
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
              backgroundColor: player === 4 ? "secondary" : "#222", // Custom color for active/inactive state
              "&:hover": {
                backgroundColor: player === 4 ? "secondary" : "#444", // Custom hover color
              },
            }}
            color={player === 4 ? "secondary" : "primary"}
            onClick={() => changePlayer(4)}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <StarIcon />
              <p>Server 4</p>
            </span>
          </Button>
          <Button
            sx={{
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
          <Button
            sx={{
              backgroundColor: player === 6 ? "secondary" : "#222", // Custom color for active/inactive state
              "&:hover": {
                backgroundColor: player === 6 ? "secondary" : "#444", // Custom hover color
              },
            }}
            color={player === 6 ? "secondary" : "primary"}
            onClick={() => changePlayer(6)}
          >
            Server 6
          </Button>
          <Button
            sx={{
              borderRadius: "30px",
              backgroundColor: player === 7 ? "secondary" : "#222", // Custom color for active/inactive state
              "&:hover": {
                backgroundColor: player === 7 ? "secondary" : "#444", // Custom hover color
              },
            }}
            color={player === 7 ? "secondary" : "primary"}
            onClick={() => changePlayer(7)}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <StarIcon />
              <p>Server 7</p>
            </span>
          </Button>
        </ButtonGroup>

        <Grid item sx={classes.moviePlayer}>
          {player === 1 && (
            <iframe
              allowFullScreen
              id="watch-iframe1"
              src={`${process.env.NEXT_PUBLIC_Player_URL_VS}/movie/${id}`}
            ></iframe>
          )}

          {player === 2 && (
            <iframe
              allowFullScreen
              id="watch-iframe2"
              src={`${process.env.NEXT_PUBLIC_Player_URL_SE}video_id=${id}&tmdb=1`}
            ></iframe>
          )}

          {player === 3 && (
            <iframe
              allowFullScreen
              id="watch-iframe3"
              src={`${process.env.NEXT_PUBLIC_Player_URL_EM}movie/${id}`}
            ></iframe>
          )}

          {player === 4 && (
            <iframe
              allowFullScreen
              id="watch-iframe4"
              src={`${process.env.NEXT_PUBLIC_Player_URL_VL}/movie/${id}`}
            ></iframe>
          )}

          {player === 5 && (
            <iframe
              allowFullScreen
              id="watch-iframe5"
              src={`${process.env.NEXT_PUBLIC_Player_URL_SEVIP}video_id=${id}&tmdb=1`}
            ></iframe>
          )}
          {player === 6 && (
            <iframe
              allowFullScreen
              id="watch-iframe6"
              src={`${process.env.NEXT_PUBLIC_Player_URL_EMSTR}/?id=${id}`}
            ></iframe>
          )}
          {player === 7 && (
            <iframe
              allowFullScreen
              id="watch-iframe6"
              src={`${process.env.NEXT_PUBLIC_Player_URL_AUTOEM}/movie/${id}`}
            ></iframe>
          )}
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
              <Typography sx={classes.title}>{title}</Typography>
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
                    Duration:
                  </Typography>
                  <Typography variant="body2">
                    {formatMinutes(runtime)}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Release Date:
                  </Typography>
                  <Typography variant="body2">{release_date}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    IMDb Score:
                  </Typography>
                  <Typography variant="body2">
                    {rounded(vote_average)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Cast:
                  </Typography>
                  <Typography variant="body2">
                    {cast?.slice(0, 6).map((actor, index) => (
                      <React.Fragment key={actor.name}>
                        {actor.name}
                        {index < Math.min(cast.length, 6) - 1 && ", "}
                      </React.Fragment>
                    ))}
                    {cast?.length > 6 && " ..."}
                  </Typography>
                </Grid>
              </Grid>
              <Link href={`/movie/${id}/${name}`}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ width: "200px" }}
                >
                  More details
                </Button>
              </Link>
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

        <Grid container justifyContent={"center"} sx={{ marginTop: "40px" }}>
          <DisqusComments
            identifier={`${id}`} // Use the unique identifier
            title={title}
          />
        </Grid>

        {[
          { movieData: recommendations?.results, title: "Recommended for you" },
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
