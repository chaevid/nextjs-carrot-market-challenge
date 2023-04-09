import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import db from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({ where: { email } });

    if (!user || user.password !== password) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    req.session.set('user', { id: user.id, email: user.email });
    await req.session.save();

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
};

export default withIronSessionApiRoute(handler, {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'mini-twitter-session',
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
});
