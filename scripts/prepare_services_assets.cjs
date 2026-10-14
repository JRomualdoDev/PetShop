const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function main() {
  const destDir = path.join(__dirname, '../public/images/desktop');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const row1Y = 369;
  const row2Y = 764;
  const imgW = 405;
  const imgH = 180;

  const cards = [
    { name: 'service-vet-gustavo.png', left: 80, top: row1Y },
    { name: 'service-clinic-vetvida.png', left: 517, top: row1Y },
    { name: 'service-vet-carolina.png', left: 955, top: row1Y },
    { name: 'service-amigo-fiel.png', left: 80, top: row2Y },
    { name: 'service-resort-paradise.png', left: 517, top: row2Y },
    { name: 'service-adestramento-lucas.png', left: 955, top: row2Y },
  ];

  for (const c of cards) {
    await sharp('design/Desktop/servicos.png')
      .extract({ left: c.left, top: c.top, width: imgW, height: imgH })
      .toFile(path.join(destDir, c.name));
    console.log('Saved', c.name);
  }

  // Map illustration card with smooth rounded corner mask
  const w = 360;
  const h = 220;
  const rx = 20;
  const mask = Buffer.from(
    `<svg width="${w}" height="${h}"><rect x="0" y="0" width="${w}" height="${h}" rx="${rx}" fill="#fff"/></svg>`
  );

  const cropped = await sharp('design/Desktop/servicos.png')
    .extract({ left: 960, top: 1215, width: w, height: h })
    .png()
    .toBuffer();

  await sharp(cropped)
    .composite([{ input: mask, blend: 'dest-in' }])
    .toFile(path.join(destDir, 'services-map-illustration.png'));

  console.log('Saved clean services-map-illustration.png');
}

main().catch(console.error);
