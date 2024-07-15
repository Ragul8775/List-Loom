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

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM Users WHERE email = $1', [email]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

export async function validatePassword(password: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO users (name, email, passwordhash) VALUES ($1, $2, $3) RETURNING *',
      [user.name, user.email, user.passwordhash]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  } finally {
    client.release();
  }
}
