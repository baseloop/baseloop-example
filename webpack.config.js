/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

// target = 'client' | 'server'
// mode   = 'development' | 'production'
module.exports = ({ target, mode }) => {
  return {
    mode,
    devtool: mode == 'development' ? 'eval-cheap-module-source-map' : undefined,
    entry: `./src/${target}/index.ts`,
    target: target == 'server' ? 'node' : undefined,
    output: {
      publicPath: '/',
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist/' + target),
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
        },
      ],
    },
    resolve: {
      symlinks: false,
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
      new HtmlWebPackPlugin({
        hash: true,
        template: './src/server/static/index.html',
        filename: './index.html',
      }),
      new webpack.ContextReplacementPlugin(/any-promise/),
    ],
  }
}
