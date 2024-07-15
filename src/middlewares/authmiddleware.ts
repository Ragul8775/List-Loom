import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: any;
}

export const authMiddleware = (handler: NextApiHandler) => {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = session.user;
    return handler(req, res);
  };
};
