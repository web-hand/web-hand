import { merge } from 'webpack-merge';
import commonConfig from './webpack.common.js';

export default merge(commonConfig, {
  mode: 'production',
  target: ['web', 'es2020'],
  entry: '/src/index.ts',
  output: {
    filename: 'web-hand.js',
    library: {
      type: 'module',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              target: 'es2020',
              parser: {
                syntax: 'typescript',
                dynamicImport: true,
                decorators: true,
              },
              minify: {
                compress: {
                  comparisons: true,
                  computed_props: true,
                  conditionals: true,
                  dead_code: true,
                  directives: true,
                  ecma: 2020,
                  evaluate: true,
                  if_return: true,
                  join_vars: true,
                  module: true,
                  negate_iife: true,
                  sequences: true,
                  switches: true,
                  unused: true,
                },
              },
            },
            module: {
              type: 'es6',
              strict: true,
              strictMode: true,
            },
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
});
