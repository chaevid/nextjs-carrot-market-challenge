import db from '../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { email, password } = req.body;

  try {
    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(409).json({ error: 'Email already in use' });
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating account' });
  }
};

export default handler;
