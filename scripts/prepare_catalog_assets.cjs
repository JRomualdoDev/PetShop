const sharp = require('sharp');
const path = require('path');

async function extractAndClean() {
  const input = sharp('design/Desktop/produtos.png');
  const cards = [
    // Row 1 (top=345, height=200)
    { name: 'prod-racao-catalog.png', left: 401, top: 345, width: 303, height: 200, bg: '#ffffff' },
    { name: 'prod-brinquedo-catalog.png', left: 729, top: 345, width: 303, height: 200, bg: '#ffffff' },
    { name: 'prod-arranhador-catalog.png', left: 1057, top: 345, width: 303, height: 200, bg: '#ffffff' },
    // Row 2 (top=714, height=200)
    { name: 'prod-cama-catalog.png', left: 401, top: 714, width: 303, height: 200, bg: '#fdfbfa' },
    { name: 'prod-coleira-catalog.png', left: 729, top: 714, width: 303, height: 200, bg: '#dfdfdf' },
    { name: 'prod-petiscos-catalog.png', left: 1057, top: 714, width: 303, height: 200, bg: '#f5f5f5' },
  ];

  for (const c of cards) {
    const raw = await input.clone()
      .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
      .toBuffer();

    // Patch top-right circle (x: 245..297, y: 8..60)
    const patchSvg = Buffer.from(`
      <svg width="303" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect x="245" y="8" width="52" height="52" rx="14" fill="${c.bg}" />
      </svg>
    `);

    await sharp(raw)
      .composite([{ input: patchSvg, top: 0, left: 0 }])
      .toFile(path.join('public/images/desktop', c.name));
    console.log('Saved clean:', c.name);
  }
}

extractAndClean().catch(console.error);
