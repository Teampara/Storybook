import { readFileSync, existsSync } from 'node:fs';

const requiredFiles = [
  'next.config.ts',
  'src/app/layout.tsx',
  'src/app/components/interview-wizard.tsx',
  'src/app/page.tsx',
];

const missing = requiredFiles.filter((file) => !existsSync(file));
if (missing.length > 0) {
  console.error('Missing required files:', missing.join(', '));
  process.exit(1);
}

const nextConfig = readFileSync('next.config.ts', 'utf8');
if (!nextConfig.includes('basePath: "/storybook"')) {
  console.error('next.config.ts must contain basePath: "/storybook"');
  process.exit(1);
}

const wizard = readFileSync('src/app/components/interview-wizard.tsx', 'utf8');
const requiredFields = ['heroName', 'age', 'hobby', 'artStyle'];
const missingFields = requiredFields.filter((field) => !wizard.includes(field));
if (missingFields.length > 0) {
  console.error('Interview wizard is missing expected fields:', missingFields.join(', '));
  process.exit(1);
}

console.log('Smoke check passed: core Storybook files and settings are present.');
