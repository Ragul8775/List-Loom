import pool from './db';

export interface Note {
  id: number;
  content: string;
  taskId: number;
  projectId?: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function createNote(
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO Notes (content, taskId, projectId, userId) VALUES ($1, $2, $3, $4) RETURNING *`,
      [note.content, note.taskId, note.projectId || null, note.userId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function getNotesByTaskId(taskId: number, userId: number): Promise<Note[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM Notes WHERE taskId = $1 AND userId = $2',
      [taskId, userId]
    );
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getNoteById(id: number, userId: number): Promise<Note | null> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM Notes WHERE id = $1 AND userId = $2',
      [id, userId]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

export async function updateNote(
  id: number,
  note: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Note> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE Notes SET content = $1, updatedAt = CURRENT_TIMESTAMP WHERE id = $2 AND userId = $3 RETURNING *',
      [note.content, id, note.userId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}


export async function getNotesByProjectId(projectId: number, userId: number): Promise<Note[]> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Notes WHERE projectId = $1 AND userId = $2', [projectId, userId]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function deleteNote(id: number, userId: number): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM Notes WHERE id = $1 AND userId = $2', [id, userId]);
  } finally {
    client.release();
  }
}
export async function deleteNotesByProjectId(projectId: number, client: any): Promise<void> {
  await client.query('DELETE FROM Notes WHERE projectId = $1', [projectId]);
}
export async function deleteNotesByTaskId(taskId: number, client: any): Promise<void> {
  await client.query('DELETE FROM Notes WHERE taskId = $1', [taskId]);
}