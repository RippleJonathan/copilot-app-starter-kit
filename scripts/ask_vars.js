#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

async function main() {
  const [,, templateDir, ...kvArgs] = process.argv;
  if (!templateDir) {
    console.error('Usage: ask_vars.js <template-dir> [KEY=VALUE ...] [--interactive|--defaults]');
    process.exit(2);
  }

  const manifestPath = path.join(templateDir, 'template.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('No template.json found in', templateDir);
    process.exit(3);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  // Validate manifest with AJV if available (best-effort)
  const schemaPath = path.join(__dirname, '..', 'templates', 'schema', 'template.schema.json');
  if (fs.existsSync(schemaPath)) {
    try {
      const Ajv = require('ajv');
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      const ajv = new Ajv({ allErrors: true, strict: false });
      const validate = ajv.compile(schema);
      const valid = validate(manifest);
      if (!valid) {
        console.error('template.json failed validation:');
        for (const e of (validate.errors || [])) console.error(' -', (e.instancePath || '/') + ':', e.message);
        process.exit(4);
      }
    } catch (e) {
      // ignore and continue
    }
  }

  // parse flags and provided key=val args
  let nonInteractive = false;
  const provided = {};
  const args = [];
  for (const a of kvArgs) {
    if (a === '--defaults') { nonInteractive = true; continue; }
    if (a === '--interactive') { args.push(a); continue; }
    args.push(a);
  }
  for (const kv of args) {
    if (!kv.includes('=')) continue;
    const [k, ...rest] = kv.split('=');
    provided[k] = rest.join('=');
  }

  const result = {};
  for (const v of manifest.variables || []) {
    const name = v.name;
    if (Object.prototype.hasOwnProperty.call(provided, name)) {
      result[name] = provided[name];
      continue;
    }

    if (nonInteractive || !process.stdin.isTTY) {
      result[name] = v.default;
      continue;
    }

    // interactive support with inquirer when available
    if (args.includes('--interactive')) {
      try {
        const inquirer = require('inquirer');
        const q = {
          type: v.choices ? 'list' : (v.secret ? 'password' : 'input'),
          name: 'val',
          message: v.prompt || name,
          default: v.default,
        };
        if (v.choices) q.choices = v.choices;
        // eslint-disable-next-line no-await-in-loop
        const ans = await inquirer.prompt([q]);
        result[name] = ans.val;
        continue;
      } catch (e) {
        // fall through to simple prompt
      }
    }

    // simple stdin prompt (fallback)
    result[name] = await askSimple(`${v.prompt || name} [${v.default || ''}]: `, v.default);
  }

  // output only the JSON result on stdout
  console.log(JSON.stringify(result));
}

function askSimple(prompt, fallback) {
  return new Promise((resolve) => {
    process.stdout.write(prompt);
    const onData = (buf) => {
      const s = String(buf).replace(/\r?\n$/, '');
      process.stdin.removeListener('data', onData);
      if (s === '' || s === undefined) return resolve(fallback);
      resolve(s);
    };
    process.stdin.on('data', onData);
  });
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
