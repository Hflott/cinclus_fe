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
import { convertToNumber } from "../../../../utils/utils";
import DisqusComments from "../../../../components/Disqus/Disqus";

function Watch() {
  const router = useRouter();
  const { id, name, p } = router.query;
  const [player, setPlayer] = useState<1 | 2 | 3 | 4 | 5>(1);
  const { data: singleMovieData, isLoading } = useMovieById(id);

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

  const { recommendations, similar, title } = singleMovieData as MovieResult;

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

  return (
    <>
      <CustomHead title={"Watching " + title} media_type={"movie"} />
      <Grid container>
        <Grid item sx={classes.watchHead}>
          <Link href={`/movie/${id}/${name}`} className="backToInfo">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ArrowBackIosNewIcon sx={classes.backIco} />}
              size="small"
            >
              Back to movie details
            </Button>
          </Link>

          <Typography sx={{ textTransform: "capitalize", paddingLeft: "10px" }}>
            Watching {typeof name === "string" && name?.replaceAll("-", " ")}
          </Typography>
        </Grid>

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
