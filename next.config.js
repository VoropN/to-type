/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    );

    return config;
  },
};
