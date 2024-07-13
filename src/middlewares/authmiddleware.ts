import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: any;
}

export function authMiddleware(handler: NextApiHandler) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];
   

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
 
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      console.error('Token verification error:', error); // Log any error
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}
