import React from "react";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { MovieResult } from "../../../../types/apiResponses";
import { Box, Button, Grid, Typography } from "@mui/material";
import { styles as classes } from "../../../../styles/movieInfo.styles";
import Link from "next/link";
import { formatImgSrc, formatMinutes, formatToUSD, toUrlFriendly } from "../../../../utils/utils";
import ImgRoll from "../../../../components/ImgRoll/ImgRoll";
import CastRoll from "../../../../components/CastRoll/CastRoll";
import ClipRoll from "../../../../components/ClipRoll/ClipRoll";
import TileSlider from "../../../../components/TileSider/TileSlider";

type MovieInfoProps = {
  singleMovieData: MovieResult;
};

function MovieInfo({ singleMovieData }: MovieInfoProps) {
  // console.log('movieInfo: ', singleMovieData);

  const { id, backdrop_path, poster_path, title,
    runtime, overview, homepage, genres, adult,
    status, release_date, revenue, budget, imdb_id,
    spoken_languages, images: { backdrops },
    credits: { cast }, videos, recommendations, similar
  } = singleMovieData;

  return (
    <Grid>
      <Grid item sx={classes.top}>
        <Box sx={classes.backgroundCover} style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}>
        </Box>
        <Box sx={classes.imageBox}>
          <Image
            fill
            className="poster-img"
            placeholder="blur"
            style={poster_path ? { objectFit: 'cover', objectPosition: 'top' } : { objectFit: 'contain', objectPosition: 'center' }}
            blurDataURL={formatImgSrc("https://image.tmdb.org/t/p/w780", poster_path)}
            src={formatImgSrc("https://image.tmdb.org/t/p/w780", poster_path)}
            sizes={formatImgSrc("https://image.tmdb.org/t/p/w780", poster_path)}
            alt={title}
          />
        </Box>
        <Box sx={classes.detailMid}>
          <Box>
            <Typography variant="h4" sx={classes.mediaTitle}>{title}</Typography>
            <Grid sx={classes.belowTitle}>
              <Grid item>Movie</Grid>
              <Grid item>{formatMinutes(runtime)}</Grid>
            </Grid>
          </Box>
          <Box sx={classes.mediaBtns}>
            {new Date() > new Date(release_date) && (
              <Link href={`/movie/${id}/${toUrlFriendly(title)}/watch`}>
                <Button variant="contained" color="secondary" sx={classes.watchBtn}>
                  Watch now
                </Button>
              </Link>
            )}

            {false ? (
              <Button variant="outlined" color="error" sx={classes.watchlistBtn}>
                Remove from watchlist
              </Button>
            ) : (
              <Button variant="outlined" color="secondary" sx={classes.watchlistBtn}>
                Add to watchlist
              </Button>
            )}
          </Box>
          <Box>
            <Typography variant="body1" sx={classes.overview}>{overview}</Typography>
          </Box>
        </Box>

        <Box sx={classes.detailLast}>
          <Grid>
            <Grid item sx={classes.bulletHead}>Homepage: </Grid>
            <Grid item sx={classes.bulletInfo}>
              {homepage ? (
                <Link href={homepage} target="_blank" className="bullet-link">
                  {homepage}
                </Link>
              ) : 'N/A'}
            </Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Imdb: </Grid>
            <Grid item sx={classes.bulletInfo}>
              {imdb_id ? (
                <Link href={`https://www.imdb.com/title/${imdb_id}`} target="_blank" className="bullet-link">
                  {`https://www.imdb.com/title/${imdb_id}`}
                </Link>
              ) : 'N/A'}

            </Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Genres: </Grid>
            <Grid item sx={classes.bulletInfo}>
              {genres?.map((genre, index) => (
                <React.Fragment key={genre.id}>
                  {genre.name}
                  {index < genres.length - 1 && ', '}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Adult: </Grid>
            <Grid item sx={classes.bulletInfo}>{adult ? 'Yes' : 'No'}</Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Status: </Grid>
            <Grid item sx={classes.bulletInfo}>{status}</Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Release date: </Grid>
            <Grid item sx={classes.bulletInfo}>{release_date}</Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Budget: </Grid>
            <Grid item sx={classes.bulletInfo}>{formatToUSD(budget)}</Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Revenue: </Grid>
            <Grid item sx={classes.bulletInfo}>{formatToUSD(revenue)}</Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Duration: </Grid>
            <Grid item sx={classes.bulletInfo}>{formatMinutes(runtime)}</Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Language: </Grid>
            <Grid item sx={classes.bulletInfo}>
              {spoken_languages?.map((lang, index) => (
                <React.Fragment key={lang.english_name}>
                  {lang.english_name}
                  {index < spoken_languages.length - 1 && ', '}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>
        <ImgRoll imageList={backdrops} />
      </Grid>

      <Grid item>
        <ClipRoll clipList={videos.results} />
      </Grid>

      <Grid item>
        <CastRoll castList={cast} />
      </Grid>

      {[
        { movieData: recommendations?.results, title: "Our recommendations" },
        { movieData: similar?.results, title: "Something similar" },
      ].map(({ movieData, title }) => (
        <Grid item sx={{ p: "20px 0" }} key={title}>
          <TileSlider title={title} movieData={movieData} />
        </Grid>
      ))}

    </Grid>
  );

}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

  try {
    // fetching single movie details
    const res = await fetch(`https://api.themoviedb.org/3/movie/${ctx.query.id}?api_key=${process.env.TMDB_KEY}&append_to_response=images,videos,credits,recommendations,similar`);
    const data = await res.json();

    // failure if 'success' property exists
    if (data.hasOwnProperty('success')) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        singleMovieData: data
      }
    };

  } catch (error) {
    console.log(error);
    return {
      notFound: true
    };
  }

}

export default MovieInfo;
