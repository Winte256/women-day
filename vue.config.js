const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [path.resolve(__dirname, './src/assets/styles/*.styl')],
    },
  },
});
