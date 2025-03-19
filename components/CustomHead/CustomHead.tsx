import React from "react";
import Head from "next/head";

type CustomHeadProps = {
  title: string;
  media_type: "movie" | "tv" | "all";
};

const CustomHead = ({ title, media_type }: CustomHeadProps) => {
  const overview =
    "StreamSlice is the largest free streaming platform for movies and tv shows. Collaborative media and info service featuring high quality content for a huge selection of titles and new releases! Available in all countries.";
  const getMediaTypeText = () => {
    if (media_type === "movie") {
      return "Movies";
    } else if (media_type === "tv") {
      return "TV Shows";
    }
    return "Movies and TV Shows"; // For "all"
  };
  return (
    <Head>
      <title>{`${title} | ${getMediaTypeText()} - StreamSlice`}</title>
      <link rel="icon" href="/icon.svg" />
      <meta name="title" content={"StreamSlice - Watch Movies & TV Shows"} />
      <meta name="description" content={overview} />
      <meta
        name="keywords"
        content="Movies, TV Shows, Streaming, Reviews, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="StreamSlice" />
      <meta
        property="og:title"
        content={"StreamSlice - Watch Movies & TV Shows"}
      />
      <meta property="og:description" content={overview} />
    </Head>
  );
};

export default CustomHead;
