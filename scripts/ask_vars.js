#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

async function main() {
  const [,, templateDir, ...kvArgs] = process.argv;
  if (!templateDir) {
    console.error('Usage: ask_vars.js <template-dir> [KEY=VALUE ...]');
    process.exit(2);
  }

  const manifestPath = path.join(templateDir, 'template.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('No template.json found in', templateDir);
    process.exit(3);
  }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    // Validate manifest with AJV if available (prefer strict JSON Schema validation)
    const schemaPath = path.join(__dirname, '..', 'templates', 'schema', 'template.schema.json');
    let validateWithAjv = null;
    if (fs.existsSync(schemaPath)) {
      try {
        const Ajv = require('ajv');
        const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
        const ajv = new Ajv({ allErrors: true, strict: false });
        validateWithAjv = ajv.compile(schema);
        const valid = validateWithAjv(manifest);
        if (!valid) {
          prettyPrintAjvErrors(validateWithAjv.errors || []);
          process.exit(4);
        }
      } catch (e) {
        // fall back to lightweight checks if something goes wrong
        try {
          const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
          const errors = validateManifestAgainstSchema(manifest, schema);
          if (errors.length) {
            console.error('template.json failed validation:');
            errors.forEach((er) => console.error(' -', er));
            process.exit(4);
          }
        } catch (ee) {
          console.error('Failed to validate manifest:', e.message || e);
        }
      }
    }
  let nonInteractive = false;
  // Support a trailing --defaults flag to force defaults for missing values
  const args = [];
  for (const a of kvArgs) {
    if (a === '--defaults') { nonInteractive = true; }
    else args.push(a);
  }
  const provided = {};
  args.forEach(kv => {
    const [k, ...rest] = kv.split('=');
    provided[k] = rest.join('=');
  });

  const result = {};
  for (const v of manifest.variables || []) {
    const name = v.name;
    if (Object.prototype.hasOwnProperty.call(provided, name)) {
      result[name] = provided[name];
      continue;
    }

    // If provided explicitly, use it
    if (Object.prototype.hasOwnProperty.call(provided, name)) continue;

    // If nonInteractive or stdin not a TTY, use default
    if (nonInteractive || !process.stdin.isTTY) {
      result[name] = v.default;
      continue;
    }

    // If interactive flag set, use inquirer for nicer prompts
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
        const ans = await inquirer.prompt([q]);
        result[name] = ans.val;
        continue;
      } catch (e) {
        // fall back to simple prompt below
      }
    }

    // prompt interactively (fallback)
    const prompt = `${v.prompt || name} [${v.default || ''}]: `;
    result[name] = await ask(prompt, v.default);
  }

  // helper to pretty print ajv errors
  function prettyPrintAjvErrors(errors) {
    console.error('template.json failed validation:');
    for (const err of errors) {
      console.error(' -', (err.instancePath || '/') + ':', err.message);
      if (err.params) console.error('   params:', JSON.stringify(err.params));
    }
  }

  console.log(JSON.stringify(result));
}

function validateManifestAgainstSchema(manifest, schema) {
  const errs = [];
  if (schema.required && Array.isArray(schema.required)) {
    for (const r of schema.required) {
      if (!Object.prototype.hasOwnProperty.call(manifest, r)) errs.push(`missing required field '${r}'`);
    }
  }
  if (manifest.variables) {
    if (!Array.isArray(manifest.variables)) {
      errs.push("'variables' must be an array");
    } else {
      manifest.variables.forEach((v, idx) => {
        if (!v || typeof v !== 'object') return errs.push(`variables[${idx}] must be an object`);
        if (!v.name || typeof v.name !== 'string') errs.push(`variables[${idx}].name is required and must be a string`);
        if (v.type && !['string', 'boolean', 'number'].includes(v.type)) errs.push(`variables[${idx}].type must be one of string, boolean, number`);
      });
    }
  }
  return errs;
}

function ask(question, fallback) {
  return new Promise((resolve) => {
    process.stdout.write(question);
    const onData = (buf) => {
      const s = String(buf).replace(/\r?\n$/, '');
      process.stdin.removeListener('data', onData);
      if (s === '' || s === undefined) return resolve(fallback);
      resolve(s);
    };
    process.stdin.on('data', onData);
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
