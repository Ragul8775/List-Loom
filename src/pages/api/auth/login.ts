import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByEmail, validatePassword } from '@/models/user';
import jwt from 'jsonwebtoken';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const user = await getUserByEmail(email);
      console.log('User:', user); // Log user data

      if (user && user.passwordhash) { // Adjust casing here
        const isValidPassword = await validatePassword(password, user.passwordhash); // Adjust casing here
       
        if (isValidPassword) {
          const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
          res.status(200).json({ token });
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
      } else {
        console.log('Invalid email or password'); // Log validation failure
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error during login:', error); // Log error
      res.status(500).json({ error: 'Failed to login' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
