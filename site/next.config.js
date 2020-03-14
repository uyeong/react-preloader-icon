const path = require('path');
const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');

module.exports = withPlugins([
  [sass, {
    cssModules: true,
    sassLoaderOptions: {
      includePaths: [
        'node_modules',
        'styles'
      ]
    }
  }],
], {
  assetPrefix: process.env.NODE_ENV === 'production' ? '/react-preloader-icon' : './',
  webpack(config) {
    config.resolve.modules.push(path.resolve('./'));
    return config;
  },
  // Reference to nextjs.org/docs/#static-html-export
  exportPathMap: () => ({
    '/': { page: '/' }
  })
});
