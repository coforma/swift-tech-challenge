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
  assetPrefix: process.env.CDN_HOST ? `https://process.env.CDN_HOST` : '',
  experimental: {
    serverActions: {
      allowedForwardedHosts: ['rm93rrjzid.execute-api.us-east-1.amazonaws.com'],
      allowedOrigins: process.env.CDN_HOST ? [`https://${process.env.CDN_HOST}` ] : [],
    }
  }
};

export default nextConfig;
