/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const { getFederationConfig } = require('../federation.config');
const federationConfig = getFederationConfig();
const getClientEnvironment = require('../env');
const env = getClientEnvironment().raw;
const PUBLIC_PATH = env.PUBLIC_PATH || '/';
const BUILD_FOLDER_PATH = env.BUILD_FOLDER_PATH || `build`;
const { ModuleFederationPlugin } = webpack.container;

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), `${BUILD_FOLDER_PATH}${PUBLIC_PATH}`),
      publicPath: PUBLIC_PATH,
    },
    options.output,
  ), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new ModuleFederationPlugin({
      name: federationConfig.hostScope,
      filename: 'remoteEntry.js',
      remotes: federationConfig.remoteScopes,
      exposes: federationConfig.exposedFactories,
      shared: {
        react: { singleton: true, requiredVersion: '16.8.6' },
        'react-redux': { singleton: true, requiredVersion: '16.8.6' },
        'react-dom': { singleton: true, requiredVersion: '16.8.6' },
        '@material-ui/core/': {
          singleton: true,
          requiredVersion: '4.11.1',
        },
        '@material-ui/styles/': {
          singleton: true,
          requiredVersion: '4.11.1',
        },
      },
    }),
  ]),
  resolve: {
    alias: {
      stream: 'stream-browserify',
      path: 'path-browserify',
      process: 'process/browser',
      domain: 'domain-browser',
    },
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.jsx', '.react.js', '.ts', '.tsx'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  devtool: options.devtool,
  target: ['web', 'es5'], // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
