import { NextApiRequest, NextApiResponse } from 'next';
import { getTaskById, updateTask, deleteTask } from '@/models/task';
import { authMiddleware } from '@/middlewares/authmiddleware';
import { errorMiddleware } from '@/middlewares/errorMiddleware';
import { AuthenticatedRequest } from '@/middlewares/authmiddleware';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const task = await getTaskById(parseInt(id as string, 10), req.user.id);
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  } else if (req.method === 'PUT') {
    const { title, description, dueDate, priority, projectId, labelId, completed } = req.body;
    try {
      const task = await updateTask(parseInt(id as string, 10), {
        title,
        description,
        dueDate,
        priority,
        projectId,
        labelId,
        completed,
        userId: req.user.id
      });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await deleteTask(parseInt(id as string, 10), req.user.id);
      res.status(204).json({ message: "Task Deleted" });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default errorMiddleware(authMiddleware(handler));
