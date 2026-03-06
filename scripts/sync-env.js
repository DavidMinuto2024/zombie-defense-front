/**
 * Reads .env and writes apiKey into src/environments/environment.development.ts.
 * Run before ng serve / ng build (e.g. via prestart/prebuild in package.json).
 */
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const outPath = path.join(__dirname, '..', 'src', 'environments', 'environment.development.ts');

let apiKey = '';
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  const match = content.match(/^\s*X_API_KEY\s*=\s*(.*)$/m);
  if (match) {
    const raw = match[1].trim();
    if (raw.startsWith('"') || raw.startsWith("'")) {
      apiKey = raw.slice(1, -1).replace(/\\(.)/g, '$1');
    } else {
      apiKey = raw;
    }
  }
}

const ts = `/**
 * Development environment. Synced from .env by scripts/sync-env.js (run before ng serve).
 */
export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:7192',
  apiKey: '${String(apiKey).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',
};
`;

fs.writeFileSync(outPath, ts, 'utf8');
