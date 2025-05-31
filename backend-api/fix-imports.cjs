const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const routesFile = join(__dirname, '.build', 'routes.ts');

let content = readFileSync(routesFile, 'utf8');

content = content.replace(/from\s+(['"]\.\/.*?)(['"])/g, 'from $1.js$2');

writeFileSync(routesFile, content);