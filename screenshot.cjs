// Take screenshots of the final site — scrolls first so reveal animations trigger
const { chromium } = require('playwright');
const path = require('path');

async function scrollThrough(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 200;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  });
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);

  // Scroll to trigger all reveal animations
  await scrollThrough(page);

  // Full page (AR dark)
  await page.screenshot({
    path: path.join('D:\\وائل', '_final_full_ar_dark.png'),
    fullPage: true
  });
  console.log('Saved: _final_full_ar_dark.png');

  // Hero only (AR dark)
  await page.screenshot({
    path: path.join('D:\\وائل', '_final_hero_ar_dark.png'),
    fullPage: false
  });
  console.log('Saved: _final_hero_ar_dark.png');

  // Switch to English
  await page.click('button[data-lang="en"]');
  await page.waitForTimeout(800);
  await scrollThrough(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Full page (EN dark)
  await page.screenshot({
    path: path.join('D:\\وائل', '_final_full_en_dark.png'),
    fullPage: true
  });
  console.log('Saved: _final_full_en_dark.png');

  // Switch to light theme
  await page.click('#theme-toggle');
  await page.waitForTimeout(800);
  await scrollThrough(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Full page (EN light)
  await page.screenshot({
    path: path.join('D:\\وائل', '_final_full_en_light.png'),
    fullPage: true
  });
  console.log('Saved: _final_full_en_light.png');

  // Testimonials
  await page.click('#theme-toggle'); // back to dark
  await page.waitForTimeout(500);
  await page.click('button[data-lang="en"]');
  await page.waitForTimeout(500);
  await page.evaluate(() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join('D:\\وائل', '_final_testimonials_en.png'),
    fullPage: false
  });
  console.log('Saved: _final_testimonials_en.png');

  // About
  await page.evaluate(() => document.getElementById('about')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join('D:\\وائل', '_final_about_en.png'),
    fullPage: false
  });
  console.log('Saved: _final_about_en.png');

  // Fleet
  await page.evaluate(() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join('D:\\وائل', '_final_fleet_en.png'),
    fullPage: false
  });
  console.log('Saved: _final_fleet_en.png');

  await browser.close();
  console.log('All screenshots done!');
})().catch(err => { console.error('Error:', err); process.exit(1); });
