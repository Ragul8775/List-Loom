import { NextApiRequest, NextApiResponse } from 'next';
import { getLabelById, updateLabel, deleteLabel } from '@/models/label';
import { authMiddleware } from '@/middlewares/authmiddleware';
import { errorMiddleware } from '@/middlewares/errorMiddleware';
import { AuthenticatedRequest } from '@/middlewares/authmiddleware';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const label = await getLabelById(parseInt(id as string, 10), req.user.id);
      if (label) {
        res.status(200).json(label);
      } else {
        res.status(404).json({ error: 'Label not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch label' });
    }
  } else if (req.method === 'PUT') {
    const { name, projectId } = req.body;
    try {
      const label = await updateLabel(parseInt(id as string, 10), {
        name,
        projectId,
        userId: req.user.id,
      });
      res.status(200).json(label);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update label' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await deleteLabel(parseInt(id as string, 10), req.user.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete label' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default errorMiddleware(authMiddleware(handler));
