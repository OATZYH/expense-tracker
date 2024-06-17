import pool from '@/lib/db'
import { NextResponse } from 'next/server'

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const saltRounds = 10;

export async function POST(request) {
  const body = await request.json()
  const { username, email, password } = body
  if (!username || !email || !password) {
    return new Response(
      JSON.stringify({
        error: 'All fields are required',
      }),
      {
        status: 400,
      }
    )
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const id = uuidv4()

  try {
    const db = await pool.getConnection()
    const [results] = await db.query(
      "SELECT * FROM `user` WHERE email = ? OR username = ?",
      [email, username]
    );

    if (results.length > 0) {
      return res.status(400).json({ error: "Email or username already in use" });
    }

    await db.query(
      "INSERT INTO user (id, username, email, password_hash) VALUES (?,?, ?, ?)",
      [id, username, email, hashedPassword]
    );

    return NextResponse.json({ message: 'Signup successful' })
  } catch (error) {
    return NextResponse.json({
      error: error,
    }, { status: 500 })
  }
}