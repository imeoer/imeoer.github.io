const webpackBaseConfig = require('./webpack.config.base')
const path = require('path')
const webpack = require('webpack')
const loaders = webpackBaseConfig.module.loaders
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = Object.assign(webpackBaseConfig, {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './app.js'
  ],
  output: {
    path: path.join(__dirname),
    filename: 'index.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.template',
      filename: `./index.html`
    })
  ],
  module: {
    loaders: loaders.concat([{
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader',
      include: __dirname
    }])
  }
})
