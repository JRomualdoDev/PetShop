const { execSync } = require('child_process');
const fs = require('fs');
const sharp = require('sharp');

const edgeExe = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 0; background: red; }
  .screen { width: 402px; height: 874px; background: #3b82f6; position: absolute; left: 0; top: 0; }
</style>
</head>
<body>
  <div class="screen"></div>
</body>
</html>
`;

fs.writeFileSync('test-align.html', html);
execSync(`"${edgeExe}" --headless=new --no-sandbox --disable-gpu --virtual-time-budget=500 --window-size=402,874 --hide-scrollbars "--screenshot=test-align.png" "file://${process.cwd().replace(/\\/g, '/')}/test-align.html"`);

sharp('test-align.png').metadata().then(meta => {
  console.log('test-align.png dimensions:', meta.width, meta.height);
  fs.unlinkSync('test-align.html');
  fs.unlinkSync('test-align.png');
});
