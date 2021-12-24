const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isProduction = process.env.NODE_ENV === 'production'

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '../backend/public/dist'),
    publicPath: '/dist',
    filename: isProduction ? '[name].[contenthash].js' : '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: '../index.html'
    }),
    new CompressionPlugin()
    // new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}

module.exports = () => {
  config.mode = isProduction ? 'production' : 'development'

  return config
}
