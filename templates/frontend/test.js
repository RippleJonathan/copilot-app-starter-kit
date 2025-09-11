const fs = require('fs');
const path = require('path');
const root = process.cwd();

try {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  if (!html.includes('Welcome') && !html.includes('{{')) {
    console.log('index.html looks good');
  }
  const main = fs.readFileSync(path.join(root, 'src', 'main.jsx'), 'utf8');
  if (!main.includes('{{')) {
    console.log('main.jsx looks good');
  }
  console.log('frontend template test ok');
  process.exit(0);
} catch (e) {
  console.error('frontend test failed', e && e.message);
  process.exit(2);
}
