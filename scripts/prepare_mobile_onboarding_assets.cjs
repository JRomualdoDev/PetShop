const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function extractOnboardingAssets() {
  const outDir = path.resolve(__dirname, '../public/images/mobile');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Exact bounds found: left: 24, top: 44, width: 354, height: 320
  const cropBox = { left: 24, top: 44, width: 354, height: 320 };

  console.log('Extracting onboarding step 1 illustration...');
  await sharp(path.resolve(__dirname, '../design/mobile/onboarding-step-1.png'))
    .extract(cropBox)
    .toFile(path.join(outDir, 'onboarding-1.png'));

  console.log('Extracting onboarding step 2 illustration...');
  await sharp(path.resolve(__dirname, '../design/mobile/onboarding-step-2.png'))
    .extract(cropBox)
    .toFile(path.join(outDir, 'onboarding-2.png'));

  console.log('Extracting onboarding step 3 illustration...');
  await sharp(path.resolve(__dirname, '../design/mobile/onboarding-step-3.png'))
    .extract(cropBox)
    .toFile(path.join(outDir, 'onboarding-3.png'));

  // Clean test files if any
  const testFiles = ['mobile-test-step2.png', 'mobile-test-step3.png'];
  for (const f of testFiles) {
    const p = path.resolve(__dirname, '../public/images', f);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }

  console.log('Onboarding assets ready in public/images/mobile/!');
}

extractOnboardingAssets().catch((err) => {
  console.error('Error extracting onboarding assets:', err);
  process.exit(1);
});
