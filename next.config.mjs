const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swift-institution-images-public.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    includePaths: ["./node_modules/@uswds/uswds/packages"],
  },
  output: 'standalone',
};

export default nextConfig;
