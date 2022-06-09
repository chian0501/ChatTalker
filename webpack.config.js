<<<<<<< HEAD
// Node.js的核心模塊，專門用來處理文件路徑
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 入口
  // 相對路徑和絕對路徑都行
  entry: './src/js/entry.js',
  // 輸出
  output: {
    // path: 文件輸出目錄，必須是絕對路徑
    // path.resolve()方法返回一個絕對路徑
    // __dirname 當前文件的文件夾絕對路徑
    path: path.resolve(__dirname, 'src'),
    // filename: 輸出文件名
    filename: './js/all.js',
  },
  // 模式 development-測試環境未壓縮  production-正式環境壓縮檔案
  mode: 'development',
  // 加載器
  module: {
    rules: [
      {
        test: /\.css$/, // 只检测.css文件
        // 执行顺序：从右到左（从下到上）
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env', // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env', // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset/resource',
      },
=======
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
>>>>>>> 9aa21b1a4c709e15555fb132d30e3f7c01f08b44
    ],
  },
  // 插件
  plugins: [
<<<<<<< HEAD
    // css自動產生
    new MiniCssExtractPlugin({
      filename: './css/all.css',
    }),
  ],
=======
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
>>>>>>> 9aa21b1a4c709e15555fb132d30e3f7c01f08b44
};
