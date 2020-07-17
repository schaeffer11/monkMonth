const webpack = require('webpack')
const dotenv = require('dotenv')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')


const distPath = path.join(__dirname, '/dist')
const embedFileSize = 150000

// Used for injection of environment variabls into the distributed code
// TODO: Do not import all of the secrets to the client side!
const env = dotenv.config().parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})


module.exports = {
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: `${distPath}/js`,
    filename: 'app.js',
  },
  mode: 'development',
  devtool: false,
  plugins: [
    new CopyWebpackPlugin([{ from: './client/public', to: distPath }]),
    new MiniCssExtractPlugin({ filename: '../css/app.css' }),
    new webpack.DefinePlugin(envKeys),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: [
        '/node_modules/',
        '/client/lib/geotoolkit/',
      ],
    }),
    new webpack.ProvidePlugin({ _: 'underscore', jQuery: 'jquery', $: 'jquery' }),
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: 'all',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    })],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /client\/lib\/geotoolkit/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: '@svgr/webpack',
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        options: {
          mimetype: 'image/png',
          limit: embedFileSize,
        },
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader',
        options: {
          mimetype: 'image/jpeg',
          limit: embedFileSize,
        },
      },
      {
        test: /\.gif$/,
        loader: 'url-loader',
        options: {
          mimetype: 'image/gif',
          limit: embedFileSize,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader',
      },
    ],
  },
}
