import pool from './db';
import { deleteNotesByTaskId } from './note';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  userId: number;
  projectId?: number;
  labelId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO Tasks (title, description, dueDate, priority, userId, projectId, labelId) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [task.title, task.description, task.dueDate, task.priority, task.userId, task.projectId || null, task.labelId || null]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function getTasks(userId: number): Promise<Task[]> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Tasks WHERE userId = $1', [userId]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getTaskById(id: number, userId: number): Promise<Task | null> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Tasks WHERE id = $1 AND userId = $2', [id, userId]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}
export async function getTasksByLabelId(labelId: number, userId: number): Promise<Task[]> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Tasks WHERE labelId = $1 AND userId = $2', [labelId, userId]);
    return result.rows;
  } finally {
    client.release();
  }
}
export async function updateTask(id: number, task: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Task> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE Tasks SET title = $1, description = $2, dueDate = $3, priority = $4, projectId = $5, labelId = $6, updatedAt = CURRENT_TIMESTAMP WHERE id = $7 AND userId = $8 RETURNING *',
      [task.title, task.description, task.dueDate, task.priority, task.projectId || null, task.labelId || null, id, task.userId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}
export async function deleteTask(id: number, userId: number): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await deleteNotesByTaskId(id, client);
    await client.query('DELETE FROM Tasks WHERE id = $1 AND userId = $2', [id, userId]);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error deleting task:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function deleteTasksByProjectId(projectId: number, client: any): Promise<void> {
  await client.query('DELETE FROM Tasks WHERE projectId = $1', [projectId]);
}
