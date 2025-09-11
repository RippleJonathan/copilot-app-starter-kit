#!/usr/bin/env node
const { spawn } = require('child_process');

function usage() {
  console.log('Usage: copilot-starter <template> <dest> [KEY=VALUE ...] [--interactive]');
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length < 2) usage();

// Delegate to the bash generator script for now
const child = spawn('bash', ['scripts/generate_feature.sh', ...args], { stdio: 'inherit', shell: false });

child.on('exit', (code) => process.exit(code));
