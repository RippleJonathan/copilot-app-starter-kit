const fs = require('fs');
const path = require('path');

describe('template manifest schema', () => {
  const schemaPath = path.join(__dirname, '..', 'templates', 'schema', 'template.schema.json');
  const Ajv = require('ajv');

  test('valid manifest passes validation', () => {
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    const good = {
      name: 'example',
      variables: [
        { name: 'PROJECT_NAME', prompt: 'Project name', type: 'string', default: 'X' }
      ]
    };
    const valid = validate(good);
    if (!valid) console.error(validate.errors);
    expect(valid).toBe(true);
  });

  test('invalid manifest rejects validation', () => {
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    const bad = {
      // missing required name
      variables: 'not-an-array'
    };
    const valid = validate(bad);
    expect(valid).toBe(false);
    expect(validate.errors && validate.errors.length).toBeGreaterThan(0);
  });
});
