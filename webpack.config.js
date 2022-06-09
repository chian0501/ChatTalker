const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  // 入口路徑
  entry: 'src/js/index.js',
  // 模式 development-測試環境未壓縮  production-正式環境壓縮檔案
  mode: 'development',
  // 出口路徑
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/index.[hash].js',
    //打包後的檔案名稱 [hash]-每次都輸出不同數字避免快取到舊的檔案
  },
  // loader重新定義webpack看得懂的規則
  module: {
    rules: [
      {
        test: /\.css$|\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      // 讓webpack讀懂圖檔
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      //所有.js檔都會用Babel編譯
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  // 插件
  plugins: [
    // html自動產生
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    // css自動產生
    new MiniCssExtractPlugin({
      filename: 'css/all.[hash].css',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'src/image', to: './image' }],
    }),
    new webpack.DefinePlugin({
      // Definitions...
      PRODUCTION: JSON.stringify(false),
    }),
    new CompressionPlugin(),
  ],
  // 字串
  // 8080顯示原始碼
  devtool: 'source-map',
};
