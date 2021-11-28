import path from 'path';
import { peerDependencies } from './package.json';

const config = {
  entry: path.join(__dirname, 'src', 'index.ts'),
  mode: 'production',
  externals: Object.fromEntries(
    Object.keys(peerDependencies).map((dependency) => [
      dependency,
      `commonjs2 ${dependency}`,
    ]),
  ),
  module: {
    rules: [
      {
        test: /\.(js|tsx|ts)$/,
        loader: 'babel-loader',
        options: { babelrc: true },
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: {
      name: 'react-router-scroll-to-top',
      type: 'umd',
    },
    clean: true,
  },
};

export default config;
