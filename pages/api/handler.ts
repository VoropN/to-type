import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await new Promise((res, rej) => {
    fs.readFile('/data/notebooks.txt', 'utf-8', (err, source) => {
      if (err) return rej(err);
      res(source);
    });
  });
  return res.status(200).json({ data });
}
