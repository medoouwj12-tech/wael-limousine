// Resize the master 1024 icon into all the favicon + PWA sizes we need
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE = path.join('D:\\وائل', 'images', 'icon-1024.png');
const DEST_IMG = path.join('D:\\وائل', 'images');
const DEST_ICONS = path.join('D:\\وائل', 'icons');

// Make sure output dirs exist
if (!fs.existsSync(DEST_ICONS)) fs.mkdirSync(DEST_ICONS, { recursive: true });

const sizes = [
  // favicons
  { name: 'favicon-16x16.png',     size: 16,  dest: DEST_IMG,  maskable: false },
  { name: 'favicon-32x32.png',     size: 32,  dest: DEST_IMG,  maskable: false },
  { name: 'favicon-48x48.png',     size: 48,  dest: DEST_IMG,  maskable: false },
  // apple touch icon
  { name: 'apple-touch-icon.png',  size: 180, dest: DEST_IMG,  maskable: false },
  // PWA icons
  { name: 'icon-192.png',          size: 192, dest: DEST_ICONS, maskable: false },
  { name: 'icon-512.png',          size: 512, dest: DEST_ICONS, maskable: false },
  // Android maskable (with safe zone)
  { name: 'icon-maskable-512.png', size: 512, dest: DEST_ICONS, maskable: true  },
];

(async () => {
  for (const item of sizes) {
    const out = path.join(item.dest, item.name);
    if (item.maskable) {
      // For maskable: black background + 64px safe zone padding (12.5%)
      const safe = Math.round(item.size * 0.125);
      const inner = item.size - safe * 2;
      const innerBuf = await sharp(SOURCE)
        .resize(inner, inner, { fit: 'contain', background: { r: 5, g: 5, b: 5, alpha: 1 } })
        .png()
        .toBuffer();
      await sharp({
        create: {
          width: item.size,
          height: item.size,
          channels: 4,
          background: { r: 5, g: 5, b: 5, alpha: 1 }
        }
      })
        .composite([{ input: innerBuf, top: safe, left: safe }])
        .png()
        .toFile(out);
    } else {
      await sharp(SOURCE)
        .resize(item.size, item.size, { fit: 'cover' })
        .png()
        .toFile(out);
    }
    console.log('Generated:', item.name, '(' + item.size + 'x' + item.size + ')');
  }
  console.log('All done!');
})();
