const path = require('path');
const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');
const typescript = require('@zeit/next-typescript');
module.exports = withPlugins([
  [sass, {
    cssModules: true,
    sassLoaderOptions: {
      includePaths: [
        'node_modules',
        'src/styles'
      ]
    }
  }],
  [typescript]
], {
  distDir: '../.next',
  webpack(config) {
    config.resolve.modules.push(path.resolve('src'));
    return config;
  },
  // Reference to nextjs.org/docs/#static-html-export
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' }
    }
  }
});
