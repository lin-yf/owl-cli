// @ts-check
// import fs from 'fs';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
// import alias from '@rollup/plugin-alias';
import pkg from './package.json';

const extensions = ['.js', '.ts'];

export default {
    input: path.resolve(__dirname, 'src/cli.ts'),
    output: {
        dir: path.resolve(__dirname, 'dist'),
        entryFileNames: `owl.js`,
        chunkFileNames: 'chunks/dep-[hash].js',
        exports: 'named',
        format: 'cjs',
        externalLiveBindings: false,
        freeze: false,
        sourcemap: false
    },
    plugins: [
        resolve(),
        babel({
            babelHelpers: 'bundled',
            extensions
        }),
        commonjs({
            extensions: ['.js', '.ts'],
            // Optional peer deps of ws. Native deps that are mostly for performance.
            // Since ws is not that perf critical for us, just ignore these deps.
            ignore: ['bufferutil', 'utf-8-validate']
        }),
        json(),
    ]
}