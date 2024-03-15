const nextConfig = {
  sassOptions: {
    includePaths: ["./node_modules/@uswds/uswds/packages"],
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'public-static-3a96b108.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
   assetPrefix: process.env.CDN_HOST ? 'https://d2z6xcoh14f3wb.cloudfront.net' : ''
};

export default nextConfig;
