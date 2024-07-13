import pool from './db';

export interface Label {
  id: number;
  name: string;
  userId: number;
  projectId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function getLabels(userId: number): Promise<Label[]> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Labels WHERE userId = $1', [userId]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function createLabel(label: Omit<Label, 'id' | 'createdAt' | 'updatedAt'>): Promise<Label> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO Labels (name, userId, projectId) VALUES ($1, $2, $3) RETURNING *',
      [label.name, label.userId, label.projectId || null]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function getLabelById(id: number, userId: number): Promise<Label | null> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Labels WHERE id = $1 AND userId = $2', [id, userId]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

export async function updateLabel(id: number, label: Partial<Omit<Label, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Label> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE Labels SET name = $1, projectId = $2, updatedAt = CURRENT_TIMESTAMP WHERE id = $3 AND userId = $4 RETURNING *',
      [label.name, label.projectId || null, id, label.userId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}


export async function getLabelsByProjectId(projectId: number, userId: number): Promise<Label[]> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Labels WHERE projectId = $1 AND userId = $2', [projectId, userId]);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function deleteLabel(id: number, userId: number): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM Labels WHERE id = $1 AND userId = $2', [id, userId]);
  } finally {
    client.release();
  }
}
export async function deleteLabelsByProjectId(projectId: number, client: any): Promise<void> {
  await client.query('DELETE FROM Labels WHERE projectId = $1', [projectId]);
}