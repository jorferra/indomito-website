const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
app.use('/indomito-website', express.static('dist'));
const server = app.listen(3000, async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  page.on('requestfailed', request => {
    console.log('REQUEST FAILED:', request.url(), request.failure().errorText);
  });
  page.on('response', response => {
    if (!response.ok()) console.log('RESPONSE NOT OK:', response.url(), response.status());
  });
  await page.goto('http://localhost:3000/indomito-website/#/carta', { waitUntil: 'networkidle0' });
  const content = await page.content();
  console.log('CONTENT:', content.substring(0, 300));
  await browser.close();
  server.close();
});
