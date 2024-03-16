const nextConfig = {
  env: {
    CDN_HOST: '',
    API_GATEWAY: ''
  },
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
  assetPrefix: process.env.CDN_HOST ? `https://${process.env.CDN_HOST}` : '',
  experimental: {
    serverActions: {
      allowedForwardedHosts: process.env.API_GATEWAY ? [process.env.API_GATEWAY] : [],
      allowedOrigins: process.env.CDN_HOST ? [`https://${process.env.CDN_HOST}`,`${process.env.CDN_HOST}`,`http:/${process.env.CDN_HOST}` ] : [],
    }
  }
};

export default nextConfig;
