import { NextApiRequest, NextApiResponse } from 'next';
import { createLabel, getLabels } from '@/models/label';
import { authMiddleware } from '@/middlewares/authmiddleware';
import { errorMiddleware } from '@/middlewares/errorMiddleware';
import { AuthenticatedRequest } from '@/middlewares/authmiddleware';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const labels = await getLabels(req.user.id);
      res.status(200).json(labels);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch labels' });
    }
  } else if (req.method === 'POST') {
    const { name, projectId } = req.body;
    try {
      const label = await createLabel({
        name,
        userId: req.user.id,
        projectId,
      });
      res.status(201).json(label);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create label' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default errorMiddleware(authMiddleware(handler));
