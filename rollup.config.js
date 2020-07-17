/* eslint-disable import/no-extraneous-dependencies */
import json from 'rollup-plugin-json'
import replace from 'rollup-plugin-replace'

const pkg = require('./package.json')

const external = Object.keys(pkg.dependencies)

export default {
  input: 'server/index.js',
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    json(),
  ],
  external: [
    ...external,
    'crypto',
  ],
  output: {
    file: pkg.main,
    format: 'cjs',
    sourcMap: true,
  },
}
