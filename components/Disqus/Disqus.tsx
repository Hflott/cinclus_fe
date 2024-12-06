import React, { useEffect } from "react";
import { DiscussionEmbed } from "disqus-react";
import { useRouter } from "next/router";

type DisqusCommentsProps = {
  identifier: string | undefined;
  title: string;
};

const DisqusComments: React.FC<DisqusCommentsProps> = ({
  identifier,
  title,
}) => {
  // Construct the full URL (including the query parameters)
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const disqusConfig = {
    url: pageUrl,
    identifier,
    title,
  };

  return (
    <div style={{ width: "60%", minHeight: "400px", margin: "20px auto" }}>
      <DiscussionEmbed shortname="Cinclus" config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;
