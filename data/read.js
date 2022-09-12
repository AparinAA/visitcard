import path from 'path';
import fs from 'fs';



export function readData(prefix) {
    const pathDirectory = path.join('', 'data/cardItems.json');
    const data = JSON.parse(fs.readFileSync(pathDirectory, {"encoding": "utf-8"})); 
    return data;
}