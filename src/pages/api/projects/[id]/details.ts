import { NextApiRequest, NextApiResponse } from 'next';
import { getProjectById } from '@/models/project';
import { getTasksByProjectId } from '@/models/task';
import { getLabelsByProjectId } from '@/models/label';
import { getNotesByProjectId } from '@/models/note';
import { authMiddleware } from '@/middlewares/authmiddleware';
import { errorMiddleware } from '@/middlewares/errorMiddleware';
import { AuthenticatedRequest } from '@/middlewares/authmiddleware';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const projectId = parseInt(id as string, 10);

      // Fetch project details
      const project = await getProjectById(projectId, req.user.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      // Fetch associated tasks, labels, and notes
      const tasks = await getTasksByProjectId(projectId, req.user.id);
      const labels = await getLabelsByProjectId(projectId, req.user.id);
      const notes = await getNotesByProjectId(projectId, req.user.id);

      res.status(200).json({
        project,
        tasks,
        labels,
        notes
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch project details' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default errorMiddleware(authMiddleware(handler));
