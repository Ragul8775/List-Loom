import { NextApiResponse } from 'next';
import { getTasks, createTask } from '@/models/task';
import { authMiddleware } from "@/middlewares/authmiddleware";
import { errorMiddleware } from "@/middlewares/errorMiddleware";
import { AuthenticatedRequest } from "@/middlewares/authmiddleware";

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const tasks = await getTasks(req.user.id);
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  } else if (req.method === 'POST') {
    const { title, description, dueDate, priority, projectId, labelId } = req.body;
    try {
      const task = await createTask({ title, description, dueDate, priority, userId: req.user.id, projectId, labelId });
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default errorMiddleware(authMiddleware(handler));
