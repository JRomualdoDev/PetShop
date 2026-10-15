const sharp = require('sharp');
const path = require('path');

const srcPath = path.resolve(__dirname, '../design/Desktop/detalhes-do-animal.png');

async function inspect() {
  const meta = await sharp(srcPath).metadata();
  console.log('Image dimensions:', meta.width, 'x', meta.height);

  // Let's sample a vertical slice at x=100 and x=200 to find where the main photo starts and ends
  // Also x=80, 100 is left side of main photo.
  // Container is usually left: 80px (since 1440 - 1280 = 160; 160 / 2 = 80px).
  // Let's extract a few test crops to locate the main image and thumbnails.
  
  // Test crop around left column
  // y between 100 and 800
  const leftTest = await sharp(srcPath)
    .extract({ left: 70, top: 100, width: 620, height: 700 })
    .toFile(path.resolve(__dirname, '../public/images/desktop/test-animal-col1.png'));
  console.log('Saved test-animal-col1.png');

  // Test crop around bottom cards
  // y between 900 and 1500
  const bottomTest = await sharp(srcPath)
    .extract({ left: 70, top: 900, width: 1290, height: 450 })
    .toFile(path.resolve(__dirname, '../public/images/desktop/test-animal-bottom.png'));
  console.log('Saved test-animal-bottom.png');
}

inspect().catch(console.error);
