const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputPath = path.resolve(__dirname, '../public/shot-cadastro-1440-actual.png');

if (fs.existsSync(outputPath)) {
  fs.unlinkSync(outputPath);
}

const targetUrl = 'http://localhost:5173/?page=cadastro';
const cmd = `"${edgePath}" --headless=new --no-sandbox --disable-gpu --virtual-time-budget=1000 "--screenshot=${outputPath}" "--window-size=1440,900" --hide-scrollbars "${targetUrl}"`;

console.log('Running:', cmd);
try {
  const stdout = execSync(cmd, { encoding: 'utf-8', timeout: 30000 });
  console.log('Output:', stdout);
} catch (err) {
  console.error('Error running headless edge:', err.message);
}

if (fs.existsSync(outputPath)) {
  console.log('Screenshot of cadastro successfully created at:', outputPath);
} else {
  console.error('Screenshot was not generated!');
}

process.exit(0);
