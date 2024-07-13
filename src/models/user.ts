import pool from './db';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  name: string;
  email: string;
  passwordhash: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function createUser(name: string, email: string, password: string): Promise<User> {
  const client = await pool.connect();
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await client.query(
      'INSERT INTO Users (name, email, passwordHash) VALUES ($1, $2, $3) RETURNING *',
      [name, email, passwordHash]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Users WHERE email = $1', [email]);
    console.log('getUserByEmail result:', result.rows[0]); // Add this line for debugging
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}


export async function validatePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getUserById(id: number): Promise<User | null> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Users WHERE id = $1', [id]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}
