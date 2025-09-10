#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const res = path.resolve(dir, e.name);
    if (e.isDirectory()) walk(res, cb);
    else cb(res);
  }
}

function main() {
  const dest = process.argv[2];
  const varsJson = process.argv[3] || '{}';
  let vars = {};
  try { vars = JSON.parse(varsJson); } catch (e) { console.error('Invalid JSON vars'); process.exit(2); }

  if (!dest || !fs.existsSync(dest)) {
    console.error('Destination not found:', dest);
    process.exit(1);
  }

  walk(dest, (file) => {
    // skip binary-like files by simple extension blacklist
    const skipExt = ['.png', '.jpg', '.jpeg', '.gif', '.zip', '.gz', '.tgz'];
    if (skipExt.includes(path.extname(file).toLowerCase())) return;
    try {
      let content = fs.readFileSync(file, 'utf8');
      // replace {{VAR}} placeholders
      content = content.replace(/\{\{\s*([A-Za-z0-9_]+)\s*\}\}/g, (m, k) => {
        if (Object.prototype.hasOwnProperty.call(vars, k)) return vars[k];
        return m;
      });
      fs.writeFileSync(file, content, 'utf8');
    } catch (e) {
      // ignore read errors (binary files)
    }
  });
  console.log('Applied templates with vars:', vars);
}

main();
