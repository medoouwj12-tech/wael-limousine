import { readFileSync } from 'fs';
import { createContext, runInContext } from 'vm';

const src = readFileSync(new URL('./js/script.js', import.meta.url), 'utf8');
const marker = '  // ============ STATE ============';
const start = src.indexOf('const I18N = ');
const end = src.indexOf(marker);
if (start < 0 || end < 0) throw new Error('I18N not found');
const I18N = runInContext('(' + src.slice(start + 'const I18N = '.length, end).trim().replace(/;\s*$/, '') + ')', createContext({}));

function t(key, lang) {
  const dict = I18N[lang] || {};
  const parts = key.split('.');
  let cur = dict;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in cur) cur = cur[p];
    else { cur = undefined; break; }
  }
  if (cur !== undefined) return cur;
  return dict[key];
}

const keys = [];
for (let i = 1; i <= 13; i++) {
  keys.push(`services.s${i}.title`, `services.s${i}.desc`);
}

let bad = [];
for (const k of keys) {
  const v = t(k, 'ar');
  if (typeof v !== 'string' || !v) bad.push(`${k} => ${String(v)}`);
}

console.log(bad.length ? bad.join('\n') : 'All service keys resolve to Arabic strings');
