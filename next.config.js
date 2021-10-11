const WindiCSS = require('windicss-webpack-plugin').default;

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  webpack(config) {
    config.plugins.push(new WindiCSS());
    return config;
  },
};
