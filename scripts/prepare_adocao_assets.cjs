const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function main() {
  const destDir = path.join(__dirname, '../public/images/desktop');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const row1Y = 364;
  const row2Y = 780;
  const imgW = 302;
  const imgH = 218;

  const pets = [
    { name: 'pet-baily.png', left: 80, top: row1Y },
    { name: 'pet-mel.png', left: 406, top: row1Y },
    { name: 'pet-fred.png', left: 732, top: row1Y },
    { name: 'pet-luna.png', left: 1058, top: row1Y },
    { name: 'pet-pipoca.png', left: 80, top: row2Y },
    { name: 'pet-amora.png', left: 406, top: row2Y },
    { name: 'pet-thor.png', left: 732, top: row2Y },
    { name: 'pet-clara.png', left: 1058, top: row2Y },
  ];

  for (const p of pets) {
    await sharp('design/Desktop/adocao.png')
      .extract({ left: p.left, top: p.top, width: imgW, height: imgH })
      .toFile(path.join(destDir, p.name));
    console.log('Saved', p.name);
  }

  console.log('All 8 pet images extracted with exact coordinates!');
}

main().catch(console.error);
