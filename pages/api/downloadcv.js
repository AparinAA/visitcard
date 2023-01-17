import { createReadStream } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const filename = 'Aparin_CV_RU.pdf';
    const pathFile = path.join('', `data/${filename}`);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    createReadStream(pathFile).pipe(res).send("priv");

    res.status(200);
}