const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'fakestoreapi.com',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // This will ignore ESLint errors during the build
  },
};

export default nextConfig;
