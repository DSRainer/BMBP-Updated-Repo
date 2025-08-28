const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '.ts-node');

if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log('Cleared .ts-node cache.');
}