import { merge } from 'webpack-merge';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import commonConfig from './webpack.common.js';

export default merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './demo/demo.ts',
  output: {
    scriptType: 'text/javascript',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    host: 'local-ip',
    port: 8080,
    server: 'https',
    hot: 'only',
    static: {
      directory: '/dist',
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: '/demo/demo.html',
    }),
  ],
});
