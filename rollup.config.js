import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const outputOptions = {
  name: 'PreloaderIcon',
  format: 'umd',
  sourcemap: true,
  globals: {
    'react': 'React'
  },
};

export default {
  input: 'src/index.ts',
  output: [{
    ...outputOptions,
    file: 'dist/umd/preloader.umd.js',
  }, {
    ...outputOptions,
    file: 'dist/umd/preloader.min.js',
    plugins: [
      terser({
        output: {
          comments: false
        },
        sourcemap: true
      })
    ]
  }],
  external: ['react'],
  plugins: [
    typescript({
      clean: true,
      tsconfig: 'tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          module: 'es2015',
          sourceMap: true
        }
      }
    }),
    resolve(),
    commonjs({
      include: [
        'node_modules/bezier-easing/src/index.js'
      ],
    })
  ]
}
