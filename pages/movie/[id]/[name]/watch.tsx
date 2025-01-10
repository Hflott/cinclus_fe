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

import TileSlider from "../../../../components/TileSlider/TileSlider";
import { styles as classes } from "../../../../styles/watchMovie.styles";
import { MovieResult } from "../../../../types/apiResponses";
import { useMovieById } from "../../../../hooks/movies.hooks";
import CustomHead from "../../../../components/CustomHead/CustomHead";
import {
  convertToNumber,
  formatImgSrc,
  formatMinutes,
  formatToUSD,
  rounded,
  toUrlFriendly,
} from "../../../../utils/utils";
import DisqusComments from "../../../../components/Disqus/Disqus";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LoadingButton } from "@mui/lab";
import CastRoll from "../../../../components/CastRoll/CastRoll";
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
  const [player, setPlayer] = useState<1 | 2 | 3 | 4 | 5>(1);
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
    status,
    release_date,
    vote_average,
    revenue,
    budget,
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
            Server 1
          </Button>
          <Button
            sx={{ flexGrow: 1 }}
            color={player === 2 ? "secondary" : "primary"}
            onClick={() => changePlayer(2)}
          >
            Server 2
          </Button>
          <Button
            sx={{ flexGrow: 1 }}
            color={player === 3 ? "secondary" : "primary"}
            onClick={() => changePlayer(3)}
          >
            Server 3
          </Button>
          <Button
            sx={{ flexGrow: 1 }}
            color={player === 4 ? "secondary" : "primary"}
            onClick={() => changePlayer(4)}
          >
            Server 4
          </Button>
          <Button
            sx={{ flexGrow: 1, mr: "30px", borderRadius: "20px" }}
            color={player === 5 ? "secondary" : "primary"}
            onClick={() => changePlayer(5)}
          >
            Server 5
          </Button>
        </ButtonGroup>

        <Grid item sx={classes.moviePlayer}>
          {player === 1 && (
            <iframe
              allowFullScreen
              id="watch-iframe1"
              src={`${process.env.NEXT_PUBLIC_Player_URL_VS}/${id}/color-ADDC35`}
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
              <Typography variant="h3">{title}</Typography>
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
              </Grid>
              <Link href={`/movie/${id}/${name}`}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={classes.watchlistBtn}
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
