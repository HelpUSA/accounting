const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function capture() {
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('Iniciando navegador Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

  console.log('Navegando para https://accounting.helpusbr.com...');
  await page.goto('https://accounting.helpusbr.com', { waitUntil: 'networkidle2' });

  // 1. Full Desktop View
  console.log('Capturando Tela Principal (Desktop)...');
  await page.screenshot({
    path: path.join(screenshotsDir, '01-visao-geral-portal.png'),
    fullPage: false
  });

  // 2. Open User Manual Modal
  console.log('Abrindo Modal do Manual do Usuário...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const target = btns.find(b => b.textContent.includes('Manual'));
    if (target) target.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.join(screenshotsDir, '02-modal-manual-usuario.png'),
    fullPage: false
  });

  // Close modal
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const target = btns.find(b => b.textContent.includes('Entendi') || b.textContent.includes('✕'));
    if (target) target.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // 3. Mobile Viewport Screenshot
  console.log('Capturando Visão Mobile...');
  await page.setViewport({ width: 395, height: 800, deviceScaleFactor: 2 });
  await page.screenshot({
    path: path.join(screenshotsDir, '03-visao-mobile-responsiva.png'),
    fullPage: false
  });

  await browser.close();
  console.log('Screenshots capturadas com sucesso na pasta:', screenshotsDir);
}

capture().catch(err => {
  console.error('Erro ao capturar screenshots:', err);
});
