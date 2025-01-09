import React from "react";
import Head from "next/head";

type CustomHeadProps = {
  title: string;
  media_type: "movie" | "tv";
};

const CustomHead = ({ title, media_type }: CustomHeadProps) => {
  const overview =
    "MonkeyFlix is the largest free streaming platform for movies and tv shows. Collaborative media and info service featuring high quality content for a huge selection of titles and new releases! Available in all countries.";
  return (
    <Head>
      <title>{`${title} ${
        media_type == "movie" ? "| Movies" : "| Tv Shows"
      } - MonkeyFlix`}</title>
      <link rel="icon" href="/icon.svg" />
      <meta name="title" content={"MonkeyFlix - Watch Movies & TV Shows"} />
      <meta name="description" content={overview} />
      <meta
        name="keywords"
        content="Movies, TV Shows, Streaming, Reviews, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MonkeyFlix" />
      <meta
        property="og:title"
        content={"MonkeyFlix - Watch Movies & TV Shows"}
      />
      <meta property="og:description" content={overview} />
    </Head>
  );
};

export default CustomHead;
