const path = require('path');
const sharp = require('sharp');

async function extractAuthAssets() {
  const loginSrc = path.resolve(__dirname, '../design/Desktop/login.png');
  const registerSrc = path.resolve(__dirname, '../design/Desktop/criar-conta.png');
  const outDir = path.resolve(__dirname, '../public/images/desktop');

  console.log('Extracting login cover (720x900)...');
  await sharp(loginSrc)
    .extract({ left: 0, top: 0, width: 720, height: 900 })
    .toFile(path.join(outDir, 'auth-login-cover.png'));

  console.log('Extracting register cover (720x900)...');
  await sharp(registerSrc)
    .extract({ left: 0, top: 0, width: 720, height: 900 })
    .toFile(path.join(outDir, 'auth-register-cover.png'));

  console.log('Auth covers extracted successfully!');
}

extractAuthAssets().catch((err) => {
  console.error('Error extracting auth assets:', err);
  process.exit(1);
});
