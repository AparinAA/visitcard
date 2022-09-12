import path from 'path';
import fs from 'fs';

export function readData(prefix) {
    const pathDirectory = path.join('', 'data/cardItems.json');
    return JSON.parse(fs.readFileSync(pathDirectory, {"encoding": "utf-8"}));
}