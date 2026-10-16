const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const srcPath = path.resolve(__dirname, '../design/Desktop/detalhes-do-animal.png');
const destDir = path.resolve(__dirname, '../public/images/desktop');

async function extractAssets() {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // 1. Main Luna Image (608 x 424)
  await sharp(srcPath)
    .extract({ left: 80, top: 190, width: 608, height: 424 })
    .toFile(path.join(destDir, 'pet-detail-luna-main.png'));
  console.log('Saved pet-detail-luna-main.png');

  // 2. Thumbnails (96 x 96 each)
  // Thumb 1 starts at top: 682, left: 81
  // Inside green border: left: 84, top: 685, width: 90, height: 90 -> resize 96x96
  await sharp(srcPath)
    .extract({ left: 84, top: 685, width: 90, height: 90 })
    .resize(96, 96)
    .toFile(path.join(destDir, 'pet-detail-luna-thumb-1.png'));
  console.log('Saved pet-detail-luna-thumb-1.png');

  // Thumb 2: left: 193, top: 682, width: 96, height: 96
  await sharp(srcPath)
    .extract({ left: 193, top: 682, width: 96, height: 96 })
    .toFile(path.join(destDir, 'pet-detail-luna-thumb-2.png'));
  console.log('Saved pet-detail-luna-thumb-2.png');

  // Thumb 3: left: 305, top: 682, width: 96, height: 96
  await sharp(srcPath)
    .extract({ left: 305, top: 682, width: 96, height: 96 })
    .toFile(path.join(destDir, 'pet-detail-luna-thumb-3.png'));
  console.log('Saved pet-detail-luna-thumb-3.png');

  // 3. Recommended Pets Images (Bottom 3 cards)
  // Card 1 (Mel): left: 81, top: 955, width: 408, height: 178
  await sharp(srcPath)
    .extract({ left: 81, top: 955, width: 408, height: 178 })
    .toFile(path.join(destDir, 'pet-detail-rec-mel.png'));
  console.log('Saved pet-detail-rec-mel.png');

  // Card 2 (Fred): left: 516, top: 955, width: 408, height: 178
  await sharp(srcPath)
    .extract({ left: 516, top: 955, width: 408, height: 178 })
    .toFile(path.join(destDir, 'pet-detail-rec-fred.png'));
  console.log('Saved pet-detail-rec-fred.png');

  // Card 3 (Luna): left: 951, top: 955, width: 408, height: 178
  await sharp(srcPath)
    .extract({ left: 951, top: 955, width: 408, height: 178 })
    .toFile(path.join(destDir, 'pet-detail-rec-luna.png'));
  console.log('Saved pet-detail-rec-luna.png');

  console.log('All animal detail assets extracted successfully!');
  process.exit(0);
}

extractAssets().catch((err) => {
  console.error(err);
  process.exit(1);
});
