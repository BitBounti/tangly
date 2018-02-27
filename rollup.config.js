import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import pkg from './package.json';

export default [
  {
    input: 'lib/tangly.js',
    output: {
      name: 'tangly',
      file: pkg.main,
      format: 'umd',
      sourcemap: true,
      globals: {
        'iota.lib.js': 'IOTA',
        'crypto-js': 'CryptoJS'
      }
    },
    plugins: [
      commonjs(),
      json()
    ]
  }
];