const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/`, (_res) => {
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function main() {
  let activePort = 5173;
  if (await checkPort(5173)) {
    activePort = 5173;
  } else if (await checkPort(5174)) {
    activePort = 5174;
  }
  console.log(`Using active port: ${activePort}`);

  const captures = [
    { page: 'mobile-home', file: 'shot-mobile-home-actual.png', w: 402, h: 874 },
    { page: 'mobile-busca', file: 'shot-mobile-busca-actual.png', w: 402, h: 874 },
    { page: 'mobile-detalhes-produto', file: 'shot-mobile-detalhes-produto-actual.png', w: 402, h: 874 },
    { page: 'splash', file: 'shot-mobile-splash-actual.png', w: 402, h: 874 },
    { page: 'onboarding', file: 'shot-mobile-onboarding-actual.png', w: 402, h: 874 },
    { page: 'carrinho', file: 'shot-mobile-carrinho-actual.png', w: 402, h: 874 },
    { page: 'checkout', file: 'shot-mobile-checkout-actual.png', w: 402, h: 874 },
    { page: 'pedido-confirmado', file: 'shot-mobile-pedido-confirmado-actual.png', w: 402, h: 874 },
    { page: 'detalhes-servico', file: 'shot-mobile-detalhes-servico-actual.png', w: 402, h: 950 },
  ];

  for (const item of captures) {
    const outputPath = path.resolve(__dirname, '../public', item.file);
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }

    const url = `http://localhost:${activePort}/?page=${item.page}`;
    const cmd = `"${edgePath}" --headless=new --no-sandbox --disable-gpu --virtual-time-budget=1000 "--screenshot=${outputPath}" "--window-size=${item.w},${item.h}" --hide-scrollbars "${url}"`;

    console.log(`Capturing ${item.page} to ${item.file}...`);
    try {
      execSync(cmd, { encoding: 'utf-8', timeout: 30000 });
    } catch (err) {
      console.error(`Error capturing ${item.page}:`, err.message);
    }

    if (fs.existsSync(outputPath)) {
      console.log(`✓ Successfully captured ${item.page}`);
    } else {
      console.error(`✗ Failed to capture ${item.page}`);
    }
  }

  console.log('Mobile captures completed!');
}

main().catch(console.error);
