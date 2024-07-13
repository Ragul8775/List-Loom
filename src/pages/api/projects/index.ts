import { NextApiRequest, NextApiResponse } from 'next';
import { createProject, getProjects } from '@/models/project';
import { authMiddleware } from '@/middlewares/authmiddleware';
import { errorMiddleware } from '@/middlewares/errorMiddleware';
import { AuthenticatedRequest } from '@/middlewares/authmiddleware';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const projects = await getProjects(req.user.id);
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  } else if (req.method === 'POST') {
    const { name, description } = req.body;
    try {
      const project = await createProject({
        name,
        description,
        userId: req.user.id,
      });
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create project' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default errorMiddleware(authMiddleware(handler));
