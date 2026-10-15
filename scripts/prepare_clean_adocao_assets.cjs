const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function main() {
  const destDir = path.join(__dirname, '../public/images/desktop');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const row1Y = 364;
  const row2Y = 796;
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

  // Create feather mask for seamless background patching
  const patchW = 44;
  const patchH = 44;
  const maskSvg = Buffer.from(
    `<svg width="${patchW}" height="${patchH}">
      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="100%" stop-color="#fff" stop-opacity="0.3"/>
        </radialGradient>
      </defs>
      <rect width="${patchW}" height="${patchH}" rx="12" fill="url(#grad)"/>
    </svg>`
  );

  for (const p of pets) {
    const rawBuffer = await sharp('design/Desktop/adocao.png')
      .extract({ left: p.left, top: p.top, width: imgW, height: imgH })
      .png()
      .toBuffer();

    // Extract natural background patch from x=200, y=8
    const patch = await sharp(rawBuffer)
      .extract({ left: 200, top: 8, width: patchW, height: patchH })
      .composite([{ input: maskSvg, blend: 'dest-in' }])
      .png()
      .toBuffer();

    // Composite patch over the baked-in circle (left: 250, top: 8)
    await sharp(rawBuffer)
      .composite([{ input: patch, left: 250, top: 8 }])
      .toFile(path.join(destDir, p.name));

    console.log('Cleaned and saved:', p.name);
  }

  console.log('All 8 pet images cleaned and saved with exact coordinates!');
}

main().catch(console.error);
