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
  assetPrefix: "https://d2z6xcoh14f3wb.cloudfront.net",
  experimental: {
    serverActions: {
      allowedForwardedHosts: ['rm93rrjzid.execute-api.us-east-1.amazonaws.com'],
      allowedOrigins: ['https://d2z6xcoh14f3wb.cloudfront.net','d2z6xcoh14f3wb.cloudfront.net','http://d2z6xcoh14f3wb.cloudfront.net' ]
    }
  }
};

export default nextConfig;
