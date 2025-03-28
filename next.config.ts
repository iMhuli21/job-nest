import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'pc92dhkjxi.ufs.sh',
        pathname: '/*/**',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
