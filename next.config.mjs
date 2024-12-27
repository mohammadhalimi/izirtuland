/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        hostname: 'biaupload.com',
      },
      {
        hostname: 'imgurl.ir'
      }
    ],
  },
};

export default nextConfig;
