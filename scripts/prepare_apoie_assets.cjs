const sharp = require('sharp');
const path = require('path');

async function checkButtonWidth() {
  const srcPath = path.resolve(__dirname, '../design/Desktop/apoie-uma-causa.png');
  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });

  const getPixel = (x, y) => {
    const idx = (y * info.width + x) * info.channels;
    return [data[idx], data[idx + 1], data[idx + 2]];
  };

  // Card 1 is x: 80 to 490 (width 411)
  // Let's find button left and right at y = 724
  let btnLeft = 0;
  let btnRight = 0;
  for (let x = 80; x <= 490; x++) {
    const p = getPixel(x, 724);
    if (p[0] === 15 && p[1] === 118 && p[2] === 110) {
      if (!btnLeft) btnLeft = x;
      btnRight = x;
    }
  }
  console.log(`Button 1: left=${btnLeft}, right=${btnRight}, width=${btnRight - btnLeft + 1}`);
  console.log(`Left padding in card: ${btnLeft - 80}px, right padding: ${490 - btnRight}px`);
}

checkButtonWidth().catch(console.error);
