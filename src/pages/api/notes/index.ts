import { NextApiRequest, NextApiResponse } from 'next';
import { createNote } from '@/models/note';
import { authMiddleware } from '@/middlewares/authmiddleware';
import { errorMiddleware } from '@/middlewares/errorMiddleware';
import { AuthenticatedRequest } from '@/middlewares/authmiddleware';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { content, taskId, projectId } = req.body;
    try {
      const note = await createNote({
        content,
        taskId,
        projectId,
        userId: req.user.id,
      });
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create note' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default errorMiddleware(authMiddleware(handler));
