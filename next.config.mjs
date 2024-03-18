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
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["luf1zbs5oa.execute-api.us-east-1.amazonaws.com","rm93rrjzid.execute-api.us-east-1.amazonaws.com"],
      allowedOrigins: ["d1b4twxh1cihpk.cloudfront.net","d2z6xcoh14f3wb.cloudfront.net"],
    }
  }
};

export default nextConfig;
