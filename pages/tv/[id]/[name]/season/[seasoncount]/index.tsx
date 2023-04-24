import React, { useState } from 'react';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { Box, Button, Grid, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { SeriesResult, ShowSeason } from '../../../../../../types/apiResponses';
import { styles as classes } from '../../../../../../styles/SeasonCount.styles';
import { useRouter } from 'next/router';
import TvTileSlider from '../../../../../../components/TvTileSlider/TvTileSlider';

type SeasonCountProps = {
  tvShowData: SeriesResult;
  tvShowSeasonData: ShowSeason;
}

function SeasonCount({ tvShowData, tvShowSeasonData }: SeasonCountProps) {
  const router = useRouter();
  const { id, name, seasoncount } = router.query;
  const { recommendations, similar } = tvShowData;

  const [ep, setEp] = useState(1);

  console.log('tvShowData', tvShowData)
  // console.log('tvShowSeasonData', tvShowSeasonData)

  return (
    <Grid container>
      <Grid item sx={classes.watchHead}>
        <Link href={`/tv/${id}/${name}`} className='backToInfo'>
          <Button variant="outlined" color='secondary' startIcon={<ArrowBackIosNewIcon sx={classes.backIco} />} size='small'>
            Back to show details
          </Button>
        </Link>
        <Typography sx={{ textTransform: 'capitalize', paddingLeft: "10px", }}>Watching season {seasoncount} episode {ep} of {typeof name === 'string' && name?.replaceAll('-', ' ')}</Typography>
      </Grid>

      <Grid item sx={classes.moviePlayer}>
        <iframe
          allowFullScreen
          id="watch-iframe"
          src={`${process.env.NEXT_PUBLIC_Player_URL}/tv?id=${id}&s=${seasoncount ? seasoncount : 1}&e=${ep}`}
        ></iframe>
      </Grid>

      <Grid item sx={classes.episodeBtns}>
        {tvShowSeasonData?.episodes?.map(({ episode_number }) => (
          <Box sx={classes.episodeBtnBox} key={episode_number}>
            <Button
              variant='contained'
              sx={classes.episodeBtn}
              color={ep === episode_number ? 'primary' : 'secondary'}
              onClick={() => setEp(episode_number)}
            // disabled={ep === episode_number}
            >
              Ep {episode_number}
            </Button>
          </Box>
        ))}
      </Grid>

      {[
        { movieData: recommendations?.results, title: "Recommended for you" },
        { movieData: similar?.results, title: "Related shows" },
      ].map(({ movieData, title }) => (
        <Grid item sx={{ p: '20px 0', width: '100%' }} key={title}>
          <TvTileSlider title={title} seriesData={movieData} />
        </Grid>
      ))}

    </Grid>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const tvShowRes = await fetch(`https://api.themoviedb.org/3/tv/${ctx.query.id}?api_key=${process.env.TMDB_KEY}&append_to_response=images,videos,credits,recommendations,similar`);
    const tvShowData = await tvShowRes.json();

    const tvShowSeasonRes = await fetch(`https://api.themoviedb.org/3/tv/${ctx.query.id}/season/${ctx.query.seasoncount}?api_key=${process.env.TMDB_KEY}&append_to_response=images,videos,credits,recommendations,similar`)
    const tvShowSeasonData = await tvShowSeasonRes.json();

    if (tvShowData.hasOwnProperty('success') && tvShowSeasonData.hasOwnProperty('success')) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        tvShowData,
        tvShowSeasonData
      }
    }

  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default SeasonCount