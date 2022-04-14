const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      modules: [
        path.join(__dirname, 'node_modules')
      ]
    },
    module: {
      rules: [
        {
          test: /\.(svg|png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
          exclude: /(icons)/
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(__dirname, 'tsconfig.json')
              },
            },
          ],
          exclude: /(node_modules)/
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new CopyPlugin({
        patterns: [{
          from: 'src/assets/images/icons',
          to: './assets/image',
        }]
      }),
    ]
  };
