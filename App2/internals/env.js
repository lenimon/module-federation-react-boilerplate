const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
const paths = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV || 'development';
// if (!NODE_ENV) {
//   throw new Error(
//     'The NODE_ENV environment variable is required but was not specified.'
//   );
// }

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    dotenv.config({
      path: dotenvFile,
    });
  }
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// It works similar to `NODE_PATH` in Node itself:
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => path.resolve(appDirectory, folder))
  .join(path.delimiter);

const REACT_APP = /^REACT_APP_/i;
const PUBLIC_PATH = /^PUBLIC_PATH/i;
const BUILD_FOLDER_PATH = /^BUILD_FOLDER_PATH/i;

function getClientEnvironment() {
  const raw = Object.keys(process.env)
    .filter(
      (key) =>
        REACT_APP.test(key) ||
        PUBLIC_PATH.test(key) ||
        BUILD_FOLDER_PATH.test(key),
    )
    .reduce(
      (env, key) =>
        Object.assign(env, {
          [key]: process.env[key],
        }),
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
      },
    );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce(
      (env, key) =>
        Object.assign(env, {
          [key]: JSON.stringify(raw[key]),
        }),
      {},
    ),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
