const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  const outputDir = path.resolve(__dirname, '../public/images/desktop');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const homePath = path.resolve(__dirname, '../design/Desktop/home.png');
  const home = sharp(homePath);

  // 1. Mariana avatar in header: x=1255, y=20, w=40, h=40
  await home.clone()
    .extract({ left: 1255, top: 20, width: 40, height: 40 })
    .toFile(path.join(outputDir, 'avatar-mariana.png'));

  // 2. Hero banner photo
  const heroCrop = await home.clone()
    .extract({ left: 0, top: 80, width: 1440, height: 440 })
    .toBuffer();

  const svgVignette = `
    <svg width="1440" height="440" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="leftDark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#181513" stop-opacity="1" />
          <stop offset="47%" stop-color="#1c1815" stop-opacity="1" />
          <stop offset="53%" stop-color="#241e1b" stop-opacity="0.8" />
          <stop offset="60%" stop-color="#2c2420" stop-opacity="0.2" />
          <stop offset="66%" stop-color="#2c2420" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect width="1440" height="440" fill="url(#leftDark)" />
    </svg>
  `;

  await sharp(heroCrop)
    .composite([{ input: Buffer.from(svgVignette), top: 0, left: 0 }])
    .toFile(path.join(outputDir, 'hero-bg.png'));

  // Helper to remove top-right circle from product cards
  async function cleanProductCard(left, top, patchColor, filename) {
    const raw = await home.clone()
      .extract({ left, top, width: 300, height: 185 })
      .toBuffer();

    // Patch top right circle (x=240 to 295, y=5 to 60)
    const patchSvg = `
      <svg width="300" height="185" xmlns="http://www.w3.org/2000/svg">
        <rect x="240" y="5" width="56" height="56" rx="12" fill="${patchColor}" />
      </svg>
    `;

    await sharp(raw)
      .composite([{ input: Buffer.from(patchSvg), top: 0, left: 0 }])
      .toFile(path.join(outputDir, filename));
  }

  // Card 1: Ração
  await cleanProductCard(80, 975, '#edf0f2', 'prod-racao.png');

  // Card 2: Brinquedo
  await cleanProductCard(405, 975, '#ffffff', 'prod-brinquedo.png');

  // Card 3: Arranhador
  await cleanProductCard(735, 975, '#dedede', 'prod-arranhador.png');

  // Card 4: Cama
  await cleanProductCard(1060, 975, '#dfdad4', 'prod-cama.png');

  // 4. Services images
  await home.clone()
    .extract({ left: 80, top: 1460, width: 625, height: 190 })
    .toFile(path.join(outputDir, 'service-gustavo.png'));

  await home.clone()
    .extract({ left: 735, top: 1460, width: 625, height: 190 })
    .toFile(path.join(outputDir, 'service-amigo-fiel.png'));

  // 5. Adoption dog image
  await home.clone()
    .extract({ left: 125, top: 1960, width: 400, height: 310 })
    .toFile(path.join(outputDir, 'adoption-dog.png'));

  console.log('All home assets prepared successfully!');
}

main().catch(console.error);
