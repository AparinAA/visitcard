import path from 'path';
import fs from 'fs';

export function readData(prefix) {
    const pathDirectory = path.join('', 'data/cardItems.json');
    const listCard = JSON.parse(fs.readFileSync(pathDirectory, {"encoding": "utf-8"}));

    listCard.sort( (a, b) => a.id - b.id < 0);
    return listCard;
}