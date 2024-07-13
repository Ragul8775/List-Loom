import pool from './db';
import { deleteTasksByProjectId } from './task';
import { deleteLabelsByProjectId } from './label';
import { deleteNotesByProjectId } from './note';

export interface Project {
  id: number;
  name: string;
  description: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO Projects (name, description, userId) VALUES ($1, $2, $3) RETURNING *`,
      [project.name, project.description, project.userId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function getProjects(userId: number): Promise<Project[]> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Projects WHERE userId = $1', [userId]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getProjectById(id: number, userId: number): Promise<Project | null> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Projects WHERE id = $1 AND userId = $2', [id, userId]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

export async function updateProject(id: number, project: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Project> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE Projects SET name = $1, description = $2, updatedAt = CURRENT_TIMESTAMP WHERE id = $3 AND userId = $4 RETURNING *',
      [project.name, project.description, id, project.userId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function deleteProject(id: number, userId: number): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await deleteNotesByProjectId(id, client);
    await deleteTasksByProjectId(id, client);
    await deleteLabelsByProjectId(id, client);
    await client.query('DELETE FROM Projects WHERE id = $1 AND userId = $2', [id, userId]);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error deleting project:', error);
    throw error;
  } finally {
    client.release();
  }
}
