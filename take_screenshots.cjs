const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgeExe = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userHome = 'C:\\Users\\jromu';
const destDir = path.resolve('public');

const tasks = [
  { name: 'shot-mobile-390.png', width: 390, height: 844, url: 'http://127.0.0.1:5173/' },
  { name: 'shot-tablet-768.png', width: 768, height: 1024, url: 'http://127.0.0.1:5173/' },
  { name: 'shot-desktop-1024.png', width: 1024, height: 800, url: 'http://127.0.0.1:5173/' },
  { name: 'shot-desktop-1440.png', width: 1440, height: 900, url: 'http://127.0.0.1:5173/' },
  { name: 'shot-search-390.png', width: 390, height: 844, url: 'http://127.0.0.1:5173/?tab=buscar' },
  { name: 'shot-search-1200.png', width: 1200, height: 850, url: 'http://127.0.0.1:5173/?tab=buscar' },
  { name: 'shot-detail-390.png', width: 390, height: 844, url: 'http://127.0.0.1:5173/?product=fonte-agua' },
  { name: 'shot-detail-1200.png', width: 1200, height: 900, url: 'http://127.0.0.1:5173/?product=fonte-agua' },
];

for (const task of tasks) {
  const tempFile = path.join(userHome, `temp_${task.name}`);
  const cmd = `"${edgeExe}" --headless=new --no-sandbox --disable-gpu "--screenshot=${tempFile}" "--window-size=${task.width},${task.height}" --hide-scrollbars "${task.url}"`;
  console.log(`Capturing ${task.name} (${task.width}x${task.height})...`);
  try {
    execSync(cmd, { stdio: 'ignore', timeout: 15000 });
    const targetFile = path.join(destDir, task.name);
    if (fs.existsSync(tempFile)) {
      fs.copyFileSync(tempFile, targetFile);
      fs.unlinkSync(tempFile);
      console.log(`✓ Saved ${task.name}`);
    } else {
      console.error(`✗ Temp file not found: ${tempFile}`);
    }
  } catch (err) {
    console.error(`Error capturing ${task.name}:`, err.message);
  }
}
console.log('Finished capturing all screenshots!');
