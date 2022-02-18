const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
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
    plugins: [new HtmlWebpackPlugin({
      template: 'index.html'
    })]
  }; 
