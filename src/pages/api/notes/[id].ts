import { NextApiRequest, NextApiResponse } from 'next';
import { getNoteById, updateNote, deleteNote } from '@/models/note';
import { authMiddleware } from '@/middlewares/authmiddleware';
import { errorMiddleware } from '@/middlewares/errorMiddleware';
import { AuthenticatedRequest } from '@/middlewares/authmiddleware';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const note = await getNoteById(parseInt(id as string, 10), req.user.id);
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ error: 'Note not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch note' });
    }
  } else if (req.method === 'PUT') {
    const { content } = req.body;
    try {
      const note = await updateNote(parseInt(id as string, 10), {
        content,
        userId: req.user.id,
      });
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update note' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await deleteNote(parseInt(id as string, 10), req.user.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete note' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default errorMiddleware(authMiddleware(handler));
