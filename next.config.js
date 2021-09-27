const WindiCSS = require('windicss-webpack-plugin').default;

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com'],
  },
  webpack(config) {
    config.plugins.push(new WindiCSS());
    return config;
  },
};
