import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';
import gzip from 'rollup-plugin-gzip';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'lib/tangly.js',
    output: {
      name: 'tangly',
      file: pkg.main,
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs({
        namedExports: {
          'node_modules/iota.lib.js/index.js': ['IOTA']
        }
      }),
      json(),
      // uglify(), // add to production build
      // gzip() // add to production build
    ]
  },
];