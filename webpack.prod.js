const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const clientConfig = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
});

const serverConfig = {
  target: 'node',
  entry: './src/server/app.ts',
  mode: process.env.NODE_ENV ?? 'development',
  output: {
    filename: 'server.js',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [new TerserPlugin()],
  },
};

module.exports = [clientConfig, serverConfig];
