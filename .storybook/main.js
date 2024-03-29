const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WindiCSS = require('windicss-webpack-plugin');

module.exports = {
  staticDirs: ['../public'],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  env: (config) => ({
    ...config,
    NEXT_PUBLIC_SHOPIFY_STORE_ID: process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID,
    NEXT_PUBLIC_SHOPIFY_API_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_API_TOKEN,
  }),
  webpackFinal: async (config) => {
    config.plugins.push(
      new WindiCSS({
        config: path.resolve(__dirname, '..', 'windi.config.ts'),
      }),
    );
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];
    return config;
  },
};
