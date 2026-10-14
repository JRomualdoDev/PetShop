const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgeExe = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const targetFile = path.resolve('public/shot-detail-1440-actual.png');

const cmd = `"${edgeExe}" --headless=new --no-sandbox --disable-gpu "--screenshot=${targetFile}" "--window-size=1440,2150" --hide-scrollbars "http://localhost:5173/?page=detalhes-produto"`;
console.log('Running:', cmd);
try {
  const out = execSync(cmd, { encoding: 'utf8', timeout: 30000 });
  console.log('Output:', out);
  if (fs.existsSync(targetFile)) {
    console.log('Screenshot successfully created at:', targetFile);
  } else {
    console.log('Target file not created.');
  }
} catch (err) {
  console.error('Error:', err.message, err.stdout, err.stderr);
}
