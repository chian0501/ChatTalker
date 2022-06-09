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
    ],
  },
  // 插件
  plugins: [
    // css自動產生
    new MiniCssExtractPlugin({
      filename: './css/all.css',
    }),
  ],
};
