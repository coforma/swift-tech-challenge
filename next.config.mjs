const nextConfig = {
  sassOptions: {
    includePaths: ["./node_modules/@uswds/uswds/packages"],
  },
  output: 'standalone',
   assetPrefix: process.env.CDN_HOST ? 'https://d2z6xcoh14f3wb.cloudfront.net' : ''
};

export default nextConfig;
