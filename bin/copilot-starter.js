#!/usr/bin/env node
/**
 * Copilot Starter Kit - NPX-friendly CLI wrapper
 * 
 * Usage:
 *   npx copilot-starter-kit crud ./my-feature
 *   npx copilot-starter-kit auth ./auth-service PROJECT_NAME=MyApp
 *   npx copilot-starter-kit --list
 *   npx copilot-starter-kit --help
 */

const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

// Find the root directory (where this script is located)
const ROOT_DIR = path.resolve(__dirname, '..');
const GENERATE_SCRIPT = path.join(ROOT_DIR, 'scripts', 'generate_feature.sh');

function showHelp() {
  console.log(`
🚀 Copilot Starter Kit - Template Generator

USAGE:
  npx copilot-starter-kit <template> <destination> [KEY=VALUE...] [--interactive]

EXAMPLES:
  npx copilot-starter-kit crud ./my-api                    # Generate CRUD API
  npx copilot-starter-kit auth ./auth PROJECT_NAME=MyApp  # Generate auth with custom name
  npx copilot-starter-kit react-frontend ./web --interactive  # Interactive prompts

AVAILABLE TEMPLATES:
`);
  
  // List available templates
  const templatesDir = path.join(ROOT_DIR, 'templates');
  if (fs.existsSync(templatesDir)) {
    const templates = fs.readdirSync(templatesDir).filter(dir => {
      const templatePath = path.join(templatesDir, dir);
      return fs.statSync(templatePath).isDirectory() && dir !== 'schema';
    });
    
    templates.forEach(template => {
      const manifestPath = path.join(templatesDir, template, 'template.json');
      let description = 'Template scaffold';
      
      if (fs.existsSync(manifestPath)) {
        try {
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
          description = manifest.description || description;
        } catch (e) {
          // Use default description if manifest can't be read
        }
      }
      
      console.log(`  ${template.padEnd(20)} ${description}`);
    });
  }
  
  console.log(`
OPTIONS:
  --interactive        Show interactive prompts for template variables
  --list              List available templates
  --help              Show this help message

NEXT STEPS:
  1. cd <destination>     # Navigate to generated feature
  2. npm install          # Install dependencies  
  3. npm test             # Run tests
  4. Start building!      # Expand from the working foundation

More info: https://github.com/RippleJonathan/copilot-app-starter-kit
`);
}

function listTemplates() {
  const templatesDir = path.join(ROOT_DIR, 'templates');
  if (!fs.existsSync(templatesDir)) {
    console.error('Templates directory not found');
    process.exit(1);
  }
  
  console.log('📦 Available Templates:\n');
  
  const templates = fs.readdirSync(templatesDir).filter(dir => {
    const templatePath = path.join(templatesDir, dir);
    return fs.statSync(templatePath).isDirectory() && dir !== 'schema';
  });
  
  templates.forEach(template => {
    const manifestPath = path.join(templatesDir, template, 'template.json');
    
    if (fs.existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        console.log(`  ✅ ${template}`);
        console.log(`     ${manifest.description || 'Template scaffold'}`);
        
        if (manifest.variables && manifest.variables.length > 0) {
          console.log(`     Variables: ${manifest.variables.map(v => v.name).join(', ')}`);
        }
        console.log('');
      } catch (e) {
        console.log(`  ⚠️  ${template} (manifest error)`);
      }
    } else {
      console.log(`  📁 ${template} (no manifest)`);
    }
  });
}

// Parse arguments
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(0);
}

if (args.includes('--list')) {
  listTemplates();
  process.exit(0);
}

if (args.length < 2) {
  console.error('❌ Error: Template name and destination are required\n');
  showHelp();
  process.exit(1);
}

// Check if generate script exists
if (!fs.existsSync(GENERATE_SCRIPT)) {
  console.error(`❌ Error: Generator script not found at ${GENERATE_SCRIPT}`);
  console.error('Make sure you\'re running this from the copilot-starter-kit directory or via npx');
  process.exit(1);
}

// Pass all arguments directly to the generate script
console.log('🚀 Generating template...\n');

const child = spawn('bash', [GENERATE_SCRIPT, ...args], {
  stdio: 'inherit',
  cwd: ROOT_DIR
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ Template generated successfully!');
    console.log('\n📋 Next steps:');
    console.log(`   cd ${args[1]}`);
    console.log('   npm install');
    console.log('   npm test');
  } else {
    console.error(`\n❌ Template generation failed with exit code ${code}`);
    process.exit(code);
  }
});

child.on('error', (err) => {
  console.error('❌ Failed to run generator script:', err.message);
  process.exit(1);
});