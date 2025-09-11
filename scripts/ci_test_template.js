#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function run(cmd, args, opts = {}) {
  console.log(`> ${cmd} ${args.join(' ')}`);
  const r = spawnSync(cmd, args, { stdio: 'inherit', ...opts });
  if (r.status !== 0) {
    throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
  }
}

async function main() {
  const template = process.argv[2] || process.env.TEMPLATE;
  if (!template) {
    console.error('Usage: node ci_test_template.js <template>');
    process.exit(2);
  }

  const root = path.resolve(__dirname, '..');
  const templateDir = path.join(root, 'templates', template);
  if (!fs.existsSync(templateDir) || !fs.statSync(templateDir).isDirectory()) {
    console.error('Template not found:', templateDir);
    process.exit(3);
  }

  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), `template-${template}-`));
  console.log('Testing template', template, 'in', tmp);

  // copy files
  const files = fs.readdirSync(templateDir);
  for (const f of files) {
    const src = path.join(templateDir, f);
    const dest = path.join(tmp, f);
    if (fs.statSync(src).isDirectory()) {
      // recursive copy
      run('cp', ['-R', src, dest]);
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  // run npm ci if package.json exists (allow SKIP_NPM for offline/dry-run)
  const skipNpm = !!process.env.SKIP_NPM;
  if (fs.existsSync(path.join(tmp, 'package.json'))) {
    if (skipNpm) {
      console.log('SKIP_NPM=1 set; skipping npm ci');
    } else {
      try {
        run('npm', ['ci', '--no-audit', '--no-fund'], { cwd: tmp });
      } catch (e) {
        console.warn('npm ci failed (this may be due to offline environment).');
        throw e;
      }
    }
  } else {
    console.log('No package.json; skipping npm install');
  }

  // run test.js if present
  if (fs.existsSync(path.join(tmp, 'test.js'))) {
    run('node', ['test.js'], { cwd: tmp });
  } else {
    console.log('No test.js present');
  }

  // frontend-specific build (respect SKIP_NPM)
  if (template === 'frontend' && fs.existsSync(path.join(tmp, 'package.json'))) {
    if (skipNpm) {
      console.log('SKIP_NPM=1 set; skipping frontend build');
    } else {
      run('npm', ['run', 'build'], { cwd: tmp });
    }
  }

  console.log('Template', template, 'OK');
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
