const nextConfig = {
  sassOptions: {
    includePaths: ["./node_modules/@uswds/uswds/packages"],
  },
  output: 'standalone',
   assetPrefix: process.env.CDN_HOST ? process.env.CDN_HOST : ''
};

export default nextConfig;
