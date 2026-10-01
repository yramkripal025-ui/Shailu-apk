import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const html = await readFile('www/index.html', 'utf8');
const required = [
  'function defaultData()',
  'async function loadData()',
  'async function saveData(data)',
  'function markPaid(',
  'function addCustomer(',
  'function updateCustomer(',
  'function moveToTrash(',
  'function restoreFromTrash(',
  'function deletePermanently(',
  'function exportBackup(',
  'function importBackup(',
  'function exportExcel(',
  'function importExcel(',
  'function addExpense(',
  'function render(',
  'async function boot()'
];
for (const token of required) {
  if (!html.includes(token)) throw new Error(`Missing required app function: ${token}`);
}
if (html.includes('cdnjs.cloudflare.com/ajax/libs/xlsx')) {
  throw new Error('External XLSX CDN dependency is still present.');
}
if (!html.includes('vendor/xlsx.full.min.js')) {
  throw new Error('Local XLSX bundle reference is missing.');
}
if (!existsSync('www/vendor/xlsx.full.min.js')) {
  throw new Error('Local XLSX bundle has not been generated.');
}
const match = html.match(/<script>\s*([\s\S]*?)\s*<\/script>/g);
if (!match?.length) throw new Error('No inline application script found.');
const inline = match[match.length - 1].replace(/^<script>\s*/, '').replace(/\s*<\/script>$/, '');
await import('node:fs/promises').then(fs => fs.writeFile('/tmp/shailu-app-inline.js', inline));
execFileSync(process.execPath, ['--check', '/tmp/shailu-app-inline.js'], { stdio: 'inherit' });
console.log('Validation passed: required functions, local XLSX dependency and JS syntax are OK.');
