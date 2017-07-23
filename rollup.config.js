/* eslint import/no-extraneous-dependencies: "off" */

import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

const nodeEnv = process.env.NODE_ENV;

const basePlugins = [
  nodeResolve({
    jsnext: true,
  }),
  babel({
    exclude: 'node_modules/**',
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(nodeEnv),
  }),
];

const prodPlugins = [
  uglify({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false,
    },
  }),
];

const config = {
  format: 'umd',
  moduleName: 'Redux',
  plugins: nodeEnv === 'production' ? [...basePlugins, ...prodPlugins] : basePlugins,
};

export default config;
