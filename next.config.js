/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "abs.twimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.coindesk.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.cointelegraph.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cointelegraph.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
