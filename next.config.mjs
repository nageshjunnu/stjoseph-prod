/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['kyroes.co'],
  },
  webpack: (config, { isServer }) => {
    // Modify webpack config here
    return config;
  },

};

export default nextConfig;
