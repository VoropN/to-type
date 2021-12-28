import fs from "fs";

export default async function handler (req, res) {
  const example = await fs.readFile('/data/notebooks.txt');
  return res.status(200).json({example});
}
