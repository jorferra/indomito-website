const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto('https://jorferra.github.io/indomito-website/#/carta', { waitUntil: 'networkidle0' });
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log(html.substring(0, 500));
  if (html.length < 1000) {
    console.log("PAGE MIGHT BE BLANK. FULL HTML:");
    console.log(html);
  } else {
    console.log("HTML length:", html.length);
  }
  await browser.close();
})();
