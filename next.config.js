/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // used to restore to same scroll position when user clicks back
    scrollRestoration: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
