const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  // 入口路徑
  entry: './src/javascript/index.js',
  // 模式 development-測試環境未壓縮  production-正式環境壓縮檔案
  mode: 'development',
  // 出口路徑 [hash]-每次都輸出不同數字避免快取到舊的檔案
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index-bundle.[hash].js',
  },
  // loader重新定義webpack看得懂的規則
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // 讓webpack讀懂圖檔
      {
        test: /\.png/,
        type: 'asset/resource',
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
      filename: 'all.[hash].css',
    }),
  ],
  // 字串
  // 8080顯示原始碼
  devtool: 'source-map',
};
