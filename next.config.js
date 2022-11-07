/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "ionix-server.s3.amazonaws.com",
      "dummyimage.com",
      "scontent.fbog2-4.fna.fbcdn.net",
    ],
  },
};

module.exports = nextConfig;
