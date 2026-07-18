// Rename car images to match their actual content
// Then update the FLEET array in script.js to reference the correct filenames

const fs = require('fs');
const path = require('path');

const CARS_DIR = path.join('D:\\وائل', 'images', 'cars');

// Mapping: old filename -> new filename (matches what the image actually shows)
const RENAMES = {
  'mercedes-sclass-maybach.jpg': 'kia-carnival.jpg',
  'mercedes-g63-amg.jpg':        'hyundai-elantra-2024.jpg',
  'mercedes-e-class.jpg':        'foton-view-van.jpg',
  'mercedes-glc-300.jpg':        'mercedes-g63-amg.jpg',
  'kia-carnival.jpg':            'toyota-corolla.jpg',
  'mg-rx5-plus.jpg':             'mercedes-sclass-maybach.jpg',
  'hyundai-elantra-2024.jpg':    'mercedes-e-class.jpg',
  'toyota-corolla.jpg':          'mercedes-e-class-white.jpg', // second E-Class photo (white)
  'foton-view-van.jpg':          'mg-rx5-plus.jpg'
};

// First: do a temp-rename to avoid collisions (e.g., kia-carnival.jpg -> toyota-corolla.jpg
// but toyota-corolla.jpg also wants to become something else)
const temp = '__temp__';
const steps = [];

// Step 1: rename every old file to a temp name
for (const oldName of Object.keys(RENAMES)) {
  const oldPath = path.join(CARS_DIR, oldName);
  const tempPath = path.join(CARS_DIR, temp + oldName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, tempPath);
    steps.push({ from: oldName, to: temp + oldName });
  }
}

// Step 2: rename temp -> final
for (const [oldName, newName] of Object.entries(RENAMES)) {
  const tempPath = path.join(CARS_DIR, temp + oldName);
  const finalPath = path.join(CARS_DIR, newName);
  if (fs.existsSync(tempPath)) {
    fs.renameSync(tempPath, finalPath);
    steps.push({ from: temp + oldName, to: newName });
  }
}

console.log('Renamed ' + (steps.length / 2) + ' files:');
for (const step of steps.filter((_, i) => i % 2 === 0)) {
  console.log('  ' + step.from + '  ->  ' + RENAMES[step.from]);
}
console.log('\nFinal fleet files:');
const files = fs.readdirSync(CARS_DIR).sort();
for (const f of files) {
  const stat = fs.statSync(path.join(CARS_DIR, f));
  console.log('  ' + f + '  (' + Math.round(stat.size / 1024) + ' KB)');
}
