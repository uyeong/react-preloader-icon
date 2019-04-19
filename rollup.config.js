import typescript from 'rollup-plugin-typescript2';
import analyze from 'rollup-plugin-analyzer';

export default {
  input: 'src/index.tsx',
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
    analyze({
      root: 'dist/umd',
      filter: 'index.umd.js'
    })
  ]
};
