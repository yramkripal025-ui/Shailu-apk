import { mkdir, copyFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = resolve('node_modules/xlsx/dist/xlsx.full.min.js');
const target = resolve('www/vendor/xlsx.full.min.js');

await access(source);
await mkdir(resolve('www/vendor'), { recursive: true });
await copyFile(source, target);
console.log(`Bundled XLSX: ${target}`);
