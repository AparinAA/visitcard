import path from 'path';
import fs from 'fs';

export function readData(prefix) {
    const pathDirectoryEN = path.join('', 'data/cardItems.json');
    const EN = JSON.parse(fs.readFileSync(pathDirectoryEN, {"encoding": "utf-8"}));
    
    const pathDirectoryRU = path.join('', 'data/cardItemsRU.json');
    const RU = JSON.parse(fs.readFileSync(pathDirectoryRU, {"encoding": "utf-8"}));

    EN.sort( (a, b) => a.id - b.id);
    RU.sort( (a, b) => a.id - b.id);

    return {EN, RU};
}