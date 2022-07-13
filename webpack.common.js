import ESLintPlugin from 'eslint-webpack-plugin';
import path from 'path';

export default {
  entry: '/src/index.ts',
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  optimization: {
    usedExports: true,
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ESLintPlugin({
      extensions: 'ts',
      threads: true,
    }),
  ],
};
