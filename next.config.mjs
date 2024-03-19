const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swift-institution-images-public.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'swift-institution-images-9a86eb74.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'swift-institution-images-9bbaef25.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'swift-institution-images-c20cd252.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 86400
  },
  sassOptions: {
    includePaths: ["./node_modules/@uswds/uswds/packages"],
  },
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["luf1zbs5oa.execute-api.us-east-1.amazonaws.com","rm93rrjzid.execute-api.us-east-1.amazonaws.com","wtm2df29w5.execute-api.us-east-1.amazonaws.com"],
      allowedOrigins: ["d1b4twxh1cihpk.cloudfront.net","d2z6xcoh14f3wb.cloudfront.net","d19jzmn7wae8g9.cloudfront.net"],
    }
  }
};

export default nextConfig;
