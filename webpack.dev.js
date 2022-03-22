const path = require('path');
const { merge } = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
  devServer: {
    static: {
        directory: path.join(__dirname, 'public'),
    },
    watchFiles: ['src/**/*.tsx'],
    compress: true,
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: true,
  }
});
