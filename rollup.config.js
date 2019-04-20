import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import analyze from 'rollup-plugin-analyzer';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/umd/index.js',
    name: 'PreloaderIcon',
    format: 'umd',
    sourcemap: true,
    globals: {
      'react': 'React',
    }
  },
  external: [
    'react'
  ],
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
    }),
    analyze({
      root: 'dist/umd',
      filter: 'index.umd.js'
    })
  ]
};
