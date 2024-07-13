import { NextApiRequest, NextApiResponse } from 'next';
import { getProjectById, updateProject, deleteProject } from '@/models/project';
import { authMiddleware } from '@/middlewares/authmiddleware';
import { errorMiddleware } from '@/middlewares/errorMiddleware';
import { AuthenticatedRequest } from '@/middlewares/authmiddleware';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const project = await getProjectById(parseInt(id as string, 10), req.user.id);
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ error: 'Project not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  } else if (req.method === 'PUT') {
    const { name, description } = req.body;
    try {
      const project = await updateProject(parseInt(id as string, 10), {
        name,
        description,
        userId: req.user.id
      });
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update project' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await deleteProject(parseInt(id as string, 10), req.user.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete project' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default errorMiddleware(authMiddleware(handler));
