const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:8766/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.evaluate(async () => {
    await new Promise(r => {
      let h = 0; const d = 200;
      const t = setInterval(() => {
        window.scrollBy(0, d); h += d;
        if (h >= document.body.scrollHeight) { clearInterval(t); r(); }
      }, 50);
    });
  });
  await page.waitForTimeout(800);
  await page.click('button[data-lang="en"]');
  await page.waitForTimeout(500);
  await page.evaluate(() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(1500);
  // Scroll down a bit to see more fleet cards
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join('D:\\وائل', '_final_fleet_full.png'), fullPage: false });
  console.log('Saved: _final_fleet_full.png');
  await browser.close();
})();
