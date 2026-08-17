
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {babel} from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
import typescript from 'rollup-plugin-typescript2';
import yaml from '@rollup/plugin-yaml';
import commonjs from '@rollup/plugin-commonjs';
import {uglify} from 'rollup-plugin-uglify';
import packageInfo from '../../package.json';

const {
  resolveRootPath,
} = require('./utils');

const extensions = ['.ts', '.d.ts', '.js'];

const inputFile = resolveRootPath('src/index.ts');

const config = [
  {
   
    input: inputFile,
    output: {
      file: resolveRootPath('npm/disable-devtool.min.js'),
      format: 'umd',
      name: 'DisableDevtool',
    },
    plugins: [
      uglify(),
      commonjs(),
      yaml(),
      typescript(),
      nodeResolve({
        extensions,
      }),
      babel({
        exclude: 'node_modules/**',
        extensions,
      }),
    ],
    // sourceMap: true,
    external: packageInfo.dependencies,
  },
  {
  
    input: inputFile,
    output: {
      file: resolveRootPath('npm/index.d.ts'),
      format: 'es',
    },
    plugins: [dts()],
  },
];

export default config;


