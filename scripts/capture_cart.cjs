const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const captures = [
  { file: 'shot-carrinho-1440-actual.png', w: 1440, h: 950 },
  { file: 'shot-carrinho-mobile-actual.png', w: 402, h: 874 },
];

for (const item of captures) {
  const outputPath = path.resolve(__dirname, '../public', item.file);
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }
  const cmd = `"${edgePath}" --headless=new --no-sandbox --disable-gpu --virtual-time-budget=1200 "--screenshot=${outputPath}" "--window-size=${item.w},${item.h}" --hide-scrollbars "http://localhost:5173/?page=carrinho"`;
  console.log(`Capturing ${item.file} (${item.w}x${item.h})...`);
  execSync(cmd, { encoding: 'utf-8', timeout: 30000 });
  if (fs.existsSync(outputPath)) {
    console.log(`✓ Successfully captured ${item.file}`);
  }
}
console.log('Cart captures complete!');
