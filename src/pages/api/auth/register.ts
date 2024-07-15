import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '@/utils/auth';
import { createUser } from '@/models/user';
import { errorMiddleware } from '@/middlewares/errorMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const hashedPassword = hashPassword(password);
    const newUser = await createUser({ name, email, passwordhash: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export default errorMiddleware(handler);
