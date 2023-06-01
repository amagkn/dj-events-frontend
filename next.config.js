/** @type {import('next').NextConfig} */
// https://res.cloudinary.com/djaeo22oy/image/upload/v1685652506/event1_3ca07d2c40.jpg

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
