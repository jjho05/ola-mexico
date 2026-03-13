const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('response', response => {
    if (response.status() === 404) {
      console.log('404 URL:', response.url());
    }
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text());
    }
  });
  
  try {
    await page.goto('https://jesusolv05-ola-mexico.hf.space', { waitUntil: 'networkidle0' });
  } catch (e) {
    console.log("Goto error:", e);
  }
  
  await browser.close();
})();
