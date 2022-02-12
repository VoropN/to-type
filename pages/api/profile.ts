import { NextApiRequest, NextApiResponse } from 'next';

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data;
  let user: any;
  try {
    console.log('user is authenticated');
    // fetch some data and assign it to the data variable
  } catch (err) {
    console.log('error: no authenticated user');
  }

  res.statusCode = 200;
  res.json({
    data: data ? data : null,
    username: user?.attributes || null,
  });
}
