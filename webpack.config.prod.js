const webpackBaseConfig = require('./webpack.config.base')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const loaders = webpackBaseConfig.module.loaders

module.exports = Object.assign(webpackBaseConfig, {
  entry: {
    app: ['./app']
  },
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'index.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin( { sourceMap: false, compressor: { warnings: false } } ),
    new ExtractTextPlugin("index.css"),
    new HtmlWebpackPlugin({
      template: 'index.template',
      filename: `../index.html`
    })
  ],
  module: {
    loaders: loaders.concat([{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css!postcss'),
      include: __dirname
    }])
  }
})
