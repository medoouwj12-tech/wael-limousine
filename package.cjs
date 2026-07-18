// Build a clean deliverable zip — exclude dev files, screenshots, and node_modules
const fs = require('fs');
const path = require('path');
const { ZipArchive } = require('archiver');

const SRC = 'D:\\وائل';
const TIMESTAMP = new Date().toISOString().slice(0, 10);
const ZIP_NAME = `wael-limousine-${TIMESTAMP}.zip`;
const ZIP_PATH = path.join(SRC, ZIP_NAME);

// Directories and files to exclude
const EXCLUDE_DIRS = new Set(['node_modules', '.git', '.idea', '.vscode']);
const EXCLUDE_FILES = new Set([
  'package-lock.json',
  'screenshot.cjs',
  'package.cjs',
  'resize-icons.ps1',
  'resize-icons.cjs',
  '_demo_dark_ar.png',
  'icon-1024.png',
  'icon-512.png',
  '_zip.ps1'
]);
const EXCLUDE_PREFIXES = ['_final_', '_demo_'];

function shouldInclude(filename) {
  if (EXCLUDE_FILES.has(filename)) return false;
  for (const p of EXCLUDE_PREFIXES) {
    if (filename.startsWith(p)) return false;
  }
  return true;
}

function shouldIncludeDir(dirname) {
  return !EXCLUDE_DIRS.has(dirname);
}

// Walk and add files
function addFiles(archive, basePath, relPath = '') {
  const items = fs.readdirSync(basePath, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(basePath, item.name);
    const rel = relPath ? `${relPath}/${item.name}` : item.name;
    if (item.isDirectory()) {
      if (shouldIncludeDir(item.name)) {
        addFiles(archive, full, rel);
      }
    } else if (item.isFile()) {
      if (shouldInclude(item.name)) {
        archive.file(full, { name: rel });
        console.log('  +', rel);
      }
    }
  }
}

const output = fs.createWriteStream(ZIP_PATH);
const archive = new ZipArchive({ zlib: { level: 9 } });

output.on('close', () => {
  const size = archive.pointer();
  console.log('');
  console.log('✅ Zip created:', ZIP_PATH);
  console.log('   Size:', (size / 1024).toFixed(1), 'KB');
  console.log('   Files:', fs.statSync(ZIP_PATH).size, 'bytes');
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') console.warn('Warning:', err);
  else throw err;
});
archive.on('error', (err) => { throw err; });

archive.pipe(output);
addFiles(archive, SRC);
archive.finalize();
